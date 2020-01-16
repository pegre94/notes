<template>
  <div class="q-px-lg">
    <q-input borderless v-model="text" placeholder="Note name:" />
    <div class="q-mt-md">
      <editor-content class="editor__content" :editor="editor" />
      <editor></editor>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap';

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions';

export default {
  components: {
    EditorContent,
    editor: require('components/Tools/Editor.vue').default
  },
  data () {
    return {
      // Create an `Editor` instance with some default content. The editor is
      // then passed to the `EditorContent` component as a `prop`
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: '<p>This is just a boring paragraph</p>'
      }),
      text: ''
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>
