<template>
  <div class="parallax">
    <div class="parallax__container">
      <img
        src="assets/images/hoka.jpg"
        alt="parallax"
        class="parallax__background"
      />
      <img src="assets/images/hoka-seeklogo.png" id="logo" alt="Logo" />
    </div>
  </div>
</template>

<script setup lang="ts">
const logo = ref<HTMLElement | null>(null);

const handleScroll = () => {
  const positionY = window.scrollY;

  if (logo.value) {
    const initialScale = 0.5;
    const maxScale = 1.5;
    const scaleValue = Math.min(initialScale + positionY * 0.001, maxScale);

    logo.value.style.transform = `translate(-50%, -50%) scale(${scaleValue})`;
  }
};

onMounted(() => {
  logo.value = document.getElementById("logo");

  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.parallax {
  &__container {
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: #000000;
  }
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

#logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  max-width: 90vw;
  max-height: 40vh;
}

@media (max-width: 768px) {
  #logo {
    max-width: 70vw;
    max-height: 30vh;
  }
}

@media (max-width: 480px) {
  #logo {
    max-width: 60vw;
    max-height: 25vh;
  }
}
</style>
