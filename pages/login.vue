<template>
  <div class="login">
    <div class="wrapper">
      <div class="text">
        <h2 class="top">
          tub-aiglart
        </h2>
        <p class="sub">
          Dashboard Login
        </p>
      </div>
      <div class="form">
        <p v-if="error.username.message !== ''" class="error">
          {{ error.username.message }}
        </p>
        <input
          id="username"
          type="text"
          class="input"
          placeholder="username"
          autocomplete="off"
          @input="checkInputs()"
          @keyup.enter="verifyInputs()"
        >
        <p v-if="error.password.message !== ''" class="error">
          {{ error.password.message }}
        </p>
        <input
          id="password"
          type="password"
          class="input"
          placeholder="password"
          @input="checkInputs()"
          @keyup.enter="verifyInputs()"
        >
        <button id="button" type="submit" class="button" disabled @click="verifyInputs()">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'clean',
  data() {
    return {
      error: {
        username: {
          message: ''
        },
        password: {
          message: ''
        }
      }
    }
  },
  methods: {
    checkInputs() {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const button = document.getElementById('button')

      if (username !== '' && password !== '') {
        button.disabled = false
      } else {
        button.disabled = true
      }

      this.error.username.message = ''
      this.error.password.message = ''
    },
    async verifyInputs() {
      const username = document.getElementById('username').value
      const password = document.getElementById('password').value
      const button = document.getElementById('button')

      this.$axios.setHeader('Content-Type', 'application/json')
      this.$axios.setHeader('Authorization', 'Basic ' + btoa(`${username}:${password}`))

      const result = await this.$axios.$get('/authorize', {
        validateStatus: function (status) {
          return status < 500
        }
      })

      if (result.access_token) {
        button.disabled = true
        this.$store.commit('auth/set', result.access_token)
        this.$storage.setCookie('token', result.refresh_token)
        this.$router.push('/')
      } else {
        button.disabled = false
        switch (result.error) {
          case 'invalid_username':
          case 'invalid_password':
            if (result.error === 'invalid_username') {
              this.error.username.message = 'Please provide a valid username!'
            } else if (result.error === 'invalid_password') {
              this.error.password.message = 'Please provide a valid password!'
            } else {
              this.error.password.message = 'An unknown error occurred, please try again later!'
            }
            break
          default:
            this.error.password.message = 'An unknown error occurred, please try again later!'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--black);
    width: 500px;
    height: 50%;
    box-shadow: var(--shadow-all);

    .text {
      display: flex;
      flex-direction: column;
      text-align: center;

      .top {
        font-size: 35px;
        font-weight: 700;
        text-align: inherit;
        font-family: var(--font-mono);
      }

      .sub {
        font-size: 15px;
        text-align: inherit;
        margin-top: 10px;
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;

      .error {
        font-size: 15px;
        margin-top: 10px;
      }

      .input {
        font-size: 20px;
        font-family: var(--font-mono);
        outline: none;
        border: none;
        padding: 5px;
        margin-top: 10px;
      }

      .button {
        font-size: 20px;
        font-family: var(--font-mono);
        background: var(--light);
        color: var(--black);
        outline: none;
        border: none;
        padding: 8px 15px;
        margin-top: 10px;

        &:hover {
          background: var(--white);
        }

        &:active {
          transform: translateY(1px);
        }

        &:disabled {
          cursor: not-allowed;
        }
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  .login {
    justify-content: flex-start;

    .wrapper {
      width: 100%;
      height: auto;
      padding: 100px 0;
    }
  }
}
</style>
