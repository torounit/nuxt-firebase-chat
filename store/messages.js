export const state = {
  messages: []
}

export const mutations = {
  add (state, text) {
    state.messages.push({
      text: text,
    })
  },
}
