<template>
  <div class="top-wrapper">
    <div class="container">
      <div class="row login-page">
        <h1 class="center">管理者ログイン</h1>
        <div class="col s12 z-depth-6 card-panel">
          <div class="error">{{ errorMessage }}</div>
          <form class="login-form" action="employeeList.html">
            <div class="row"></div>
            <div class="row">
              <div class="input-field col s12">
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
              <button class="btn" type="button" v-on:click="loginAdministrator">
                <span>ログイン</span>
              </button>
            </div>
            <br />
            <br />
            <br />
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
export default class LoginAdministrator extends Vue {
  // メールアドレス
  private mailAddress = "admin@xxx.com";
  // パスワード
  private password = "adminadmin";
  // エラーメッセージ
  private errorMessage = "";

  /**
   * 管理者ログインする.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しログインをするためasync/await axiosを利用しています。
   * これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   */
  async loginAdministrator(): Promise<void> {
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user/login`,
      {
        email: this.mailAddress,
        password: this.password,
      }
    );

    // ログイン後の処理
    if (response.data.status == "success") {
      this.$router.push("/itemList");
      //管理者ステートをログインに切り替えるミューテーションから呼び出す
      this["$store"].commit("loginAdmin");
    } else if (response.data.status == "error") {
      this.errorMessage = "ログインに失敗しました";
    }
  }
}
</script>

<style scoped>
.top-wrapper {
  min-height: 97vh;
}
.login-page {
  width: 70%;
  height: 700px;
}

.row .col.s12 {
  background-color: #fffaf1;
}

.login-btn {
  text-align: center;
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
