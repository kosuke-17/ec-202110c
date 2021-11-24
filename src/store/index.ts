import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Item } from "../types/Item";
import { OrderItem } from "@/types/OrderItem";
// 使うためには「npm install --save vuex-persistedstate」を行う
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //商品一覧が入る配列
    itemList: new Array<Item>(),
    //並び替えた商品一覧が入る配列
    selectedItemList: new Array<Item>(),
    //カートに入っている商品一覧
    orderItemList: new Array<OrderItem>(),
  },
  mutations: {
    /**
     * 商品一覧情報を作成してstateに格納する.
     * @param state - ステートオブジェクト
     * @param payload - 外部APIから商品一覧情報を取得
     */
    getItemList(state, payload) {
      state.itemList = new Array<Item>();
      for (const item of payload.items) {
        state.itemList.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.description,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleteId,
            item.toppingList
          )
        );
      }
      console.dir("itemList:" + JSON.stringify(state.itemList));
    },

    /**
     *ショッピングカートに商品を追加する.
     
     * @param state - ステートオブジェクト
     * @param payload - ショッピングカートに入れた商品の詳細情報
     */
    addItemToCart(state, payload): void {
      state.orderItemList.push(
        new OrderItem(
          state.orderItemList.length + 1,
          payload.orderItem.id,
          0,
          payload.quantity,
          payload.size,
          new Item(
            payload.orderItem.id,
            payload.orderItem.type,
            payload.orderItem.name,
            payload.orderItem.description,
            payload.orderItem.priceM,
            payload.orderItem.priceL,
            payload.orderItem.imagePath,
            payload.orderItem.deleteId,
            payload.orderItem.toppingList
          ),
          payload.orderToppingList
        )
      );
      console.dir(JSON.stringify(state.orderItemList));
    },

    /**
     *指定した方法で商品一覧を並び替える.
     
     * @param state - ステートオブジェクト
     * @param payload - 並び替えの方法（例：昇順、降順）
     */
    changeItemOrder(state, payload) {
      if (payload == "名前昇順") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "名前降順") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が高い順(Mサイズ)") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const priceA = a.priceM;
          const priceB = b.priceM;
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が低い順(Mサイズ)") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const priceA = a.priceM;
          const priceB = b.priceM;
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が高い順(Lサイズ)") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const priceA = a.priceL;
          const priceB = b.priceL;
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が低い順(Lサイズ)") {
        state.selectedItemList = state.itemList.sort(function (a, b) {
          const priceA = a.priceL;
          const priceB = b.priceL;
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          return 0;
        });
      }
    },
  }, //end mutations
  actions: {
    /**
     * 商品一覧をAPIから取得.
     * @remarks 取得した商品一覧をJSON形式でペイロードに格納。ミューテーションからgetItemListメソッドを呼び出してオブジェクト化している
     * @param context - コンテキスト
     *
     */
    async getItemList(context) {
      const response = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/coffee"
      );
      console.dir("responce:" + JSON.stringify(response));
      const payload = response.data;

      //(memo)ミューテーションから呼び出している
      context.commit("getItemList", payload);
    },
  },
  modules: {},
  getters: {
    /**
     * 商品一覧を取得する.
     * @param state - ステートオブジェクト
     * @returns - 商品一覧
     */
    getAllItems(state) {
      return state.itemList;
    },
    /**
     * 並び替えした後の商品一覧を取得する.
     * @param state - ステートオブジェクト
     * @returns - 並び替え後の商品一覧
     */
    getSelectedItems(state) {
      return state.selectedItemList;
    },
    /**
     * 検索欄で入力されたキーワードで商品を絞り込む
     *@param state - ステートオブジェクト
     *@returns - 曖昧検索で絞り込まれた商品
     */
    getSearchKeyWord(state) {
      return (keyWord: string) => {
        return state.itemList.filter((item) => item.name.includes(keyWord));
      };
    },
    /**
     *ショッピングカートに入っている商品の配列を返す.
     *
     * @param state - ステートオブジェクト
     * @returns ショッピングカートに入っている商品の配列
     */
    getOrderItemList(state) {
      // return state.orderItemList;
      const orderItemList = new Array<OrderItem>();
      for (const orderItem of state.orderItemList) {
        orderItemList.push(
          new OrderItem(
            orderItem.id,
            orderItem.itemId,
            0,
            orderItem.quantity,
            orderItem.size,
            new Item(
              orderItem.item.id,
              orderItem.item.type,
              orderItem.item.name,
              orderItem.item.description,
              orderItem.item.priceM,
              orderItem.item.priceL,
              orderItem.item.imagePath,
              orderItem.item.deleteId,
              orderItem.item.toppingList
            ),
            orderItem.orderToppingList
          )
        );
      }
      return orderItemList;
    },
  }, //end getters
  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vue",
      //orderItemListのデータをセッションストレージに格納しブラウザ更新しても残るようにしている
      paths: ["orderItemList"],
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ], //end plugins
});
