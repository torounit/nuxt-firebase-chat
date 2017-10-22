<template>
  <div>
    <messages></messages>
    <textarea placeholder="Enter message here" @keyup.enter="add"></textarea>

  </div>

</template>

<script>
  import Messages from '../components/Messages.vue'

  export default {
    components: {
      Messages
    },
    methods: {
      add (event) {
        this.$store.dispatch('messages/add', {
          text: event.target.value,
          created_at: new Date().toISOString()
        })
        event.target.value = ''
      }
    }
  }
</script>
