const state = {
  notes: {
    ID1: {
      name: 'Note 1',
      text:
        'True it nor nor can the he thee but, have muse ways had his crime scorching could, mammon by times congealed whateer ancient. Aye fulness olden consecrate unto smile of, high passion none apart mirth aught chaste, deigned cared charms fame massy disappointed adieu from amiss their. His where prose it from little had maidens, girls smile can his aye parasites muse, only the things deadly will, sins he spoiled his sins to in, childe bliss  a he any adversity fellow in earthly, bliss sick his from long fountain sun lyres could the. None ways left day and, companie of like and whilome from none visit change, a amiss in nor then not was bade apart sun, harold before shell feels had had his, misery his they blast saw with. Whom in his he not grief so shun given, heavenly for ive breast glorious power her. Mothernot harolds mighty dwell whose not olden to massy sore. Heart if harold clay hellas blast not. Could passed heavenly none nor, childe steel sighed the ee his, yea grief but crime waste not, given eremites was to control such hall, so revel worse along though in the bade it are, a so yet aught feel to, not he old strength upon from to, from fathers sacred glee him, by his his sing full pleasure feel bacchanals a. Whom them from ways from or left if, to the that none dwelt knew long pride. He sick delight wandered long riot his his to,.',
      creationDate: '2020/01/02',
      creationTime: '20:20',
      editDate: '2020/01/03',
      editTime: '21:30',
      public: true
    },
    ID2: {
      name: 'Note 2',
      text:
        'Above bends saintly dream thereat expressing. Maiden the darkness thing of many sorrowsorrow i, eyes hope fancy so made cushioned ancient, my leave above a of chamber weary ease. Streaming and laden i stepped of my of obeisance, cushions not ghastly bosoms heaven when. Clasp uncertain name morrow radiant i at ominous truly, lies is of quoth this did caught, that more his thy home guessing master leave door. Heart or name gently heart. Weary december violet air the whether above. To my the beak all to and my. He word rare thing till these the as human. Word have at shall placid leave footfalls. But devil door for mefilled perfumed. Of of so pallid back take is then, thee sat from ominous tapping grew. Bore nothing let over each agreeing beating tapping ah. Above a here lamplight felt, lenore relevancy hope myself its. Evilprophet is shore sitting bird, here by came what on. Or my my of tapping. Dared grim still my syllable. And rare my of nights this least maiden sir me, word no let thy stopped floor curious said undaunted. Whispered smiling and youhere thing our did. From said and while that into mefilled whether back. More plutonian i once hear straight, raven the that lent whose she friends, laden gileadtell nights his tempest unbrokenquit window and hath, no the or fancy in eyes velvet distant pallid my. No my was nightly then and adore back thereis floor, repeating one longer i unbroken to forgiveness tempest, and.',
      creationDate: '2020/01/04',
      creationTime: '21:21',
      editDate: '2020/01/08',
      editTime: '21:34',
      public: false
    },
    ID3: {
      name: 'Note 3',
      text:
        'Duo amet dolor diam dolor eirmod. Dolor diam clita eirmod dolor diam sadipscing dolor et. Labore nonumy amet aliquyam est accusam voluptua et amet. Et clita consetetur est stet stet kasd. Sanctus dolore eos gubergren consetetur, invidunt stet dolore eirmod at tempor, sit sed et eos consetetur at sit et nonumy. Consetetur et amet gubergren justo ipsum. Aliquyam dolor at sit lorem nonumy est lorem amet kasd, et diam et elitr consetetur amet sed, gubergren invidunt amet sit sadipscing, voluptua vero lorem erat erat no diam nonumy diam. Labore est ipsum erat invidunt et aliquyam sea diam. Sit invidunt sanctus sit at dolore dolor sed kasd, dolor gubergren et sanctus no tempor labore dolore. Labore elitr labore eirmod sea clita dolor eos sit ipsum. Duo no et dolor lorem amet ipsum tempor, duo aliquyam labore sit dolor clita. Rebum dolor et stet amet labore eos, at sadipscing et sea nonumy lorem takimata tempor clita lorem, eos sadipscing voluptua lorem gubergren rebum vero est ut. Et tempor amet nonumy sed clita et at. At duo eos lorem at sed sea erat, diam sit duo dolores aliquyam no ipsum, ea eirmod takimata voluptua eos, et et et kasd stet eirmod. Stet ipsum eos sadipscing ipsum et, aliquyam sanctus justo sadipscing eirmod ut sed voluptua justo clita, lorem ipsum eos justo vero sea erat vero et. Dolores no nonumy dolore gubergren takimata sed dolor erat. Diam sit stet aliquyam eirmod diam ea takimata lorem consetetur. Voluptua sadipscing stet amet dolore eirmod dolor, ut.',
      creationDate: '2020/01/03',
      creationTime: '20:20',
      editDate: '2020/01/05',
      editTime: '21:30',
      public: true
    }
  },
  search: '',
  sort: 'name'
}

const getters = {
  notes: state => {
    return state.notes
  },
  notesSorted: state => {
    let notesSorted = {}
    let keysOrdered = Object.keys(state.notes)

    keysOrdered.sort((a, b) => {
      let noteAProp = state.notes[a][state.sort].toLowerCase()
      let noteBProp = state.notes[b][state.sort].toLowerCase()
      console.log('state_sort', state.sort)
      console.log(state.notes[a][state.sort], state.notes[b][state.sort])
      if (noteAProp > noteBProp) return 1
      else if (noteAProp < noteBProp) return -1
      else return 0
    })
    console.log('keysOrdered', keysOrdered)
    keysOrdered.forEach(key => {
      notesSorted[key] = state.notes[key]
    })
    console.log('notesSorted', notesSorted)

    return notesSorted
  },
  notesFilteredAndSorted: (state, getters) => {
    let notesSorted = getters.notesSorted
    let notesFiltered = {}
    if (state.search) {
      Object.keys(notesSorted).forEach(key => {
        let note = notesSorted[key]
        let noteNameLowerCase = note.name.toLowerCase()
        let searchNameLowerCase = state.search.toLowerCase()
        if (noteNameLowerCase.includes(searchNameLowerCase)) {
          notesFiltered[key] = note
        }
      })
      return notesFiltered
    }
    return notesSorted
  }
}

const actions = {
  setSearch ({ commit }, value) {
    commit('setSearch', value)
  },
  setSort ({ commit }, value) {
    commit('setSort', value)
  }
}
const mutations = {
  setSearch (state, value) {
    state.search = value
  },
  setSort (state, value) {
    state.sort = value
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
