<template>
  <div class="users">
    <h1>Users</h1>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
}
</script>

<style lang="scss" scoped>
.users {

  h1 {
    font-size: 25px;
  }
}
</style>
