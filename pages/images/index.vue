<template>
  <div class="images">
    <div class="intro" />
    <div class="wrapper">
      <div v-for="image in images" :key="image.id" class="image">
        <div class="thumbnail">
          <img :src="path + image.id + image.extension" class="source">
        </div>
        <div class="content">
          <h2 class="title">
            {{ image.title }}
          </h2>
          <p class="description">
            {{ image.description.substring(0, 50) }}{{ image.description.length > 50 ? '...' : '' }}
          </p>
          <p class="size">
            {{ image.size }}
          </p>
          <nuxt-link :to="'/images/' + image.id" class="button">
            Edit
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ env, $axios }) {
    const result = await $axios.$get(env.BASE_URL + '/images')
    return {
      images: result,
      path: process.env.CDN_PATH + 'images/'
    }
  }
}
</script>

<style lang="scss" scoped>
.images {

  .wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 12.5px;

    .image {
      display: flex;
      flex-direction: column;
      width: 250px;
      background: var(--black);
      box-shadow: var(--shadow-all);
      margin: 12.5px;
      overflow: hidden;

      .thumbnail {
        height: 250px;
        z-index: 1;

        .source {
          width: 250px;
        }
      }

      .content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        z-index: 2;
        background: var(--black);
        height: 100%;

        .title {
          font-size: 25px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .description {
          font-size: 20px;
          opacity: .9;
          margin-bottom: 5px;
        }

        .size {
          font-size: 15px;
          opacity: .75;
          margin-bottom: 10px;
        }

        .button {
          background: var(--light);
          color: var(--dark);
          padding: 10px 5px;
          width: 50px;
          text-align: center;
          margin-top: auto;

          &:hover {
            background: var(--white);
          }
        }
      }
    }
  }
}
</style>
