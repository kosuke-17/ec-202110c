<template>
  <div class="top-wrapper">
    <div class="img-content">
      <img src="/img_coffee/not_found_404.png" alt="404" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class notFound extends Vue {}
</script>
<style scoped>
div {
  background: #def2ff;
  width: 100vw;
  height: 80vh;
}
.img-content {
  text-align: center;
}
.top-wrapper {
  min-height: 97vh;
}
</style>
