<template>
  <div>ログアウト中...</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class LogoutUser extends Vue {
  /**
   * ログアウトする.
   *
   * @remarks
   * 本メソッドは非同期でWebAPIを呼び出しログアウトをするためasync/await axiosを利用しています。
   * これらを利用する場合は明示的に戻り値にPromiseオブジェクト型を指定する必要があります。
   * @returns Promiseオブジェクト
   */
  async created(): Promise<void> {
    await axios.post(`http://153.127.48.168:8080/ecsite-api/user/logout`);

    //会員ステートをログアウトに切り替えるミューテーションから呼び出す
    if (this["$store"].getters.getLoginStatus) {
      this["$store"].commit("logoutUser");
      console.log("ユーザーがログアウト");
    }
    //管理者ステートをログアウトに切り替えるミューテーションから呼び出す
    if (this["$store"].getters.getLoginAdmin) {
      this["$store"].commit("logoutAdmin");
      console.log("管理者がログアウト");
    }
    // トップページに遷移する
    this.$router.push("/");
  }
}
</script>

<style scoped></style>
