<template>
  <div class="product-detail">
    <div v-if="productStore.isLoading" class="loading">
      Loading product details...
    </div>

    <div v-else-if="product" class="product-detail__content">
      <img
        :src="product.imgUrl"
        :alt="product.name"
        class="product-detail__image"
      />
      <h1 class="product-detail__title">{{ product.name }}</h1>
      <p class="product-detail__price">{{ convertToRupiah(product.price) }}</p>
      <p class="product-detail__description">{{ product.description }}</p>
      <BaseButton class="back-button" label="Back" @click="goBack" />
    </div>

    <div v-else class="error">
      <p>Product not found.</p>

      <BaseButton class="back-button" label="Back" @click="goBack" />
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'main-layout',
  })

  const route = useRoute()
  const router = useRouter()
  const productStore = useProductStore()
  const productId = Number(route.params.id)

  onMounted(() => {
    productStore.loadProductDetail(productId)
  })

  const product = computed(() => productStore.productDetail)

  const goBack = () => {
    router.back()
  }
</script>

<style lang="scss" scoped>
  .product-detail {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    min-height: 100vh;

    &__content {
      max-width: 600px;
      margin-top: 2rem;
    }

    &__image {
      width: 100%;
      height: auto;
      border-radius: 8px;
      margin-bottom: 1rem;
    }

    &__title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    &__price {
      font-size: 1.5rem;
      color: #ff9800;
      margin-bottom: 1rem;
    }

    &__description {
      font-size: 1.2rem;
      color: #555;
    }

    .loading {
      font-size: 1.5rem;
      color: #888;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .error {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #888;
      min-height: 100vh;
      text-align: center;
    }

    .back-button {
      margin-top: 1rem;
    }
  }
</style>
