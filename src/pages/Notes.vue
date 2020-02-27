<template>
  <div class="q-pb-sm q-pl-lg q-pr-md">
    <q-input class="q-pl-sm q-pt-md" borderless v-model="nameField" placeholder="Note name:" />
    <div class="q-mt-md"></div>
    <q-editor
      v-model="editorContentField"
      min-height="5rem"
      flat
      :definitions="{
        save: {
          tip: 'Save your work',
          icon: 'save',
          label: 'Save',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },

  computed: {
    ...mapState('editor', ['currentNote']),
    nameField: {
      get () {
        return this.currentNote.note.name
      },
      set (newValue) {
        this.setName(newValue)
      }
    },
    editorContentField: {
      get () {
        return this.currentNote.note.content
      },
      set (newValue) {
        this.setEditorContent(newValue)
      }
    }
  },
  methods: {
    ...mapActions('editor', ['setName', 'setEditorContent']),
    ...mapActions('notes', ['updateNote']),
    saveWork () {
      this.updateNote(this.currentNote)
    }
  }
}
</script>

<style scoped>
.q-input {
  font-size: 1.5em;
}
</style>
