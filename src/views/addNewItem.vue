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
                <label for="name">名前</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input id="type" type="text" v-model="type" />
                <label for="type">タイプ</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="description" type="text" v-model="description" />
                <label for="description">説明</label>
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
                <label for="imagePath">画像URL</label>
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
              <button class="btn" type="button" @click="addItem">
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
  private name = "";
  private type = "";
  private description = "";
  private priceM = 0;
  private priceL = 0;
  private imagePath = "";
  private toppingType = "";
  private toppingName = "";
  private toppings = new Array<Topping>();

  created(): void {
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
