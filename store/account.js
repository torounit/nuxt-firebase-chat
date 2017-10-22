import uuid from 'uuid'

export const state = () => ({
  id: ''
})

export const getters = {
  id (state) {
    return state.id
  }
}

export const actions = {
  initialize ({commit}, data) {
    commit('INIT_ACCOUNT', data)
  }
}

export const mutations = {
  INIT_ACCOUNT (state) {
    if (!state.id) {
      state.id = uuid()
    }
  }
}
