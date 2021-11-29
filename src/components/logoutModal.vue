<template>
  <!-- <transition name="modal" appear>
    <div class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content"></div> -->
  <div>
    <p>本当にログアウトしますか？</p>
    <!-- <footer class="modal-footer"> -->
    <button @click="preLogoutModal('yes')">はい</button>
    <button @click="preLogoutModal('no')">いいえ</button>
  </div>
  <!-- </footer>
      </div>
    </div>
  </transition> -->
</template>

<script lang="ts">
import axios from "axios";
import { Emit, Vue } from "vue-property-decorator";

export default class LogoutModal extends Vue {
  @Emit()
  public logoutModal(close: string): void {
    console.log("close-modalイベント発生");
    console.log(close);
  }

  public preLogoutModal(answer: string): void {
    if (answer === "yes") {
      this.logout();
    }
    //親コンポーネントで判別するときに常にfalseを返す
    this.logoutModal("");
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

.modal-window {
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
}

.modal-content {
  padding: 10px 20px;
}

.modal-footer {
  background: #ccc;
  padding: 10px;
  text-align: right;
}

/* オーバーレイのトランジション */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s;
}
/* オーバーレイに包含されているモーダルウィンドウのトランジション */
.modal-window {
  transition: opacity 0.4s, transform 0.4s;
}

/* ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える */
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-window {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
