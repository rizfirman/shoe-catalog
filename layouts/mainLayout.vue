<template>
  <div>
    <nav class="navbar">
      <NuxtLink to="/home" class="nav-link">Home</NuxtLink>
      <NuxtLink to="/catalog" class="nav-link">Catalog</NuxtLink>
      <NuxtLink to="/about" class="nav-link">About</NuxtLink>
      <NuxtLink to="/favorite" class="nav-link">Favorite</NuxtLink>
    </nav>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 10;

  .nav-link {
    color: #ffffff;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;

    &:hover {
      color: #ff9800;
    }
  }
}
</style>
