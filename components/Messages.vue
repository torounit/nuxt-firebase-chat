<template>
  <div>
    <div class="message" v-for="message in messages" v-bind:class="{ 'message--belongs-to-me': message.author == account }">
      <p style="white-space: pre;" class="message__text">{{ message.text }}</p>
      <time class="message__time">{{ message.created_at | displayTime }}</time>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Messages from '../components/Messages.vue'

  const displayTime = (time) => {
    const diff = new Date().getTime() - new Date(time).getTime()
    const d = new Date(diff)

    if (d.getUTCFullYear() - 1970) {
      return d.getUTCFullYear() - 1970 + '年前'
    } else if (d.getUTCMonth()) {
      return d.getUTCMonth() + 'ヶ月前'
    } else if (d.getUTCDate() - 1) {
      return d.getUTCDate() - 1 + '日前'
    } else if (d.getUTCHours()) {
      return d.getUTCHours() + '時間前'
    } else {
      return d.getUTCMinutes() + '分前'
    }
  }

  export default {
    components: {
      Messages
    },
    filters: {
      displayTime: displayTime
    },
    computed: {
      ...mapGetters({
        messages: 'messages/all',
        account: 'account/id'
      })
    },
    methods: {
      render () {
        this.$forceUpdate()
        setTimeout(this.render, 1000)
      }
    },
    mounted () {
      this.render()
    }

  }
</script>
<style scoped>
  .message {
    margin: 1em 0;
    padding: 0.5em 0.8em;
    background-color: #eee;
    border-radius: 5px;
  }

  .message--belongs-to-me {
    background-color: #41b883;
    color: #FFF;
  }

  .message__time {
    font-size: 0.7em;
  }
</style>
