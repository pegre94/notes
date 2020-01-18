<template>
  <div class="q-px-lg">
    <q-input borderless v-model="text" placeholder="Note name:" />
    <div class="q-mt-md">
      <editor
        @update="test"
        initialContent="
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>"
        v-bind:activeButtons="[
          'bold',
          'italic',
          'strike',
          'underline',
          'code',
          'paragraph',
          'h1',
          'h2',
          'h3',
          'bullet_list',
          'ordered_list',
          'blockquote',
          'code_block',
          'horizontal_rule',
          'undo',
          'redo'
        ]"
      ></editor>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    editor: require('components/Tools/Editor.vue').default
  },
  data () {
    return {
      text: ''
    }
  },

  methods: {
    test (something) {
      console.log(something)
    }
  }
}
</script>
