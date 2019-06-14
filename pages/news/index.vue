<template>
  <div class="news">
    <div class="wrapper">
      <div class="content">
        <input id="title" class="title" type="text" :value="news.title" placeholder="title">
        <textarea id="description" v-model="description" class="description" rows="5" placeholder="description" />
        <div class="displayed">
          <input id="checkbox" class="checkbox" type="checkbox" :checked="news.displayed">
          <p class="label">
            Displayed
          </p>
        </div>
        <button id="save" class="button" @click="update()">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ route, app }) {
    const result = await app.$axios.$get(`${app.$env.BASE_URL}/news`)
    return {
      news: result,
      description: result.description
    }
  },
  methods: {
    async update(id) {
      const title = document.getElementById('title').value
      const description = document.getElementById('description').value
      const displayed = document.getElementById('checkbox').checked
      const button = document.getElementById('button')

      const result = await this.$axios.$request({
        baseURL: this.$env.BASE_URL,
        url: `/news`,
        method: 'patch',
        headers: {
          'Authorization': `Bearer ${this.$store.state.auth.token}`
        },
        data: {
          'title': title,
          'description': description,
          'displayed': displayed
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/')
      } else {
        button.disabled = false
        button.innerText = 'Error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news {

  .wrapper {
    display: flex;
    flex-direction: column;
    background: var(--black);
    box-shadow: var(--shadow-all);
    margin: 25px;

    .content {
      display: flex;
      flex-direction: column;
      padding: 50px;

      .title {
        font-size: 25px;
        border: none;
        padding: 5px;
        background: var(--white);
        color: var(--dark);
        font-weight: 700;
        outline: none;
        margin-bottom: 10px;
        font-family: var(--font-mono);
      }

      .description {
        font-size: 25px;
        border: none;
        padding: 5px;
        background: var(--white);
        color: var(--dark);
        font-weight: 700;
        outline: none;
        margin-bottom: 10px;
        font-family: var(--font-mono);
      }

      .displayed {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-family: var(--font-mono);

        .label {
          margin-left: 10px;
        }
      }

      .button {
        font-size: 25px;
        width: 150px;
        border: none;
        padding: 10px 5px;
        background: var(--light);
        color: var(--dark);
        font-weight: 700;
        outline: none;
        margin-right: 20px;
        font-family: var(--font-mono);

        &:hover {
          background: var(--white);
        }

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .image {

    .wrapper {

      .content {

        .title {
          font-size: 15px;
        }

        .description {
          font-size: 15px;
        }

        .displayed {

          .label {
            font-size: 15px;
          }
        }

        .button {
          font-size: 15px;
          margin: 0 0 10px 0;
        }
      }
    }
  }
}
</style>
