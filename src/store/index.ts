import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Item } from "../types/Item";
import { OrderItem } from "@/types/OrderItem";
import { Order } from "@/types/Order";
// 使うためには「npm install --save vuex-persistedstate」を行う
import createPersistedState from "vuex-persistedstate";
import { User } from "@/types/User";
import { Topping } from "@/types/Topping";

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
    //ユーザーがログインされているかどうかのフラグ(ログイン時:true/ログアウト時:false)
    isLogin: false,
    //管理者がログインされているかどうかのフラグ(ログイン時:true/ログアウト時:false)
    loginAdministratorFlag: false,
    //ログインしているユーザーの情報
    loginUserInfo: new User(0, "", "", "", "", "", ""),
    //商品履歴一覧が入る配列
    orderHistoryList: new Array<Order>(),
    // ログイン後に画面遷移するためのフラグ
    loginedPageToMoveFlag: "",
    //商品一覧が入る配列(追加商品が入る)
    newItemList: new Array<Item>(),
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
            item.toppingList,
            //最初はいいねしていない
            false,
            //モックの数値をランダムで表示する
            Math.floor(Math.random() * 10)
          )
        );
      }
    },

    /**
     * 注文一覧情報を作成してstateに格納する.
     * @param state - ステートオブジェクト
     * @param payload - 外部APIから商品一覧情報を取得
     */
    getOrderHistoryList(state, payload) {
      state.orderHistoryList = new Array<Order>();
      for (const order of payload.orders) {
        state.orderHistoryList.push(
          new Order(
            order.userId,
            order.status,
            order.totalPrice,
            order.orderDate,
            order.distinationName,
            order.distinationEmail,
            order.distinationZipcode,
            order.distinationAddress,
            order.distinationTel,
            new Date(order.deliveryTime),
            order.paymentMethod,
            order.user,
            order.orderItemList
          )
        );
      }
    },

    /**
     *ショッピングカートに商品を追加する.
     
     * @param state - ステートオブジェクト
     * @param payload - ショッピングカートに入れた商品の詳細情報
     */
    addItemToCart(state, payload): void {
      let duplicatedToppingFlag = false;
      // 同じ商品、サイズ、トッピングだったらquantityを加算して、カートリストに重複しないようにする。

      for (const orderItem of state.orderItemList) {
        for (const orderedTopping of orderItem._orderToppingList) {
          if (
            payload.orderToppingList.find(
              (orderTopping: Topping) => orderedTopping._id === orderTopping.id
            )
          ) {
            duplicatedToppingFlag = true;
          }
        }

        if (
          orderItem._item.id === payload.orderItem.id &&
          orderItem._size === payload.size &&
          duplicatedToppingFlag
        ) {
          orderItem._quantity += payload.quantity;
          return;
        }
        duplicatedToppingFlag = false;
      }
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
            payload.orderItem.toppingList,
            false,
            0
          ),
          payload.orderToppingList
        )
      );
    },

    /**

     *指定した方法で商品一覧を並び替える.
     
     * @param state - ステートオブジェクト
     * @param payload - 並び替えの方法（例：昇順、降順）
     */
    changeItemOrder(state, payload) {
      if (payload == "昇順(名前)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const nameA = itemA.name.toUpperCase();
          const nameB = itemB.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "降順(名前)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const nameA = itemA.name.toUpperCase();
          const nameB = itemB.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が高い順(Mサイズ)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const priceA = itemA.priceM;
          const priceB = itemB.priceM;
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が低い順(Mサイズ)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const priceA = itemA.priceM;
          const priceB = itemB.priceM;
          if (priceA < priceB) {
            return -1;
          }
          if (priceA > priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が高い順(Lサイズ)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const priceA = itemA.priceL;
          const priceB = itemB.priceL;
          if (priceA > priceB) {
            return -1;
          }
          if (priceA < priceB) {
            return 1;
          }
          return 0;
        });
      } else if (payload == "金額が低い順(Lサイズ)") {
        state.selectedItemList = state.itemList.sort(function (itemA, itemB) {
          const priceA = itemA.priceL;
          const priceB = itemB.priceL;
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
    /**
     * 会員がログインする.
     * @remarks ステートをログイン状態に変更している
     * @param state ステートオブジェクト
     */
    loginUser(state) {
      state.isLogin = true;
    },
    /**
     * 会員がログアウトする.
     * @remarks ステートをログアウト状態に変更している
     * @param state ステートオブジェクト
     */
    logoutUser(state) {
      state.isLogin = false;
    },
    /**
     * 管理者がログインする.
     * @remarks ステートをログイン状態に変更している
     * @param state ステートオブジェクト
     */
    loginAdmin(state) {
      state.loginAdministratorFlag = true;
    },
    /**
     * 管理者がログアウトする.
     * @remarks ステートをログアウト状態に変更している
     * @param state ステートオブジェクト
     */
    logoutAdmin(state) {
      state.loginAdministratorFlag = false;
    },
    /**
     * ショッピングカートに入っている商品を削除する.
     *
     * @param state - ステートオブジェクト
     * @param payload - ショッピングカートの配列の番号
     */
    deleteItem(state, payload): void {
      state.orderItemList.splice(payload.index, 1);
    },
    /**
     *現在ログインしている情報をオブジェクト化.
     * @remarks 現在ログインしている情報をUserオブジェクトをインスタンス化してstate.
     * @param state - ステートオブジェクト
     * @param payload - 現在ろぐいんしているユーザー情報
     */
    getUserInfo(state, payload): void {
      state.loginUserInfo = new User(
        payload.userInfo.id,
        payload.userInfo.name,
        payload.userInfo.email,
        payload.userInfo.password,
        payload.userInfo.zipcode,
        payload.userInfo.address,
        payload.userInfo.telephone
      );
    },
    /**
     * 注文商品カートを初期化
     * @param state - ステート
     */
    resetOrderItemList(state): void {
      state.orderItemList = new Array<OrderItem>();
    },
    /**
     * 画面遷移用フラグの文字列を格納
     * @param state - ステート
     * @param payload - 画面遷移フラグ用の文字列
     */
    setMoveFlag(state, payload): void {
      state.loginedPageToMoveFlag = payload.setStr;
    },

    /**
     * いいねのフラグといいね数を変更する.
     *
     * @remarks ペイロードとして送られてきたItemオブジェクトをItemリストから検索する。
     *          いいねがされていなかったら、isFavorite = trueにして、いいね数を＋１する。
     *          いいねされていたら、isFavorite = falseにして、いいね数を-1する。
     * @param state - ステートオブジェクト
     * @param payload - いいねボタンをクリックされたItemオブジェクト
     */
    changeFavoriteFlag(state, payload): void {
      const targetItem = [];
      for (const item of state.itemList) {
        if (item === payload.item) {
          targetItem.push(item);
        }
      }
      if (targetItem[0].isFavorite === false) {
        targetItem[0].isFavorite = true;
        targetItem[0].favoriteCount++;
      } else {
        targetItem[0].isFavorite = false;
        targetItem[0].favoriteCount--;
      }
    },
    addNewItem(state, payload): void {
      state.newItemList.unshift(
        new Item(
          state.itemList.length + 30,
          payload.item.type,
          payload.item.name,
          payload.item.description,
          payload.item.priceM,
          payload.item.priceL,
          payload.item.imagePath,
          false,
          payload.item.toppingList,
          false,
          Math.floor(Math.random() * 10)
        )
      );
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
      const payload = response.data;

      //(memo)ミューテーションから呼び出している
      context.commit("getItemList", payload);
    },

    /**
     * ログインしているユーザーのIDをもとに注文履歴一覧をAPIから取得.
     * @remarks 取得した注文履歴一覧をJSON形式でペイロードに格納。
     * ミューテーションからgetOrderHistoryListメソッドを呼び出してオブジェクト化している
     * @param context - コンテキスト
     *
     */
    async getOrderHistoryList(context) {
      const response = await axios.get(
        `http://153.127.48.168:8080/ecsite-api/order/orders/coffee/${this.state.loginUserInfo._id}`
      );
      const payload = response.data;

      //(memo)ミューテーションから呼び出している
      context.commit("getOrderHistoryList", payload);
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
      return state.newItemList.concat(state.itemList);
    },
    /**
     * 注文履歴一覧を取得する.
     * @param state - ステートオブジェクト
     * @returns - 商品一覧
     */
    getAllOrderHistoryLists(state) {
      return state.orderHistoryList;
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
     * 検索欄で入力されたキーワードで商品を絞り込む.
     *@remarks 検索されたキーワードを.toLowerCase()と.toUpperCase()で大・小文字を分けずにフィルターをかけて検索する
     *@param state - ステートオブジェクト
     *@returns - 曖昧検索で絞り込まれた商品
     */
    getSearchKeyWord(state) {
      return (keyWord: string) => {
        return state.itemList.filter(
          (item) =>
            item.name.includes(keyWord) ||
            item.name.includes(keyWord.toLowerCase()) ||
            item.name.includes(keyWord.toUpperCase())
        );
      };
    },
    /**
     *ショッピングカートに入っている商品の配列を返す.
     *
     * @param state - ステートオブジェクト
     * @returns ショッピングカートに入っている商品の配列
     */
    getOrderItemList(state) {
      const orderItemList = new Array<OrderItem>();
      for (const orderItem of state.orderItemList) {
        orderItemList.push(
          new OrderItem(
            orderItem._id,
            orderItem._itemId,
            0,
            orderItem._quantity,
            orderItem._size,
            new Item(
              orderItem._item._id,
              orderItem._item._type,
              orderItem._item._name,
              orderItem._item._description,
              orderItem._item._priceM,
              orderItem._item._priceL,
              orderItem._item._imagePath,
              orderItem._item._deleteId,
              orderItem._item._toppingList,
              false,
              0
            ),
            orderItem._orderToppingList
          )
        );
      }
      return orderItemList;
    },

    /**
     * ログイン状態を取得
     * @param state - ステートオブジェクト
     * @returns - ログイン状態
     */
    getLoginStatus(state) {
      return state.isLogin;
    },
    /**
     * ログイン状態を取得
     * @param state - ステートオブジェクト
     * @returns - ログイン状態
     */
    getLoginAdmin(state) {
      return state.loginAdministratorFlag;
    },

    /**
     * ログインしているユーザー情報を取得.
     * @param state - ステートオブジェクト
     * @returns 現在ログインしているユーザー情報
     */
    getLoginUserInfo(state) {
      console.dir(JSON.stringify(state.loginUserInfo));

      return state.loginUserInfo;
    },
  }, //end getters

  plugins: [
    createPersistedState({
      // ストレージのキーを指定
      key: "vue",
      //ステートのデータをセッションストレージに格納しブラウザ更新しても残るようにしている
      paths: [
        "orderItemList",
        "itemList",
        "isLogin",
        "loginUserInfo",
        "loginAdministratorFlag",
      ],
      // ストレージの種類を指定
      storage: window.sessionStorage,
    }),
  ], //end plugins
});
