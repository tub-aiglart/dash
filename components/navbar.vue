<template>
  <div class="nav">
    <div class="links">
      <nuxt-link class="link" to="/">
        Home
      </nuxt-link>
      <nuxt-link class="link" to="/images">
        Images
      </nuxt-link>
      <nuxt-link class="link" to="/images/upload">
        Upload
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  flex-direction: row;
  background: var(--black);
  box-shadow: var(--shadow-bottom);
  height: 75px;

  .links {
    display: flex;
    flex-direction: row;

    .link {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 25px;
      height: 100%;
      padding: 0 20px;

      &:hover {
        background: var(--dark);
      }
    }
  }
}
</style>
