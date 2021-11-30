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
  width: 100%;
  height: 80vh;
}
.img-content {
  text-align: center;
}
.top-wrapper {
  min-height: 98vh;
}

img {
  width: 1000px;
}
</style>
