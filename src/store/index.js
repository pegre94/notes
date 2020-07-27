import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

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
      async addAndEditNote ({ commit, dispatch }) {
        let db_response
        try {
          db_response = await this.dispatch('notes/addNoteToDatabase', commit)
          Promise.resolve(db_response).then((db_response) => {
            
            let note = db_response.data
            let payload = {
              'idx': note.id,
              'note': note
            }
            
            this.commit('notes/addNote', payload)
            this.commit('editor/setCurrentNote', payload)
        })
        } catch (ex) {
          
        }},
      
      deleteNote ({ commit, state, rootGetters }, payload) {
        let currentNoteId = state.editor.currentNote.idx
        axios.delete('http://localhost:8000/notes/' + payload.idx)
        if (currentNoteId == payload.idx) {
          let notesKeys = rootGetters['notes/keysFilteredAndSorted']
          let notes = rootGetters['notes/notes']
          let id = notesKeys[0]
          let note = notes[id]
          let payload = {
            'idx': id,
            'note': note
          }
          this.commit('editor/setCurrentNote', payload)
        }
        commit('notes/deleteNote', payload)
      }

    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
