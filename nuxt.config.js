require('dotenv').config()

export default {
  mode: 'universal',

  head: {
    title: 'dashboard - tub-aiglart',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'desc' }
    ],
    link: [
      { rel: 'icon', href: '/img/favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700|Roboto:400,500,700&display=swap' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.7.1/css/all.css' }
    ]
  },

  loading: { color: '#fff' },

  css: [
    '~/node_modules/@tub/css/build/framework.css'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-universal-storage',
    ['nuxt-env', {
      keys: [
        'CDN_PATH',
        'BASE_URL'
      ]
    }]
  ],

  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
