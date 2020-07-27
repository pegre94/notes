<template>
  <q-input
    borderless
    v-model="searchField"
    label="Search"
    class="col q-px-md"
    @keyup.esc="searchField = ''">
    <template v-slot:append>
      <q-icon
        v-if="searchField !== ''"
        name="close"
        @click="searchField = ''"
        class="cursor-pointer"
        size="s"
      />
      <q-icon v-else size="s" name="search" />
    </template>
  </q-input>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('notes', ['search']),
    searchField: {
      get () {
        return this.search
      },
      set (value) {
        this.setSearch(value)
      }
    }
  },
  methods: {
    ...mapActions('notes', ['setSearch'])
  }
}
</script>
