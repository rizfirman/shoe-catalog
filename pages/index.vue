<template>
  <SplashScreen />
</template>

<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  setTimeout(() => {
    router.push("/home");
  }, 3000); // 3000 ms = 3 detik
});
</script>
