<template>
  <div class="image">
    <div class="wrapper">
      <div class="thumbnail">
        <img :src="path + image.id + image.extension" class="source">
      </div>
      <div class="content">
        <input id="title" class="title" type="text" :value="image.title" placeholder="title">
        <textarea id="description" v-model="image.description" class="description" rows="5" placeholder="description" />
        <input id="size" class="size" type="text" :value="image.size" placeholder="size">
        <div class="displayed">
          <input id="checkbox" class="checkbox" type="checkbox" :checked="image.displayed">
          <p class="label">
            Displayed
          </p>
        </div>
        <div class="buttons">
          <button id="save" class="button" @click="update(image.id)">
            Save
          </button>
          <button id="remove" class="button" @click="remove(image.id)">
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  async asyncData({ env, route, $axios }) {
    const result = await $axios.$get('https://api.tub-aiglart.com' + '/image/' + route.params.id)
    return {
      image: result,
      path: 'https://cdn.tub-aiglart.com' + 'images/'
    }
  },
  methods: {
    async update(id) {
      const title = document.getElementById('title').value
      const description = document.getElementById('description').value
      const size = document.getElementById('size').value
      const displayed = document.getElementById('checkbox').checked
      const button = document.getElementById('button')

      const result = await this.$axios.$request({
        baseURL: 'https://api.tub-aiglart.com',
        url: `/image/${id}`,
        method: 'patch',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token
        },
        data: {
          'title': title,
          'description': description,
          'size': size,
          'displayed': displayed
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/images')
      } else {
        button.disabled = false
        button.innerText = 'Error'
      }
    },
    async remove(id) {
      const button = document.getElementById('remove')
      const result = await this.$axios.$request({
        baseURL: 'https://api.tub-aiglart.com',
        url: `/image/${id}`,
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/images')
      } else {
        button.disabled = false
        button.innerText = 'Error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image {

  .wrapper {
    display: flex;
    flex-direction: column;
    background: var(--black);
    box-shadow: var(--shadow-all);
    margin: 25px;

    .thumbnail {
        height: auto;
        width: auto;

      .source {
        height: auto;
        width: 100%;
      }
    }

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

      .size {
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

      .buttons {

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

        .size {
          font-size: 15px;
        }

        .displayed {

          .label {
            font-size: 15px;
          }
        }

        .buttons {
          display: flex;
          flex-direction: column;

          .button {
            font-size: 15px;
            margin: 0 0 10px 0;
          }
        }
      }
    }
  }
}
</style>
