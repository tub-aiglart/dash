<template>
  <div class="exhibition">
    <h1>Exhibition</h1>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style lang="scss" scoped>
.exhibition {

  h1 {
    font-size: 25px;
  }
}
</style>
