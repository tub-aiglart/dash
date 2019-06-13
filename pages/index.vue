<template>
  <div class="index">
    <div class="intro">
      <h1 class="title">
        welcome, {{ user.username }}!
      </h1>
      <p class="description">
        There are {{ images.length }} images and {{ exhibitions.length }} exhibitions registered.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ store, env, $axios }) {
    const user = await $axios.$get(`${env.BASE_URL}/users/@me`, {
      headers: {
        'authorization': 'Bearer ' + store.state.auth.token
      }
    })
    const images = await $axios.$get(`${env.BASE_URL}/images`)
    const exhibitions = await $axios.$get(`${env.BASE_URL}/exhibitions`)
    return {
      user,
      images,
      exhibitions
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  padding: 25px;

  .intro {
    display: flex;
    flex-direction: column;
    background: var(--black);
    box-shadow: var(--shadow-all);
    padding: 50px;
    width: 100%;

    .title {
      font-size: 40px;
      font-weight: 700;
      margin-bottom: 10px;
      font-family: var(--font-mono);
    }

    .description {
      font-size: 20px;
      font-family: var(--font);
    }
  }
}
</style>
