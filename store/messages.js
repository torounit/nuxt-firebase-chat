import env from '../.env.json'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(env)
}
let db = firebase.database()
const ref = db.ref('messages')

export const state = () => ({
  list: []
})

export const getters = {
  all (state) {
    return state.list
  }
}

export const mutations = {
  ADD_MESSAGE (state, {text, created_at, author}) {
    // state.list.push({
    //   text,
    //   created_at,
    //   author
    // })
    ref.push({
      text,
      created_at,
      author
    })
  },
  RECEIVE_MESSAGES (state, data) {
    let messageIds = state.list.map((message) => message.created_at)
    Object.keys(data).forEach(key => {
      let message = data[key]
      if (!messageIds.includes(message.created_at)) {
        state.list.push(message)
      }
    })
    state.list.sort(function (a, b) {
      if (a.created_at < b.created_at) {
        return -1
      }
      if (a.created_at > b.created_at) {
        return 1
      }
      return 0
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
  },
  load ({commit}) {
    ref.off()
    ref.on('value',
      (snapshot) => { commit('RECEIVE_MESSAGES', snapshot.val()) }
    )
  }
}
