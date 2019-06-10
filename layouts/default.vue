<template>
  <div id="__wrapper">
    <appNavbar />
    <nuxt />
  </div>
</template>

<script>
import appNavbar from '~/components/navbar'

export default {
  components: {
    appNavbar
  }
}
</script>

<style lang="scss">
#__nuxt {
  height: 100%;
}

#__layout {
  height: 100%;
}

#__wrapper {
  height: 100%;
}
</style>
