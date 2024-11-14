<template>
  <div>
    <div class="favorites-page">
      <p class="favorites-page__header">Favorites</p>

      <BaseSearch v-model:search-query="searchQuery" />
      <BaseSort v-model:sort-option="sortOption" />

      <BaseEmptyState
        v-if="favoriteStore.favorites.length === 0"
        message="You have no favorite products yet."
      />

      <BaseEmptyState
        v-else-if="sortedAndFilteredFavorites.length === 0 && searchQueryActive"
        :search-query="searchQuery"
        message="No favorite products found for your search."
      />

      <div v-else class="favorites-page__gallery">
        <div
          v-for="(product, index) in paginatedFavorites"
          :key="`${index}-${currentPage}`"
        >
          <BaseProductCard :products="product" :is-loading="false" />
        </div>
      </div>

      <div
        v-if="sortedAndFilteredFavorites.length > 0"
        class="favorites-page__footer"
      >
        <BasePagination
          :total-pages="totalPages"
          :current-page="currentPage"
          @click="setCurrentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })
  const favoriteStore = useFavoriteStore()

  const itemsPerPage = 8
  const currentPage = ref(1)
  const searchQuery = ref('')
  const searchQueryActive = ref(false)
  const sortOption = ref('lowest')

  watch(searchQuery, (val) => {
    searchQueryActive.value = !!val
  })

  const filteredFavorites = computed(() => {
    if (!searchQuery.value) return favoriteStore.favorites
    return favoriteStore.favorites.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const sortedAndFilteredFavorites = computed(() => {
    const favorites = [...filteredFavorites.value]
    if (sortOption.value === 'lowest') {
      favorites.sort((a, b) => a.price - b.price)
    } else if (sortOption.value === 'highest') {
      favorites.sort((a, b) => b.price - a.price)
    }
    return favorites
  })

  const totalPages = computed(() =>
    Math.ceil(sortedAndFilteredFavorites.value.length / itemsPerPage),
  )

  const paginatedFavorites = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedAndFilteredFavorites.value.slice(start, end)
  })

  onMounted(() => {
    favoriteStore.loadFavoritesFromCookie()
  })

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }
</script>

<style lang="scss" scoped>
  .favorites-page {
    margin-bottom: 50px;

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

    &__footer {
      max-width: 1200px;
      margin: auto;
      margin-top: 2rem;
      text-align: center;
    }
  }
</style>
