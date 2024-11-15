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
  @use '@/assets/scss/variables';

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
</style>
