<template>
  <header>
    <div class="container">
      <div class="header">
        <div class="header-left logo">
          <router-link to="/"> Raku＊2 coffee </router-link>
        </div>

        <div class="header-right">
          <router-link to="/addNewItem">
            <i class="far fa-plus-square"></i>商品追加
          </router-link>
          <router-link to="/itemList">
            <i class="fas fa-utensils"></i> 商品一覧
          </router-link>
          <router-link to="/cartList">
            <i class="fas fa-shopping-cart"></i>カート
          </router-link>
          <router-link to="/contactCompany">
            <i class="fas fa-comment"></i>お問い合わせ
          </router-link>
          <router-link to="/registerUser" v-if="!loginStatus">
            <i class="fas fa-user"></i>会員登録
          </router-link>
          <router-link to="/loginUser" v-if="!loginStatus">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
          <router-link to="/loginAdministrator" v-if="!loginStatus">
            <i class="fas fa-sign-out-alt"></i>管理者はこちら
          </router-link>
          <router-link to="/orderHistory" v-if="loginStatus">
            <i class="fas fa-user"></i>注文履歴
          </router-link>
          <router-link to="/logoutUser" v-if="loginStatus">
            <i class="fas fa-sign-out-alt"></i>ログアウト
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Header extends Vue {
  private loginUserOrAdmin = false;
  /**
   * 会員または管理者のログイン状態でナビゲーションの項目を変化
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  height: 65px;

  width: 100%;
  background-color: #ede4cd;
  position: fixed; /* スクロールしてもヘッダが表示されるように位置を固定する */
  z-index: 10; /* ヘッダが一番上に表示されるようにする(数が多いほど上に来る。例えば-1にするとヘッダが裏側に行き見えなくなります) */
}
.header {
  display: flex; /* ヘッダロゴと右側のリンクを横並びにする */
  /* justify-content: flex-end; 右寄せにしたい場合*/
}

.logo {
  width: 15%;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.logo a {
  color: #332315;
}

.header-right {
  margin-left: auto; /* ヘッダ右側のリンクだけ右寄せにする(ロゴは左寄せのまま) */
  /* float: right; */
  display: flex; /* ヘッダ右側のリンクを横に並べる */
}

.header-right a {
  line-height: 65px; /* 行の高さを指定(文字が上下の真ん中に配置される) */
  padding: 0 25px;
  color: #9d8e87;
  display: block; /* a要素をブロック要素に変更(borderまでがクリックできるようになる) */
  /* float: left; */
  transition: all 0.5s; /* アニメーションの設定 all=変化の対象 0.5s=変化にかかる時間 hoverと組み合わせることが多い */
}

.header-right a:hover {
  color: #332315;
}
/* fontawesome(ログインアイコンの設定) */
.fas {
  margin-right: 5px;
}
</style>
