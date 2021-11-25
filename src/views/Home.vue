<template>
  <div class="home">
    <div class="top-wrapper">
      <div class="container">
        <h1 class="title">NO COFFEE, NO LIFE</h1>
        <div class="btn-wrapper">
          <router-link class="btn" to="/registerUser"> 会員登録 </router-link>
          <p>or</p>
          <router-link class="btn" to="/loginUser">
            <i class="fas fa-sign-in-alt"></i>ログイン
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  height: 750px;
  background-image: url("/img_coffee/home_coffee.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.title {
  font-size: 100px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
