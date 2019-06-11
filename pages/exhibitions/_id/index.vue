<template>
  <div class="exhibition">
    <div class="wrapper">
      <div class="content">
        <input id="name" class="name" type="text" :value="exhibition.name" placeholder="name">
        <input id="year" class="year" type="text" :value="exhibition.year" placeholder="year">
        <input id="location" class="location" type="text" :value="exhibition.location" placeholder="location">
        <select id="type" class="type" required>
          <option value="solo">
            solo
          </option>
          <option value="group">
            group
          </option>
        </select>
        <div class="buttons">
          <button id="save" class="button" @click="update(exhibition.id)">
            Save
          </button>
          <button id="remove" class="button" @click="remove(exhibition.id)">
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
    const result = await $axios.$get(env.BASE_URL + '/exhibition/' + route.params.id)
    return {
      exhibition: result
    }
  },
  methods: {
    async update(id) {
      const name = document.getElementById('name').value
      const year = document.getElementById('year').value
      const location = document.getElementById('location').value
      const select = document.getElementById('type')
      const type = select.options[select.selectedIndex].text
      const button = document.getElementById('save')

      const result = await this.$axios.$request({
        baseURL: process.env.BASE_URL,
        url: `/exhibition/${id}`,
        method: 'patch',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token
        },
        data: {
          'name': name,
          'location': location,
          'year': year,
          'type': type
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/exhibitions')
      } else {
        button.disabled = false
        button.innerText = 'Error'
      }
    },
    async remove(id) {
      const button = document.getElementById('remove')
      const result = await this.$axios.$request({
        baseURL: process.env.BASE_URL,
        url: `/exhibition/${id}`,
        method: 'delete',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/exhibitions')
      } else {
        button.disabled = false
        button.innerText = 'Error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.exhibition {

  .wrapper {

    .content {
      display: flex;
      flex-direction: column;
      background: var(--black);
      box-shadow: var(--shadow-all);
      margin: 25px;
      padding: 50px;

      .name {
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

      .year {
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

      .location {
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

      .type {
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
  .exhibition {

    .wrapper {

      .content {

        .name {
          font-size: 15px;
        }

        .year {
          font-size: 15px;
        }

        .location {
          font-size: 15px;
        }

        .type {
          font-size: 15px;
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
