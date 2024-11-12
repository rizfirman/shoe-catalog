<template>
  <div class="image">
    <p class="image__header">Catalog</p>
    <div class="image__gallery">
      <div
        v-for="(image, index) in images"
        :key="index"
        :class="['image__card', `image__card-${index + 1}`]"
        :style="{ opacity: opacity }"
        :ref="(el) => (cards[index] = el as HTMLElement)"
      >
        <img :src="image.src" alt="grid" />
        <p class="image__card--label">Type</p>
        <p class="image__card--price">Rp. 1000.000</p>
        <div class="image__card--footer">
          <BaseButton label="See Details" />
        </div>
      </div>
    </div>
    <div class="image__footer">
      <BaseButton label="See More" />
    </div>
  </div>
</template>

<script setup lang="ts">
const images = [
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
  { src: "images/hoka_1.webp" },
];

const opacity = ref(1);
const cards = ref<(HTMLElement | null)[]>([]);

const handleScroll = () => {
  const positionY = window.scrollY;
  cards.value.forEach((card) => {
    if (card) {
      card.style.opacity = `${Math.min(Math.max(positionY * 0.001, 0), 1)}`;
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.image {
  &__header {
    font-size: 2rem;
    text-align: center;
    margin-top: 5rem;
  }
  &__gallery {
    max-width: 1200px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
    padding: 20px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
  &__card {
    border: white 1px solid;
    border-radius: 1rem;
    padding: 20px;
    img {
      width: 100%;
      height: auto;
      border-radius: 1rem;
      display: block;
    }
    &--label {
      font-size: 1.2rem;
      margin-top: 1rem;
    }
    &--price {
      font-size: 1.2rem;
      margin-top: 0.5rem;
    }
    &--footer {
      margin-top: 1rem;
      display: flex;
      justify-content: end;
    }
  }
  &__footer {
    max-width: 1200px;
    margin: auto;
    margin-top: 2rem;
    text-align: center;
  }
}
</style>
