<template>
  <div>
    <div class="modal-overlay">
      <a href="#!" class="overlay"></a>
      <div class="modal-wrapper">
        <div class="modal-contents">
          <a class="modal-close" @click="preLogoutModal('no')">✕</a>
          <div class="modal-content">
            <p>本当にログアウトしますか？</p>
            <button class="btn" @click="preLogoutModal('yes')">はい</button>
            <button class="btn" @click="preLogoutModal('no')">いいえ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Emit, Component, Vue } from "vue-property-decorator";
// [npm install axios-jsonp]が必要
import axios from "axios";

@Component
export default class LogoutModal extends Vue {
  @Emit()
  /**
   * モーダルをクローズする.
   *
   * @params - モーダルをクローズするかを表す文字列
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public closeModal(close: string): void {
    console.log("close-modalイベント発生");
  }

  /**
   * ログアウト実行の確認.
   *
   * @params - ログアウトを実行するかを表す文字列
   * @remarks 引数に"yes"を受け取ったら、logoutメソッドを実行して、モーダルをクローズする。
   * "no"を受け取ったら、ログアウトせずにモーダルをクローズする。
   */
  public preLogoutModal(answer: string): void {
    if (answer === "yes") {
      this.logout();
    }
    //親コンポーネントで判別するときに常にfalseを返すためにから文字を引数に指定。
    this.closeModal("");
  }

  //ログアウトをする処理
  async logout(): Promise<void> {
    await axios.post(`http://153.127.48.168:8080/ecsite-api/user/logout`);

    //会員ステートをログアウトに切り替えるミューテーションから呼び出す
    if (this["$store"].getters.getLoginStatus) {
      this["$store"].commit("logoutUser");
    }
    //管理者ステートをログアウトに切り替えるミューテーションから呼び出す
    if (this["$store"].getters.getLoginAdmin) {
      this["$store"].commit("logoutAdmin");
    }
    // トップページに遷移する
    this.$router.push("/");
  }
}
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}

.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.modal-open a {
  display: inline-block;
  padding: 5px;
  text-decoration: none;
  color: #fff;
}
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.modal:not(:target) {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
}
.modal:target {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s, visibility 0.5s;
}
.modal .overlay {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #000;
  opacity: 0.7;
  top: 0;
  left: 0;
}
.modal-wrapper {
  width: 100%;
  max-width: 400px;
  min-width: 300px;
  height: 80%;
  max-height: 350px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-contents {
  overflow: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  align-items: center;
  display: grid;
}
.modal-content {
  margin: 25px;
  font-weight: bold;
  text-align: center;
}
.modal-close {
  position: absolute;
  top: 5px;
  right: 10px;
  text-decoration: none;
  cursor: pointer;
}
.btn {
  background-color: rgba(49, 29, 2, 0.89);
  margin: 10px;
  padding: 2px 10px;
}
</style>
