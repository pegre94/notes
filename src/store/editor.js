const state = {
  name: 'Test',
  editorContent:
    'Bla bla editor content Ipsum kasd consetetur no dolor sea accusam sed aliquyam est, stet ipsum rebum gubergren eirmod. Amet labore tempor sadipscing consetetur,.',
  currentNote: { 'idx': '',
    'note': {
      name: '',
      content: '',
      creationDate: '',
      creationTime: '',
      editDate: '',
      editTime: '',
      public: false
    }
  }
}

const getters = {
  getCurrentNote: state => {
    console.log(state.currentNote)
    return state.currentNote
  }
}

const actions = {
  setName ({ commit }, value) {
    commit('setName', value)
  },
  setEditorContent ({ commit }, value) {
    commit('setEditorContent', value)
  },
  setCurrentNote ({ commit }, value) {
    commit('editor/setCurrentNote', value)
  }
}
const mutations = {
  setName (state, value) {
    let newNote = Object.assign({}, state.currentNote)
    console.log('newNote', newNote)
    let newValue = value
    newNote.note.name = newValue
    state.currentNote = newNote
  },
  setEditorContent (state, value) {
    state.currentNote.note.content = value
  },
  setCurrentNote (state, newNote) {
    state.currentNote = JSON.parse(JSON.stringify(newNote))
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
