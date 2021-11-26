<template>
  <body>
    <div class="container">
      <div class="row login-page">
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
                <label for="mailAddress" data-error="wrong" data-success="right"
                  >メールアドレス</label
                >
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <i class="material-icons prefix">lock_outline</i>
                <input id="password" type="password" v-model="password" />
                <label for="password">パスワード</label>
              </div>
            </div>
            <div class="row login-btn">
              <button class="btn" type="button" v-on:click="loginAdministrator">
                <span>ログイン</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LoginAdministrator extends Vue {
  // メールアドレス
  private mailAddress = "";
  // パスワード
  private password = "";
  // エラーメッセージ
  private errorMessage = "";

  /**
   * ログインする.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しログインをするためasync/await axiosを利用しています。
   * これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async loginAdministrator(): Promise<void> {
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user/login`,
      {
        email: this.mailAddress,
        password: this.password,
      }
    );
    console.log(response);

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
.login-page {
  width: 600px;
  height: 570px;
}

.login-btn {
  text-align: center;
}
</style>
