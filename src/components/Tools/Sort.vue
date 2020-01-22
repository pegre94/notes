<template>
  <q-select
    dense
    filled
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by:"
    stack-label
  />
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      options: [
        {
          label: 'Name',
          value: 'name'
        },
        {
          label: 'Edit',
          value: 'editionDate'
        },
        {
          label: 'Creation',
          value: 'creationDate'
        }
      ]
    }
  },
  computed: {
    ...mapState('notes', ['sort']),
    sortBy: {
      get () {
        return this.sort
      },
      set (value) {
        this.setSort(value)
      }
    }
  },
  methods: {
    ...mapActions('notes', ['setSort'])
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 80px;
}
</style>
