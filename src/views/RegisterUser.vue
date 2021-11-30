<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">＊会員登録＊</h1>
      <div class="row register-page col s12 z-depth-6 card-panel">
        <div class="error">{{ errorOfName }}</div>
        <div class="row">
          <div class="input-field col s6">
            <input
              id="last_name"
              type="text"
              class="validate"
              v-model="lastName"
              required
            />
            <label for="last_name">姓</label>
          </div>
          <div class="input-field col s6">
            <input
              id="first_name"
              type="text"
              class="validate"
              v-model="firstName"
              required
            />
            <label for="first_name">名</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfMailAddress }}</div>
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              v-model="mailAddress"
              required
            />
            <label for="email">メールアドレス</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfZipcode }}</div>
          <div class="input-field col s12">
            <input id="zipcode" type="text" v-model="zipcode" maxlength="7" />
            <label for="zipcode">郵便番号(ハイフンなし)</label>
            <button class="btn" type="button" v-on:click="getAddressByZipCode">
              <span>住所検索</span>
            </button>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfAddress }}</div>
          <div class="input-field col s12">
            <input id="address" type="text" v-model="address" />
            <label for="address" class="active">住所</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfTelephone }}</div>
          <div class="input-field col s12">
            <input
              id="tel"
              type="tel"
              v-model="telephone"
              oninput="javascript:if(this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
              maxlength="11"
            />
            <label for="tel">電話番号(ハイフンなし)</label>
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfPassword }}</div>
          <div class="input-field col s12">
            <input
              id="password"
              type="password"
              class="validate"
              minlength="8"
              v-model="password"
              required
            />
            <label for="password"
              >パスワード(大文字・小文字の英数字・8文字以上12文字以内)</label
            >
          </div>
        </div>
        <div class="row">
          <div class="error">{{ errorOfCheckpassword }}</div>
          <div class="input-field col s12">
            <input
              id="confirmation_password"
              type="password"
              class="validate"
              minlength="8"
              v-model="checkPassword"
              required
            />
            <label for="confirmation_password">確認用パスワード</label>
          </div>
        </div>
        <div class="row register-admin-btn">
          <button class="btn" type="button" v-on:click="registerUser">
            <span>登録<i class="material-icons right">done</i></span>
          </button>
          <button class="btn clear-btn" type="button" v-on:click="clear">
            <span>クリア<i class="material-icons right">done</i></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
/**
 * ユーザー登録をする画面.
 */
@Component
export default class RegisterUser extends Vue {
  // 姓
  private lastName = "";
  // 名
  private firstName = "";
  // メールアドレス
  private mailAddress = "";
  // 郵便番号
  private zipcode = "";
  // 住所
  private address = "";
  // 電話番号
  private telephone = "";
  // パスワード
  private password = "";
  // 確認用パスワード
  private checkPassword = "";
  // エラーメッセージ（名前）
  private errorOfName = "";
  // エラーメッセージ（メールアドレス）
  private errorOfMailAddress = "";
  // エラーメッセージ（郵便番号）
  private errorOfZipcode = "";
  // エラーメッセージ（住所）
  private errorOfAddress = "";
  // エラーメッセージ（電話番号）
  private errorOfTelephone = "";
  // エラーメッセージ（パスワード）
  private errorOfPassword = "";
  // エラーメッセージ（確認用パスワード）
  private errorOfCheckpassword = "";

  /**
   * ユーザー情報を登録する.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しユーザー登録をするためasync/await axiosを利用しています。
   * これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   */
  async registerUser(): Promise<void> {
    // 登録画面にエラーが表示されている場合はユーザー登録処理を実行しない
    if (this.hasErrors()) {
      return;
    }

    // ユーザー登録処理
    const response = await axios.post(
      `http://153.127.48.168:8080/ecsite-api/user`,
      {
        name: this.lastName + " " + this.firstName,
        email: this.mailAddress,
        password: this.password,
        checkPassword: this.checkPassword,
        zipcode: this.zipcode,
        address: this.address,
        telephone: this.telephone,
      }
    );

    if (response.data.message == "そのメールアドレスはすでに使われています。") {
      this.errorOfMailAddress =
        "この「メールアドレス」は既に使用されています。";
      return;
    }

    if (response.data.status == "success" && this.checkPassword !== "") {
      this.$router.push("/loginUser");
    }
  }

  /**
   * エラーチェック処理
   * @returns エラーがある：true/エラーがない：false
   */
  private hasErrors(): boolean {
    // エラー変数
    let hasError = false;
    //未入力値チェック（名前）
    if (this.lastName === "" && this.firstName === "") {
      this.errorOfName = "「名前」が未入力です。";
      hasError = true;
    } else if (this.lastName === "" || this.firstName === "") {
      this.errorOfName = "「姓」または「名」が未入力です。";
      hasError = true;
    } else {
      this.errorOfName = "";
    }

    //未入力値チェック（メールアドレス）/ ＠が含まれているかのチェック
    if (this.mailAddress === "") {
      this.errorOfMailAddress = "「メールアドレス」が未入力です。";
      hasError = true;
    } else if (this.mailAddress.indexOf("@") === -1) {
      this.errorOfMailAddress = "この「メールアドレス」は有効ではありません。";
      hasError = true;
    } else {
      this.errorOfMailAddress = "";
    }

    //未入力値チェック（郵便番号）/ 郵便番号が7桁で入力されているかチェック
    if (this.zipcode === "") {
      this.errorOfZipcode = "「郵便番号」が未入力です。";
      hasError = true;
    } else if (this.zipcode.length != 7 || !this.zipcode.match(/^[0-9]+$/)) {
      this.errorOfZipcode = "この郵便番号は有効ではありません。";
      hasError = true;
    } else {
      this.errorOfZipcode = "";
    }

    //未入力値チェック（住所）
    if (this.address === "") {
      this.errorOfAddress = "「住所」が未入力です。";
      hasError = true;
    } else {
      this.errorOfAddress = "";
    }

    //未入力値チェック（電話番号）/ 電話番号が10桁未満もしくは12桁以上でないかのチェック
    if (this.telephone === "") {
      this.errorOfTelephone = "「電話番号」が未入力です。";
      hasError = true;
    } else if (
      this.telephone.length >= 12 ||
      this.telephone.length < 10 ||
      !this.telephone.match(/^[0-9]+$/)
    ) {
      this.errorOfTelephone = "この電話番号は有効ではありません。";
      hasError = true;
    } else {
      this.errorOfTelephone = "";
    }

    //未入力値チェック（パスワード）
    if (this.password === "") {
      this.errorOfPassword = "「パスワード」が未入力です。";
      hasError = true;
    } else if (this.password.length < 8 || 12 < this.password.length) {
      this.errorOfPassword = "8文字以上12文字以内で入力して下さい。";
      hasError = true;
    } else if (this.isValidPassword() == false) {
      this.errorOfPassword = "大文字小文字の英字と数字を含め入力して下さい。";
      hasError = true;
    } else {
      this.errorOfPassword = "";
    }

    //未入力値チェック（確認用パスワード）とパスワード一致チェック
    if (this.checkPassword === "") {
      this.errorOfCheckpassword = "「確認用パスワード」が未入力です。";
      hasError = true;
    } else if (
      this.password !== this.checkPassword &&
      this.checkPassword !== ""
    ) {
      this.errorOfCheckpassword = "パスワードと確認用パスワードが異なります。";
      hasError = true;
    } else {
      this.errorOfCheckpassword = "";
    }

    return hasError;
  }

  /**
   * 入力した内容とエラーをクリアする.
   */
  private clear(): void {
    this.lastName = "";
    this.firstName = "";
    this.mailAddress = "";
    this.zipcode = "";
    this.address = "";
    this.telephone = "";
    this.password = "";
    this.checkPassword = "";
    this.errorOfName = "";
    this.errorOfMailAddress = "";
    this.errorOfZipcode = "";
    this.errorOfAddress = "";
    this.errorOfTelephone = "";
    this.errorOfPassword = "";
    this.errorOfCheckpassword = "";
  }
  /**
   * パスワードが大文字小文字の英数字を含んだものになっているか判定.
   * @returns ture:パスワード問題なし, false:パスワード問題あり
   */
  isValidPassword(): boolean {
    const ratz = /[a-z]/,
      rAtZ = /[A-Z]/,
      r0t9 = /[0-9]/;
    return (
      ratz.test(this.password) &&
      rAtZ.test(this.password) &&
      r0t9.test(this.password)
    );
  }

  /**
   * 郵便番号から住所取得.
   * @remarks 入力された郵便番号からzipcodaを使用して住所を取得、axios-jsonpはインストール
   *           使うためには「npm install --save-dev axios-jsonp」を行う
   */

  async getAddressByZipCode(): Promise<void> {
    this.errorOfZipcode = "";
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const axiosJsonpAdapter = require("axios-jsonp");
    this.errorOfZipcode = "";
    if (this.zipcode.match(/[0-9]{7}/g)) {
      const response = await axios.get("https://zipcoda.net/api", {
        adapter: axiosJsonpAdapter,
        params: {
          zipcode: this.zipcode,
        },
      });
      //.join("")でcomponents配列内を連結
      this.address = response.data.items[0].components.join("");
    } else {
      this.errorOfZipcode = "半角数字7桁で入力してください";
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}

.register-admin-btn {
  text-align: center;
  margin: 5% 0 10% 0;
}

.error {
  color: red;
}

.row.register-page {
  margin: 0 auto;
}
.top-wrapper {
  min-height: 97vh;
}

.col.s12.z-depth-6.card-panel {
  margin-top: 5%;
  padding: 1% 2%;
  box-sizing: border-box;
  background-color: #fffaf0;
}

.clear-btn {
  margin-left: 3%;
  background-color: #c5b3af;
}
</style>
