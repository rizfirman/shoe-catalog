<template>
  <div>
    <nav class="navbar">
      <button class="hamburger" @click="isMenuOpen = !isMenuOpen">☰</button>
      <div :class="['nav-links', { 'nav-links--open': isMenuOpen }]">
        <NuxtLink
          to="/home"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/home' }"
          @click="isMenuOpen = false"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/catalog"
          class="nav-link"
          :class="{ 'active-link': route.path.startsWith('/catalog') }"
          @click="isMenuOpen = false"
        >
          Catalog
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/about' }"
          @click="isMenuOpen = false"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/favorites"
          class="nav-link"
          :class="{ 'exact-active-link': route.path === '/favorites' }"
          @click="isMenuOpen = false"
        >
          Favorites
        </NuxtLink>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute()
  const isMenuOpen = ref(false)
</script>

<style lang="scss" scoped>
  .navbar {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;

    .nav-links {
      display: flex;
      gap: 2rem;
      flex-grow: 1;
      justify-content: center;

      @media (max-width: 768px) {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 30px;
        left: 0;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        padding: 1rem;
        gap: 1rem;
        align-items: center;
      }

      &.nav-links--open {
        display: flex;
      }
    }

    .nav-link {
      color: vars.$primary-color;
      text-decoration: none;
      font-size: 1.2rem;
      transition: color 0.3s;

      &:hover {
        color: vars.$secondary-color;
      }

      &.active-link,
      &.exact-active-link {
        color: vars.$secondary-color;
        font-weight: bold;
      }
    }

    .hamburger {
      display: none;
      font-size: 1.5rem;
      background: none;
      border: none;
      color: vars.$primary-color;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: vars.$secondary-color;
      }

      @media (max-width: 768px) {
        display: block;
        position: absolute;
        right: 1rem;
      }
    }
  }
</style>
