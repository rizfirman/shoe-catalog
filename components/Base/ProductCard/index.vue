<template>
  <div class="product__card">
    <template v-if="props.isLoading">
      <BaseProductCardSkeleton />
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

        <button class="favorite-button" @click="toggleFavorite">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            :class="{ 'favorite-icon': true, active: isFavorite }"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import type { Products } from '@/types'

  const props = defineProps<{
    products: Products
    isLoading: boolean
  }>()

  const favoriteStore = useFavoriteStore()

  const isFavorite = computed(() => favoriteStore.isFavorite(props.products.id))

  const toggleFavorite = () => {
    if (isFavorite.value) {
      favoriteStore.removeFromFavorites(props.products.id)
    } else {
      favoriteStore.addToFavorites(props.products)
    }
  }

  const router = useRouter()

  const goToTheDetailPage = (id: number) => {
    router.push(`/catalog/${id}`)
  }
</script>

<style lang="scss" scoped>
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
      justify-content: space-between;
      align-items: center;
    }

    .favorite-button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      outline: none;
    }

    .favorite-icon {
      width: 24px;
      height: 24px;
      fill: #aaa;
      transition:
        transform 0.2s ease,
        fill 0.3s ease;

      &.active {
        fill: #ff9800;
        transform: scale(1.2);
        animation: heartbeat 0.6s ease;
      }
    }
  }

  @keyframes heartbeat {
    0% {
      transform: scale(1);
    }
    30% {
      transform: scale(1.3);
    }
    60% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
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

  // .skeleton {
  //   background-color: #e0e0e0;
  //   border-radius: 8px;
  //   overflow: hidden;
  //   position: relative;
  // }

  // .skeleton::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: -150%;
  //   width: 200%;
  //   height: 100%;
  //   background: linear-gradient(
  //     90deg,
  //     rgba(224, 224, 224, 0) 0%,
  //     rgba(255, 255, 255, 0.5) 50%,
  //     rgba(224, 224, 224, 0) 100%
  //   );
  //   animation: shimmer 1.5s infinite;
  // }

  // @keyframes shimmer {
  //   0% {
  //     transform: translateX(-150%);
  //   }
  //   100% {
  //     transform: translateX(150%);
  //   }
  // }

  // .skeleton-img {
  //   width: 200px;
  //   height: 200px;
  //   border-radius: 1rem;
  //   margin-bottom: 1rem;
  // }

  // .skeleton-text {
  //   height: 20px;
  //   margin-bottom: 0.5rem;
  // }

  // .skeleton-label {
  //   width: 70%;
  // }

  // .skeleton-price {
  //   width: 50%;
  // }

  // .skeleton-button {
  //   width: 100px;
  //   height: 36px;
  //   margin-top: 1rem;
  //   border-radius: 8px;
  // }
</style>
