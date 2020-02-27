<template>
<div>
  <q-list>
    <div :key="i" v-for="(data, i) in notesSorted">
      <q-item clickable @click="toEditor(data.note, data.idx)">
        <q-item-section>
          <q-item-label>{{ data.note.name ? data.note.name : 'New note'}}</q-item-label>
          <q-item-label caption lines="3">{{ data.note.content ? data.note.content : 'Text placeholder..'  | stripHtml }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <template v-if="sortAndOrder.sort == 'creationDate'">
          <q-item-label caption >{{ data.note.creationDate }}</q-item-label>
          <small>{{ data.note.creationTime }}</small>
          </template>
          <template v-else>
          <q-item-label caption >{{ data.note.editionDate }}</q-item-label>
          <small>{{ data.note.editionTime }}</small>
          </template>
          <q-item-label caption lines="2"><q-btn @click.stop="toDelete(data.idx, i)" flat dense icon="delete" size="sm"  color="grey-7" /></q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </div>
  </q-list>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      testNotes: ''
    }
  },
  computed: {
    ...mapGetters('notes', ['notes', 'notesReceived', 'keysFilteredAndSorted', 'notesSorted', 'sortAndOrder'])
  },
  methods: {
    ...mapActions('editor', ['setCurrentNote']),
    ...mapActions('notes', ['getNotesFromDatabase']),
    ...mapActions(['deleteNote']),
    onStartup () {
      let notes = this.notes
      let keys = this.keysFilteredAndSorted
      let idx = keys[0]
      let note = notes[idx]
      this.toEditor(note, idx)
    },
    toEditor (note, idx) {
      let noteWithIdx = {
        'idx': idx,
        'note': note
      }
      this.setCurrentNote(noteWithIdx)
    },
      
    toDelete (idx, i) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Are you sure you want to permamently remove the note?",
          cancel: { flat: true, color: "primary" },
          ok: { flat: true, color: "primary" },
          persistent: true
        })
        .onOk(() => {
      let payload = {
        'idx': idx,
        'i': i
      }
      console.log(payload)
      this.deleteNote(payload)
    })}},

  mounted () {
    this.getNotesFromDatabase()
  },
  watch: {
    notesReceived () {
      this.onStartup()
    }

  }
}
</script>
