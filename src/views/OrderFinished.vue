<template>
  <div class="top-wrapper">
    <div class="container">
      <h1 class="page-title">決済が完了しました！</h1>
      <div class="order-finished-thanks-message">
        <p>この度はご注文ありがとうございます。</p>
        <p>
          お支払い先は、お送りしたメールに記載してありますのでご確認ください。
        </p>
        <p>メールが届かない場合は「注文履歴」からご確認ください。</p>
      </div>
      <div class="row order-finished-btn">
        <button class="btn" type="button" @click="goHome">
          <span>トップ画面を表示する</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  /**
   * ログインしていなければ、ログイン画面に戻るように処理を実装.
   */
  created(): void {
    if (!this.$store.state.isLogin) {
      alert("ログインしてないため、ログイン画面に移動します。");
      this.$router.push("/loginUser");
    }
    /**
     * トップ画面に遷移する処理.
     */
  }
  goHome(): void {
    this.$router.push("/");
  }
}
</script>

<style></style>
