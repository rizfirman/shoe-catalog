<template>
  <div>
    <div class="catalog-page">
      <p class="catalog-page__header">Catalog</p>

      <div class="catalog-page__search">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search by product name..."
          class="catalog-page__search-input"
        />
      </div>

      <div class="catalog-page__sort">
        <label for="sort">Sort by:</label>
        <select
          id="sort"
          v-model="sortOption"
          class="catalog-page__sort-select"
        >
          <option value="lowest">Price: Low to High</option>
          <option value="highest">Price: High to Low</option>
        </select>
      </div>

      <div v-if="sortedAndFilteredProducts.length === 0" class="empty-state">
        <p>No products found for "{{ searchQuery }}"</p>
      </div>

      <div v-else class="catalog-page__gallery">
        <div
          v-for="(product, index) in paginatedProducts"
          :key="`${index}-${currentPage}`"
        >
          <BaseProductCard
            :products="product"
            :isLoading="productStore.isLoading"
          />
        </div>
      </div>

      <div
        v-if="sortedAndFilteredProducts.length > 0"
        class="catalog-page__footer"
      >
        <div class="pagination">
          <button
            v-for="page in totalPages"
            :key="page"
            :class="{ active: page === currentPage }"
            @click="setCurrentPage(page)"
          >
            {{ page }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/productStore";

definePageMeta({
  layout: "main-layout",
});

const productStore = useProductStore();

const itemsPerPage = 8;
const currentPage = ref(1);
const searchQuery = ref("");
const sortOption = ref("lowest");

const filteredProducts = computed(() => {
  if (!searchQuery.value) return productStore.products;
  return productStore.products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const sortedAndFilteredProducts = computed(() => {
  const products = [...filteredProducts.value];
  if (sortOption.value === "lowest") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortOption.value === "highest") {
    products.sort((a, b) => b.price - a.price);
  }
  return products;
});

const totalPages = computed(() =>
  Math.ceil(sortedAndFilteredProducts.value.length / itemsPerPage),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedAndFilteredProducts.value.slice(start, end);
});

onMounted(() => {
  productStore.loadProductList();
});

const setCurrentPage = (page: number) => {
  currentPage.value = page;
};
</script>

<style lang="scss" scoped>
.catalog-page {
  margin-bottom: 50px;

  &__header {
    font-size: 2rem;
    text-align: center;
    margin-top: 5rem;
  }

  &__search {
    max-width: 400px;
    margin: 20px auto;
    text-align: center;
    padding: 10px;
  }

  &__search-input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
  }

  &__sort {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem auto;
  }

  &__sort-select {
    margin-left: 0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
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

.empty-state {
  text-align: center;
  padding: 2rem;
  font-size: 1.25rem;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.pagination button {
  padding: 0.5rem 0.75rem;
  background-color: #ffffff;
  color: #ff9800;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.pagination button.active,
.pagination button:hover {
  background-color: #ff9800;
  color: black;
}
</style>
