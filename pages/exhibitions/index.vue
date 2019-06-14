<template>
  <div class="exhibitions">
    <div class="intro">
      <nuxt-link class="button" to="/exhibitions/upload">
        Add
      </nuxt-link>
    </div>
    <div class="wrapper">
      <div v-for="exhibition in exhibitions" :key="exhibition.id" class="exhibition">
        <div class="content">
          <p class="year">
            {{ exhibition.year }}
          </p>
          <p class="name">
            {{ exhibition.name }}
          </p>
          <p class="location">
            {{ exhibition.location }}
          </p>
          <p class="type">
            type: {{ exhibition.type }}
          </p>
          <div class="space" />
          <nuxt-link class="button" :to="'/exhibitions/' + exhibition.id">
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
  async asyncData({ app }) {
    const result = await app.$axios.$get(`${app.$env.BASE_URL}/exhibitions`)
    return {
      exhibitions: result.sort((a, b) => (a.year.includes('-') ? a.year.split('-')[0] : a.year) - (b.year.includes('-') ? b.year.split('-')[0] : b.year))
    }
  }
}
</script>

<style lang="scss" scoped>
.exhibitions {

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

    .exhibition {
      display: flex;
      flex-direction: column;
      width: 250px;
      background: var(--black);
      box-shadow: var(--shadow-all);
      margin: 12.5px;
      overflow: hidden;

      .content {
        display: flex;
        flex-direction: column;
        padding: 20px;
        z-index: 2;
        background: var(--black);
        height: 100%;

        .year {
          font-size: 20px;
          opacity: .9;
          margin-bottom: 5px;
        }

        .name {
          font-size: 25px;
          font-weight: 700;
          margin-bottom: 5px;
          font-family: var(--font-mono);
        }

        .location {
          font-size: 15px;
          opacity: .75;
          margin-bottom: 10px;
        }

        .type {
          font-size: 15px;
          margin-bottom: 10px;
        }

        .space {
          flex-grow: 1;
        }

        .button {
          background: var(--light);
          color: var(--dark);
          padding: 10px 5px;
          width: 75px;
          text-align: center;
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
