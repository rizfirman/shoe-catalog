import type { Products } from "@/types";

export const useProductStore = defineStore("productStore", () => {
  const products = ref<Products[]>([]);
  const productDetail = ref(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const { fetchProductList } = useProductApi();

  const loadProductList = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      products.value = (await fetchProductList()) as Products[];
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    }
  };

  return { products, productDetail, isLoading, error, loadProductList };
});
