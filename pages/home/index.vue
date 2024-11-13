<template>
  <div>
    <HomeParallaxContainer />
    <section class="about">
      <HomeProductGallery />
      <HomeAbout />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main-layout",
});
</script>

<style lang="scss" scoped>
.about {
  min-height: 125vh;
  background-color: #000000;
  display: grid;
  place-content: center;
}
</style>
