<template>
  <div class="parallax">
    <div v-if="isLoading" class="skeleton"></div>

    <div class="parallax__container">
      <NuxtImg
        src="https://res.cloudinary.com/rizfirman/image/upload/v1731514948/hoka.jpg"
        alt="parallax"
        class="parallax__background"
        @load="handleImageLoad"
        placeholder="blur"
        width="1920"
        height="1080"
        v-show="!isLoading"
      />
      <NuxtImg
        src="https://res.cloudinary.com/rizfirman/image/upload/v1731514941/hoka-seeklogo.png"
        id="logo"
        alt="Logo"
        width="500"
        height="300"
        v-show="!isLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isLoading = ref(true);
const logo = ref<HTMLElement | null>(null);

const handleImageLoad = () => {
  isLoading.value = false;
};

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
  position: relative;
}

.parallax__container {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #000000;
}

.parallax__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.5);
  max-width: 90vw;
  max-height: 40vh;
}

.skeleton {
  background-color: #e0e0e0;

  height: 100vh;
  position: relative;
  overflow: hidden;
}

@keyframes shimmer {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(150%);
  }
}
.skeleton::before {
  content: "";
  position: absolute;
  top: 0;
  left: -150%;
  width: 200%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(224, 224, 224, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(224, 224, 224, 0) 100%
  );
  animation: shimmer 1.5s infinite;
}
</style>
