import Vue from 'vue'
import Vuex from 'vuex'

import notes from './store-notes'
import editor from './editor'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
Vue.filter('stripHtml', function (value) {
  var div = document.createElement('div')
  div.innerHTML = value
  var text = div.textContent || div.innerText || ''
  return text
})

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      notes,
      editor
    },
    actions: {
      addAndEditNote ({ commit }) {
        let payload = notes.actions.addNote({ commit })
        commit('notes/addNote', payload)
        commit('editor/setCurrentNote', payload)
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
