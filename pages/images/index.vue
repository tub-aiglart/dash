<template>
  <div class="images">
    <div class="intro">
      <nuxt-link class="button" to="/images/upload">
        Upload
      </nuxt-link>
    </div>
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
    const result = await $axios.$get('https://api.tub-aiglart.com' + '/images')
    return {
      images: result,
      path: process.env.CDN_PATH + 'images/'
    }
  }
}
</script>

<style lang="scss" scoped>
.images {

  .intro {
    display: flex;
    flex-direction: column;
    background: var(--black);
    box-shadow: var(--shadow-all);
    margin: 25px 25px 0 25px;
    padding: 50px;

    .button {
      font-size: 25px;
      width: 150px;
      padding: 10px 5px;
      background: var(--light);
      color: var(--dark);
      font-weight: 700;
      font-family: var(--font-mono);
      text-align: center;
    }
  }

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
          font-family: var(--font-mono);
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
          width: 75px;
          text-align: center;
          margin-top: auto;
          font-family: var(--font-mono);

          &:hover {
            background: var(--white);
          }
        }
      }
    }
  }
}
</style>
