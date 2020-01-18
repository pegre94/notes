<template>
  <div class="editor">
    <div class="toolbox">
      <editor-menu-bar :editor="editor">
        <div slot-scope="{ commands, isActive }">
          <!-- <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <q-icon name="src/statics/icons_editor/bold.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <q-icon name="src/statics/icons_editor/italic.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <q-icon name="src/statics/icons_editor/strike.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <q-icon name="src/statics/icons_editor/underline.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <q-icon name="code" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <q-icon name="src/statics/icons_editor/paragraph.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <q-icon name="src/statics/icons_editor/ul.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <q-icon name="src/statics/icons_editor/ol.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <q-icon name="src/statics/icons_editor/quote.svg" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <q-icon name="src/statics/icons_editor/code.svg" />
          </button>-->
          <q-btn flat color="primary" icon="horizontal-line" @click="commands.hr"></q-btn>
          <!-- <button class="menubar__button" @click="commands.horizontal_rule">
            <q-icon name="src/statics/icons_editor/hr.svg" />
          </button>-->
          <q-btn flat color="primary" icon="undo" @click="commands.undo"></q-btn>

          <q-btn flat color="primary" icon="redo" @click="commands.redo"></q-btn>
        </div>
      </editor-menu-bar>
    </div>
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
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
  name: 'editor',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    initialContent: {
      type: String,
      required: true,
      default: '<em>editable text</em>'
    }
  },
  data () {
    return {
      html: '',
      json: '',
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
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ],
        content: this.initialContent
      })
    }
  },
  beforeDestroy () {
    this.editor.destroy()
  },
  created () {
    this.html = this.editor.getHTML()
    this.json = this.editor.getJSON()
    this.editor.on('update', () => {
      this.html = this.editor.getHTML()
      this.json = this.editor.getJSON()
      this.$emit('update', this.html)
    })
  }
}
</script>

<style lang="css" scoped>
.toolbox {
  background-color: #222;
  height: 50px;
}
.q-btn >>> .q-icon {
  color: white;
}
</style>
