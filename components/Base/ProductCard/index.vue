<template>
  <div :class="['product__card']">
    <template v-if="props.isLoading">
      <div class="skeleton skeleton-img"></div>
      <div class="skeleton skeleton-text skeleton-label"></div>
      <div class="skeleton skeleton-text skeleton-price"></div>
      <div class="skeleton skeleton-button"></div>
    </template>

    <template v-else>
      <img :src="props.products.imgUrl" alt="grid" />
      <p class="product__card--label">{{ props.products.name }}</p>
      <p class="product__card--price">
        {{ convertToRupiah(props.products.price) }}
      </p>
      <div class="product__card--footer">
        <BaseButton
          label="See Details"
          @click="goToTheDetailPage(props.products.id)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Products } from "@/types";
import { convertToRupiah } from "~/utils";
const props = defineProps<{
  products: Products;

  isLoading: boolean;
}>();

const router = useRouter();

const goToTheDetailPage = (id: number) => {
  router.push(`/catalog/${id}`);
};
</script>

<style lang="scss">
.product__card {
  border: white 1px solid;
  border-radius: 1rem;
  padding: 20px;
  transition: transform 0.2s ease;

  &:hover {
    animation: wiggle 0.3s ease;
    transform: scale(1.05);
  }

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

@keyframes wiggle {
  0% {
    transform: rotate(-1deg);
  }
  50% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.skeleton {
  background-color: #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
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

@keyframes shimmer {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(150%);
  }
}

.skeleton-img {
  width: 200px;
  height: 200px;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.skeleton-text {
  height: 20px;
  margin-bottom: 0.5rem;
}

.skeleton-label {
  width: 70%;
}

.skeleton-price {
  width: 50%;
}

.skeleton-button {
  width: 100px;
  height: 36px;
  margin-top: 1rem;
  border-radius: 8px;
}
</style>
