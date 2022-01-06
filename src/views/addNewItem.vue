<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row login-page">
        <h1 class="center">商品追加</h1>
        <div class="col s12 z-depth-6 card-panel">
          <form class="login-form" action="employeeList.html">
            <div class="row">
              <i class="material-icons prefix"></i>
              <div class="input-field col s6">
                <input id="name" type="text" v-model="name" />
                <label class="active" for="name">名前</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input id="type" type="text" v-model="type" />
                <label class="active" for="type">タイプ</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="description" type="text" v-model="description" />
                <label class="active" for="description">説明</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input id="priceM" type="text" v-model.number="priceM" />
                <label class="active" for="priceM">価格(サイズM)</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input id="priceL" type="text" v-model.number="priceL" />
                <label class="active" for="priceL">価格(サイズL)</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="imagePath" type="text" v-model="imagePath" />
                <label class="active" for="imagePath">画像URL</label>
              </div>
            </div>
            <div class="topping-hedding">
              トッピング19種
              <span>&nbsp;Ｍ：</span>200円(税抜)
              <span>&nbsp;Ｌ：</span>300円(税抜)
            </div>
            <div class="card item-toppings">
              <div
                class="toppingList"
                v-for="topping of toppings"
                :key="topping.id"
              >
                <div>{{ topping.name }}</div>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" @click="addNewItem">
                <span>商品追加</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import toppingData from "@/types/ToppingData";
import { Topping } from "@/types/Topping";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class LoginUser extends Vue {
  //商品名
  private name = "クリスマスブレンドコーヒー";
  //タイプ
  private type = "coffee";
  //説明
  private description =
    "季節限定の商品です。香りと風味が強く、クリスマスツリーを思わせるコーヒーとなっています。";
  //Mの価格
  private priceM = 290;
  //Lの価格
  private priceL = 410;
  //画像パス
  private imagePath = "/img_coffee/newCoffee.jpg";
  //トッピングリスト
  private toppings = new Array<Topping>();

  /**
   * トッピングを表示する.
   */
  created(): void {
    //トッピングの表示をさせるだけ(商品追加の時はtoppingをnullにする)
    for (const topping of toppingData) {
      this.toppings.push(
        new Topping(
          topping.id,
          topping.type,
          topping.name,
          topping.priceM,
          topping.priceL
        )
      );
    }
  }
  /**
   * 新商品を追加する.
   */
  addNewItem(): void {
    this.$store.commit("addNewItem", {
      item: {
        name: this.name,
        type: this.type,
        description: this.description,
        priceM: this.priceM,
        priceL: this.priceL,
        imagePath: this.imagePath,
        toppingList: null,
      },
    });
    this.$router.push("/itemList");
  }
}
</script>

<style scoped>
.login-page {
  width: 70%;
}

.row .col.s12 {
  background-color: #e2d7cf;
}

.login-btn {
  text-align: center;
}
.topping-hedding {
  font-weight: bold;
  font-size: 17px;
  text-align: left;
}
.toppingList {
  display: inline-block;
  padding: 10px;
}
.delete-btn {
  width: 90px;
}
.top-wrapper {
  min-height: 97vh;
}
</style>
