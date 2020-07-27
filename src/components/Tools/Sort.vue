<template>
  <q-select
    filled
    v-model="sortBy"
    :options="options"
    option-value="id"
    label="Sort by:"
    :display-value="`${ currentLabel }`"
    :dropdown-icon="`${ currentIcon }`"
    >
    <template v-slot:option="scope">
   <q-item
    v-bind="scope.itemProps"
    v-on="scope.itemEvents"
    dense
    no-wrap
    :active="scope.opt.id==currentId"
   >
         <q-item-section> 
         <q-item-label >{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      <q-item-section side>
        <q-icon size="xs" color="grey-7" :name="scope.opt.icon" />
      </q-item-section>

    </q-item>
    </template>
  </q-select>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      options: [
        {
          id: '1',
          label: 'Name',
          value: 'name',
          icon: 'fas fa-sort-alpha-down',
          order: 1

        },
        {
          id: '2',
          label: 'Name',
          value: 'name',
          icon: 'fas fa-sort-alpha-down-alt',
          order: -1

        },
        {
          id: '3',
          label: 'Edit',
          value: 'editionDate',
          icon: 'fas fa-sort-numeric-down-alt',
          order: -1
        },
        {
          id: '4',
          label: 'Edit',
          value: 'editionDate',
          icon: 'fas fa-sort-numeric-down',
          order: 1


        },
        {
          id: '5',
          label: 'Creation',
          value: 'creationDate',
          icon: 'fas fa-sort-numeric-down-alt',
          order: -1
        },
        {
          id: '6',
          label: 'Creation',
          value: 'creationDate',
          icon: 'fas fa-sort-numeric-down',
          order: 1
        }
      ],
      currentId: '1',
      currentLabel: 'Name',
      currentIcon: 'fas fa-sort-alpha-down'


    }
  },
  computed: {
    ...mapGetters('notes', ['sortAndOrder']),
    sortBy: {
      get () {
        console.log(this.sort)
        return this.sortAndOrder.sort
      },
      set (payload) {
        console.log(payload)
        this.setSortAndOrder({'sort': payload.value, 'order': payload.order})
        this.currentId = payload.id
        this.currentLabel = payload.label
        this.currentIcon = payload.icon
      }
    }
  },
  methods: {
    ...mapActions('notes', ['setSortAndOrder'])
  }
}
</script>

<style scoped>
.q-select {
  flex: 0 0 120px;
}
</style>
