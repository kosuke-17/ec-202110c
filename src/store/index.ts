import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Item } from "../types/Item";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    //商品一覧が入る配列
    itemList: new Array<Item>(),
  },
  mutations: {
    /**
     * 商品一覧情報を作成してstateに格納する.
     * @param state - ステートオブジェクト
     * @param payload - 外部APIから商品一覧情報を取得
     */
    getItemList(state, payload) {
      state.itemList = new Array<Item>();
      for (const item of payload.itemList) {
        state.itemList.push(
          new Item(
            item.id,
            item.type,
            item.name,
            item.discription,
            item.priceM,
            item.priceL,
            item.imagePath,
            item.deleteId,
            item.toppingList
          )
        );
      }
      console.dir("items:" + JSON.stringify(state.itemList));
    },
  },
  actions: {
    /**
     * 商品一覧をAPIから取得.
     * @remarks 取得した商品一覧をJSON形式でペイロードに格納。ミューテーションからgetItemListメソッドを呼び出してオブジェクト化している
     * @param context - コンテキスト
     *
     */
    async getItemList(context) {
      const responce = await axios.get(
        "http://153.127.48.168:8080/ecsite-api/item/items/coffee"
      );
      console.dir("responce:" + JSON.stringify(responce));
      const payload = responce.data;

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
     * 検索欄で入力されたキーワードで商品を絞り込む
     *@param state - ステートオブジェクト
     *@returns - 曖昧検索で絞り込まれた商品
     */
    getSearchKeyWord(state) {
      return (keyWord: string) => {
        return state.itemList.filter((item) => item.name.includes(keyWord));
      };
    },
  },
});
