export default async function ({ store, redirect, app, env }) {
  if (store.state.auth.token) {
    const result = await app.$axios.$request({
      baseURL: 'https://api.tub-aiglart.com',
      url: '/validate',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + store.state.auth.token
      },
      validateStatus: function (status) {
        return status < 500
      }
    })

    if (result.message !== 'token_valid') {
      store.commit('auth/set', '')
      if (app.$storage.getCookie('token')) {
        const result = await app.$axios.$request({
          baseURL: 'https://api.tub-aiglart.com',
          url: '/refresh',
          method: 'get',
          headers: {
            'Authorization': 'Bearer ' + app.$storage.getCookie('token')
          },
          validateStatus: function (status) {
            return status < 500
          }
        })

        if (!result.access_token) {
          app.$storage.removeCookie('token')
          return redirect('/login')
        }

        store.commit('auth/set', result.access_token)
        app.$storage.setCookie('token', result.refresh_token)
      } else {
        return redirect('/login')
      }
    }
  } else if (app.$storage.getCookie('token')) {
    const result = await app.$axios.$request({
      baseURL: 'https://api.tub-aiglart.com',
      url: '/refresh',
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + app.$storage.getCookie('token')
      },
      validateStatus: function (status) {
        return status < 500
      }
    })

    if (!result.access_token) {
      app.$storage.removeCookie('token')
      return redirect('/login')
    }

    store.commit('auth/set', result.access_token)
    app.$storage.setCookie('token', result.refresh_token)
  } else {
    return redirect('/login')
  }
}
