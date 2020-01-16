<template>
  <div class="q-px-lg">
    <q-input borderless v-model="text" placeholder="Note name:" />
    <div class="q-mt-md">
      <editor></editor>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    editor: require('components/Tools/Editor.vue').default
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>
