<template>
  <q-list>
    <div v-for="note in notesFilteredAndSorted" :key="note.id">
      <q-item>
        <q-item-section>
          <q-item-label>{{ note.name }}</q-item-label>
          <q-item-label caption lines="3">{{ note.text }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ note.creationDate }}</q-item-label>
          <small>{{ note.creationTime }}</small>
          <q-icon size="xs" name="share" color="grey-7" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </div>
  </q-list>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters('notes', ['notes', 'notesFilteredAndSorted'])
  }
}
</script>
