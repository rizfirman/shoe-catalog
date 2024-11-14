<template>
  <div>
    <HomeParallaxContainer />
    <div class="content">
      <HomeProductGallery />
      <HomeAbout />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })
</script>

<style lang="scss" scoped>
  .content {
    min-height: 125vh;
    background-color: #000000;
    display: grid;
    place-content: center;
  }
</style>
