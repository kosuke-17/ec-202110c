<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row login-page">
        <h1 class="center">＊会員ログイン＊</h1>
        <div class="col s12 z-depth-6 card-panel">
          <div class="error">{{ errorMessage }}</div>
          <form class="login-form" action="employeeList.html">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12 darken-3">
                <i class="material-icons prefix">mail_outline</i>
                <input
                  class="validate"
                  id="mailAddress"
                  type="email"
                  v-model="mailAddress"
                />
                <label
                  class="active"
                  for="mailAddress"
                  data-error="wrong"
                  data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" type="password" v-model="password" />
                <label class="active" for="password">パスワード</label>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" v-on:click="loginUser">
                <span>ログイン</span>
              </button>
            </div>
            <div class="row">
              <div class="input-field col s6 m6 l6">
                <p class="margin medium-small">
                  <router-link to="/registerUser">
                    会員登録はこちら
                  </router-link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// 使用するためには「npm install axios --save」を行う
import axios from "axios";

@Component
export default class LoginUser extends Vue {
  // メールアドレス
  private mailAddress = "dorayaki@com";
  // パスワード
  private password = "Password1111";
  // エラーメッセージ
  private errorMessage = "";

  /**
   * ユーザーログインする.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しログインをするためasync/await axiosを利用しています。
   * これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   */
  async loginUser(): Promise<void> {
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user/login`,
      {
        email: this.mailAddress,
        password: this.password,
      }
    );

    // エラー処理
    if (response.data.status == "success") {
      // 会員登録情報の取得
      const loginUserData = response.data.responseMap.user;
      //会員ステートにログインしたユーザーの情報を渡す
      this["$store"].commit("getUserInfo", {
        userInfo: loginUserData,
      });
      //会員ステートをログインに切り替えるミューテーションから呼び出す
      this["$store"].commit("loginUser");

      // 商品一覧画面に遷移する(ステートのフラグがgoToOrderだったら商品注文ページへ遷移)
      if (this.$store.state.loginedPageToMoveFlag === "goToOrder") {
        this.$router.push("/orderConfirm");
      } else {
        this.$router.push("/itemList");
      }
    } else if (response.data.status == "error") {
      this.errorMessage = "ログインに失敗しました";
    }
  }
}
</script>

<style scoped>
.login-page {
  width: 70%;
}

.row .col.s12 {
  background-color: #fffaf0;
}

.login-btn {
  text-align: center;
}

.top-wrapper {
  min-height: 97vh;
}

.col.s12.z-depth-6.card-panel {
  padding-top: 6%;
  margin-top: 6%;
}

.margin.medium-small a {
  color: #9a8e95;
}
.margin.medium-small a:hover {
  color: #55423d;
}

h1 {
  margin-bottom: 1%;
}
</style>
