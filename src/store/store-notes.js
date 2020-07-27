import Vue from 'vue'
import axios from 'axios'

const leadingZero = num => (num < 10 ? '0' : '') + num

function getDateAndTime () {
  const today = new Date()
  const date = today.getFullYear() + '/' + leadingZero(today.getMonth() + 1) + '/' + leadingZero(today.getDate())
  const time = leadingZero(today.getHours()) + ':' + leadingZero(today.getMinutes())
  return { 'date': date, 'time': time }
}

const state = {
  notes: {
    1: {
      name: 'Note 1',
      content:
        'True it nor nor can the he thee but, have muse ways had his crime scorching could, mammon by times congealed whateer ancient. Aye fulness olden consecrate unto smile of, high passion none apart mirth aught chaste, deigned cared charms fame massy disappointed adieu from amiss their. His where prose it from little had maidens, girls smile can his aye parasites muse, only the things deadly will, sins he spoiled his sins to in, childe bliss  a he any adversity fellow in earthly, bliss sick his from long fountain sun lyres could the. None ways left day and, companie of like and whilome from none visit change, a amiss in nor then not was bade apart sun, harold before shell feels had had his, misery his they blast saw with. Whom in his he not grief so shun given, heavenly for ive breast glorious power her. Mothernot harolds mighty dwell whose not olden to massy sore. Heart if harold clay hellas blast not. Could passed heavenly none nor, childe steel sighed the ee his, yea grief but crime waste not, given eremites was to control such hall, so revel worse along though in the bade it are, a so yet aught feel to, not he old strength upon from to, from fathers sacred glee him, by his his sing full pleasure feel bacchanals a. Whom them from ways from or left if, to the that none dwelt knew long pride. He sick delight wandered long riot his his to,.',
      creationDate: '2020/01/02',
      creationTime: '20:20',
      editionDate: '2020/01/03',
      editionTime: '21:30',
      public: true
    }
  },
  notesKeys: [1],
  notesReceived: false,
  search: '',
  sortAndOrder: { 'sort': 'name', 'order': 1 }
}
const getters = {
  notes: state => {
    return state.notes
  },
  notesKeys: (getters) => {
    return Object.keys(getters.notes)
  },
  notesReceived: state => {
    return state.notesReceived
  },
  sortAndOrder: state => {
    return state.sortAndOrder
  },
  keysSorted: (state, getters) => {
    function mergeDateAndTime(notes, idx, sort) {
      switch (sort) {
        case 'creationDate':
          return notes[idx]['creationDate'] + notes[idx]['creationTime']
        case 'editionDate':
          return notes[idx]['editionDate'] + notes[idx]['editionTime']
        default:
          return notes[idx][sort]
      }
    }
    const notes = getters.notes
    let unsortedNotesKeysGetter = getters.notesKeys
    const {sort, order} = getters.sortAndOrder
    let unsortedNotesKeys = [...unsortedNotesKeysGetter]
    unsortedNotesKeys.sort((a, b) => {
      let noteAProp = mergeDateAndTime(notes, a, sort).toLowerCase()
      let noteBProp = mergeDateAndTime(notes, b, sort).toLowerCase()
      if (noteAProp > noteBProp) return order
      else if (noteAProp < noteBProp) return -order
      else return 0
    })
    return unsortedNotesKeys
  },
  keysFilteredAndSorted: (state, getters) => {
    let notes = getters.notes
    let keysSortedGetter = getters.keysSorted
    let keysSorted = [...keysSortedGetter]
    let keysFilteredAndSorted = []
    if (state.search) {
      keysSorted.forEach((idx) => {
        let note = notes[idx]
        let noteNameLowerCase = note.name.toLowerCase()
        let searchNameLowerCase = state.search.toLowerCase()
        if (noteNameLowerCase.includes(searchNameLowerCase)) {
          keysFilteredAndSorted.push(idx)
        }
      })
      return keysFilteredAndSorted
    }
    return keysSorted
  },
  notesSorted: (state, getters) => {
    let notes = Object.assign({}, getters.notes)
    return getters.keysFilteredAndSorted.map(noteKey => ({ idx: noteKey, note: notes[noteKey] }))
  }
}

const actions = {
  getNotesFromDatabase ({ commit }) {
    function preprocessData (arr) {
      let responseObject = {}
      let responseList = []
      for (let i = 0; i < arr.length; i++) {
        let elem = arr[i]
        responseObject[elem['id']] = elem
        responseList.push(elem['id'])
      }
      return { 'object': responseObject, 'list': responseList }
    }
    axios
      .get('http://localhost:8000/notes/')
      .then(response => {
        
        let data = preprocessData(response.data)
        commit('setNotesObject', data['object'])
        commit('setNotesReceived', true)
      })
      .catch(error => {
         console.log(error)
      })
  },
  async addNoteToDatabase ({ commit }) {
    let today = getDateAndTime()
    let note = {
      name: '',
      content: '',
      creationDate: today.date,
      creationTime: today.time,
      editionDate: today.date,
      editionTime: today.time,
      public: false
    }
    
    let data = await axios.post('http://localhost:8000/notes/', note)
    return data

  },
  setSearch ({ commit }, value) {
    commit('setSearch', value)
  },
  setSortAndOrder ({ commit }, payload) {
    commit('setSortAndOrder', payload)
  },
  updateNote ({ commit }, payload) {
    let id = payload.idx
    let updatedNote = Object.assign({}, payload.note)
    let today = getDateAndTime()
    updatedNote['editionDate'] = today.date
    updatedNote['editionTime'] = today.time
    let newPayload = {
      'idx': id,
      'note': updatedNote
    }
    commit('updateNote', newPayload)
    axios.put('http://localhost:8000/notes/' + id, updatedNote)
  },
  addNote ({ commit }, note) {
    let payload = {
      'idx': note.id,
      'note': note
    }
    Promise.resolve(note).then(note => {
      commit('addNote', payload)
      return payload
    })

  }

}
const mutations = {
  setNotesObject (state, value) {
    state.notes = value
  },
  setSearch (state, value) {
    state.search = value
  },
  setNotesReceived (state, value) {
    state.notesReceived = value
  },
  setSortAndOrder (state, payload) {
    state.sortAndOrder = payload
  },

  updateNote (state, payload) {
    Object.assign(state.notes[payload.idx], payload.note)
  },
  addNote (state, payload) {
    Vue.set(state.notes, payload.idx, payload.note)
    state.notesKeys.push(payload.idx)
  },
  deleteNote (state, payload) {
    Vue.delete(state.notes, payload.idx)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
