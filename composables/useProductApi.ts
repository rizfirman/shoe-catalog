export function useProductApi() {
  const fetchProductList = async () => {
    try {
      const data = await $fetch("/api/products");
      return data;
    } catch (error) {
      console.error("Error fetching product list:", error);
      throw error;
    }
  };

  return { fetchProductList };
}
