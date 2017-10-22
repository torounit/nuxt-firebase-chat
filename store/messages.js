export const state = () => ({
  list: []
})

export const getters = {
  list (state) {
    return state.list
  }
}

export const mutations = {
  ADD_MESSAGE (state, {text, created_at}) {
    state.list.push({
      text,
      created_at
    })
  },
  REMOVE_MESSAGE (state, {message}) {
    state.list.splice(state.list.indexOf(message), 1)
  }
}

export const actions = {
  add ({commit}, data) {
    commit('ADD_MESSAGE', data)
  },
  remove ({commit}, data) {
    commit('REMOVE_MESSAGE', data)
  }
}
