<template>
  <div class="upload">
    <div class="wrapper">
      <div class="content">
        <input id="name" class="name" type="text" placeholder="name">
        <input id="year" class="year" type="text" placeholder="year">
        <input id="location" class="location" type="text" placeholder="location">
        <select id="type" class="type" required>
          <option value="solo">
            solo
          </option>
          <option value="group">
            group
          </option>
        </select>
        <button id="save" class="button" @click="upload()">
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  methods: {
    async upload() {
      const name = document.getElementById('name').value
      const year = document.getElementById('year').value
      const location = document.getElementById('location').value
      const select = document.getElementById('type')
      const type = select.options[select.selectedIndex].text
      const button = document.getElementById('save')

      const result = await this.$axios.$request({
        url: `/exhibition`,
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token
        },
        data: {
          name: name,
          location: location,
          year: year,
          type: type
        },
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/exhibitions')
      } else {
        button.text = 'Error'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.upload {
  display: flex;
  padding: 25px;

  .wrapper {
    display: flex;
    background: var(--black);
    box-shadow: var(--shadow-all);
    padding: 25px;
    width: 100%;

    .content {
      display: flex;
      flex-direction: column;
      padding: 25px;
      width: 100%;

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
  .upload {

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

        .button {
          font-size: 15px;
        }
      }
    }
  }
}
</style>
