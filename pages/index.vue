<template>
  <div class="index">
    <div class="intro">
      <h1 class="title">
        Dashboard under construction ...
      </h1>
      <p class="description">
        Some preview-functions are already working!
      </p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated'
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
