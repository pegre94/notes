<template>
  <q-list>
    <div v-for="(note, idx) in notesFilteredAndSorted">
      <q-item clickable @click="toEditor(note, idx)">
        <q-item-section>
          <q-item-label>{{ note.name ? note.name : 'New note'}}</q-item-label>
          <q-item-label caption lines="3">{{ note.content ? note.content : 'Text placeholder..'  | stripHtml }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ note.editionDate }}</q-item-label>
          <small>{{ note.editionTime }}</small>
          <q-icon size="xs" name="share" color="grey-7" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </div>
  </q-list>
</template>

<script>
import { mapGetters, mapActions, mapFilters } from 'vuex'
export default {
  computed: {
    ...mapGetters('notes', ['notes', 'notesFilteredAndSorted'])
  },
  methods: {
    ...mapActions('editor', ['setCurrentNote']),
    onStartup () {
      let notes = this.notesFilteredAndSorted
      let idx = Object.keys(notes)[0]
      let note = notes[idx]
      this.toEditor(note, idx)
    },
    toEditor (note, idx) {
      let noteWithIdx = {
        'idx': idx,
        'note': note
      }
      this.setCurrentNote(noteWithIdx)
    }
  },
  mounted () {
    this.onStartup()
  }
}
</script>
