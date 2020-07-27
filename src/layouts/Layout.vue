<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated  style="height: 56px">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title class="absolute-center">Notes</q-toolbar-title>

        <!-- <q-btn flat round dense icon="assignment_ind" class="absolute-right q-mr-sm" /> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width="350"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <div class="row">
        <search></search>
        <sort></sort>
      </div>

      <note></note>
      <div class="absolute-bottom text-center q-mb-lg">
        <q-btn @click="addAndEditNote" size="20px" round color="primary" icon="add" />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      leftDrawerOpen: false
    }
  },

  methods: {
    ...mapActions(['addAndEditNote'])
  },
  components: {
    search: require('components/Tools/Search.vue').default,
    sort: require('components/Tools/Sort.vue').default,
    note: require('components/Note.vue').default
  }
}
</script>

<style>
</style>
