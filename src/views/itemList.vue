<template>
  <div>
    <!-- search form -->
    <div class="search-wrapper">
      <div class="container">
        <form class="search-form">
          <input
            type="text"
            name="name"
            class="search-name-input"
            v-model="serchKeyWord"
          />

          <button
            class="btn search-btn"
            type="button"
            v-on:click="getSerchKeyWord(serchKeyWord)"
          >
            <span>検 索</span>
          </button>
        </form>
      </div>
    </div>
    <!-- item list -->
    <div class="item-wrapper">
      <div class="container">
        <div class="items">
          <div class="item" v-for="item of itemList" v-bind:key="item.id">
            <div class="item-icon">
              <img :src="item.imagePath" />
            </div>
            <router-link
              :to="'http://153.127.48.168:8080/ecsite-api/item/' + item.id"
              >{{ item.name }}</router-link
            ><br />
            <span class="price">Ｍ</span>{{ item.priceM }}円(税抜)<br />
            <span class="price">Ｌ</span>{{ item.priceL }}円(税抜)<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Item } from "../types/Item";
@Component
export default class itemList extends Vue {
  //商品一覧を格納する配列
  private itemList = Array<Item>();
  //検索キーワード
  private serchKeyWord = "";

  /**
   * Vuexストアのアクション経由で非同期でWebAPIから商品一覧を取得する.
   *
   * @remarks 全商品一覧をAPIからアクションで取得、ミューテーションで商品オブジェクト化したものを商品一覧配列に格納
   *
   */
  async created() {
    await this["$store"].dispatch("getItemList");
    this.itemList = this["$store"].getters.getAllItems;
  }
  /**
   *商品名を曖昧検索する.
   *@params - 入力欄に入力された検索キーワード
   *
   */
  getSerchKeyWord(serchKeyWord: string) {
    this.itemList = this["$store"].getters.getSerchKeyWord(serchKeyWord);

    console.dir("絞り込み結果：" + JSON.stringify(this.itemList));
  }
}
</script>

<style scoped>
.search-wrapper {
  padding: 80px 0 50px 0; /*上はヘッダが来るのでその分180px分空ける*/
  /* text-align: center; */
  position: fixed; /* スクロールしても表示されるように位置を固定 */
  height: 180px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1; /* 上に表示されるようにする(数が多いほど上に来る。例えば-1にすると裏側に行き見えなくなります) */
}

.search-form {
  margin: auto; /*検索窓を中央に配置*/
  width: 40%;
  text-align: center;
}

.search-name-input {
  height: 30px;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
  /* display: block; */
  width: 30%;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  font-family: inherit;
  margin: 0;
  text-rendering: auto;
  letter-spacing: normal;
  word-spacing: normal;
  text-transform: none;
  text-indent: 0px;
  text-shadow: none;
  text-align: start;
  appearance: auto;
  -webkit-rtl-ordering: logical;
  cursor: text;
}

.search-btn {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

/* ========================================
    item-wrapperの設定
   ======================================== */

.item-wrapper {
  padding-top: 200px; /* 上はヘッダや検索フォームが来るのでその分空ける */
  padding-bottom: 80px;
  padding-left: 15%;
  padding-right: 5%;
  background-color: #f7f7f7;
  text-align: center;
}

.items {
  display: flex;
  flex-wrap: wrap; /* 表示内容が多かった時に自動的に複数行に分割される */
}

.item {
  flex: 0 0 320px; /* paddingやborder含むitem全体の横幅を320pxにする */
  padding: 20px;
}

.item-icon img {
  margin: auto;
  display: block;
  border-radius: 30px;
  width: 200px;
  height: 200px;
  padding: 0 0 15px 0;
}

/* サイズをオレンジ〇で囲む */
.price {
  background-color: #ff4500;
  border-radius: 50%; /* 角丸にする設定 */
}

/* .items {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.item {
  width: 33%;
}

.item-icon {
  display: block;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  padding: 0 0 15px 0;
  box-sizing: border-box;
}
.item-icon img {
  width: 100%;
  height: 100%;
  border-radius: 30 px;
  box-sizing: border-box;
} */
</style>
