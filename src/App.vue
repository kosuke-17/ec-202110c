<template>
  <div id="app">
    <Header />
    <div class="top-wrapper">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

@Component({
  components: {
    Header,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  /* width: 800px; */
  width: 100%;
  margin: auto;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.top-wrapper {
  padding-top: 100px;
}
</style>
