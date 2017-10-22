import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    key: 'nuxt-firebase-chat'
  })(store)
}
