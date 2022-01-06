<template>
  <div class="home">
    <div class="container">
      <h1 class="title">NO COFFEE, NO LIFE</h1>
      <div class="btn-wrapper">
        <router-link class="btn" to="/registerUser" v-if="!loginStatus">
          <i class="fas fa-user"></i> 会員登録
        </router-link>
        <router-link class="btn" to="/loginUser" v-if="!loginStatus">
          <i class="fas fa-sign-in-alt"></i> ログイン
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  //ユーザーか管理者のどちらがログインしているかを表す
  private loginUserOrAdmin = false;

  /**
   * ログイン状態を返す.
   *
   * @remarks 会員または管理者のログイン状態でナビゲーションの項目を変化させる。
   * @returns true:会員か管理者がログイン false:会員と管理者共にログアウトの状態
   */
  get loginStatus(): boolean {
    if (this["$store"].getters.getLoginStatus) {
      this.loginUserOrAdmin = this["$store"].getters.getLoginStatus;
    }
    if (this["$store"].getters.getLoginAdmin) {
      this.loginUserOrAdmin = this["$store"].getters.getLoginAdmin;
    }

    return this.loginUserOrAdmin;
  }
}
</script>

<style scoped>
.home {
  position: relative;
  width: 100%;
  min-height: 97vh;
  background-image: url("/img_coffee/home_coffee.jpg");
  background-size: 100% 100vh;
  background-repeat: no-repeat;
}
.title {
  font-size: 100px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white; /* #271c19*/
  text-align: center;
}
h1 {
  width: 100%;
  font-size: 4.2rem;
  line-height: 1;
  margin: 0;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
.btn-wrapper {
  width: 60%;
  margin: 0 auto;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-around;
}
</style>
