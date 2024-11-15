<template>
  <div>
    <div class="catalog-page">
      <p class="catalog-page__header">Catalog</p>

      <BaseSearch v-model:search-query="searchQuery" />
      <BaseSort v-model:sort-option="sortOption" />

      <BaseEmptyState
        v-if="productStore.products.length === 0 && !productStore.isLoading"
        message="No products available at the moment."
      />

      <BaseEmptyState
        v-else-if="sortedAndFilteredProducts.length === 0 && searchQueryActive"
        :search-query="searchQuery"
      />

      <div
        v-else-if="
          sortedAndFilteredProducts.length === 0 &&
          !searchQueryActive &&
          productStore.isLoading
        "
        class="catalog-page__gallery"
      >
        <div
          v-for="(_, index) in Array.from({ length: itemsPerPage })"
          :key="`${index}-${currentPage}`"
        >
          <div class="catalog-page__skeleton-card">
            <BaseProductCardSkeleton />
          </div>
        </div>
      </div>

      <div v-else class="catalog-page__gallery">
        <div
          v-for="(product, index) in paginatedProducts"
          :key="`${index}-${currentPage}`"
        >
          <BaseProductCard
            :products="product"
            :is-loading="productStore.isLoading"
          />
        </div>
      </div>

      <div
        v-if="sortedAndFilteredProducts.length > 0"
        class="catalog-page__footer"
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

  const productStore = useProductStore()

  const itemsPerPage = 8
  const currentPage = ref(1)
  const searchQuery = ref('')
  const searchQueryActive = ref(false)
  const sortOption = ref('lowest')

  watch(searchQuery, (val) => {
    if (val) {
      searchQueryActive.value = true
    }
  })

  const filteredProducts = computed(() => {
    if (!searchQuery.value) return productStore.products
    return productStore.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  })

  const sortedAndFilteredProducts = computed(() => {
    const products = [...filteredProducts.value]
    if (sortOption.value === 'lowest') {
      products.sort((a, b) => a.price - b.price)
    } else if (sortOption.value === 'highest') {
      products.sort((a, b) => b.price - a.price)
    }
    return products
  })

  const totalPages = computed(() =>
    Math.ceil(sortedAndFilteredProducts.value.length / itemsPerPage),
  )

  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedAndFilteredProducts.value.slice(start, end)
  })

  onMounted(() => {
    productStore.loadProductList()
  })

  const setCurrentPage = (page: number) => {
    currentPage.value = page
  }
</script>
