<template>
  <div class="app">
    <div class="app__messages" ref="messages">
      <messages></messages>
    </div>
    <div class="app__input">
      <textarea placeholder="Enter message here" @keydown.enter="add" rows="2"></textarea>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Messages from '../components/Messages.vue'
  export default {
    components: {
      Messages
    },
    computed: {
      ...mapGetters({
        messages: 'messages/all'
      })
    },
    updated () {
      this.$nextTick(function () {
        console.log('update')
      })
    },
    methods: {
      scrollToLast () {
        this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight
      },
      add (event) {
        event.preventDefault()
        let text = event.target.value.trim()
        let author = this.$store.state.account.id
        if (!event.ctrlKey && !event.shiftKey && text) {
          this.$store.dispatch('messages/add', {
            text: text,
            created_at: new Date().toISOString(),
            author: author
          })
          this.$nextTick(() => {
            this.scrollToLast()
            event.currentTarget.rows = 2
            event.target.value = ''
          })
        } else {
          let r = event.currentTarget.rows
          event.currentTarget.rows = parseInt(r) + 2
        }
      }
    },
    mounted () {
      this.scrollToLast()
      this.$watch('messages', this.scrollToLast)
      this.$store.dispatch('account/initialize')
      this.$store.dispatch('messages/load')
    }
  }
</script>
<style scoped>
  .app {
    margin: 0 16px;
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  .app__messages {
    overflow: auto;
    flex: 1 1 100vh;
  }

  .app__input {
    min-height: 2em;
    flex: 1 0 auto;
    & textarea {
      width: 100%;
      height: 100%;
      line-height: 1.8;
      resize: none;
    }
  }
</style>
