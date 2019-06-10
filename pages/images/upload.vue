<template>
  <div class="upload">
    <div class="wrapper">
      <div class="content">
        big files not supported yet
        <input id="file" class="file" type="file" name="file" accept="image/png, image/jpeg">
        <input id="title" class="title" type="text" placeholder="title">
        <textarea id="description" class="description" rows="5" placeholder="description" />
        <input id="size" class="size" type="text" placeholder="size">
        <div class="displayed">
          <input id="checkbox" class="checkbox" type="checkbox">
          <p class="label">
            Displayed
          </p>
        </div>
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
      const file = document.getElementById('file').files[0]
      const title = document.getElementById('title').value
      const description = document.getElementById('description').value
      const size = document.getElementById('size').value
      const displayed = document.getElementById('checkbox').checked
      const button = document.getElementById('save')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('size', size)
      formData.append('displayed', displayed)

      const result = await this.$axios.$request({
        baseURL: process.env.BASE_URL,
        url: `/image`,
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + this.$store.state.auth.token,
          'Content-Type': 'multipart/form-data'
        },
        data: formData,
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.message === 'success') {
        this.$router.push('/images')
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

      .file {
        margin-bottom: 10px;
        font-size: 20px;
        border: none;
        font-weight: 700;
        outline: none;
      }

      .title {
        font-size: 25px;
        border: none;
        padding: 5px;
        background: var(--white);
        color: var(--dark);
        font-weight: 700;
        outline: none;
        margin-bottom: 10px;
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
      }

      .displayed {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;

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
</style>
