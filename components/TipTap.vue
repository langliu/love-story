<template>
  <div v-if="editor" class="flex gap-2 mb-2">
    <UButton
      :disabled="!editor.can().chain().focus().toggleBold().run()"
      :class="{ 'is-active': editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      bold
    </UButton>
    <UButton
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      italic
    </UButton>
    <UButton
      :disabled="!editor.can().chain().focus().toggleCode().run()"
      :class="{ 'is-active': editor.isActive('code') }"
      @click="editor.chain().focus().toggleCode().run()"
    >
      code
    </UButton>
    <button
      :class="{ 'is-active': editor.isActive('paragraph') }"
      @click="editor.chain().focus().setParagraph().run()"
    >
      paragraph
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      h1
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      h2
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      h3
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
    >
      h4
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
    >
      h5
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
    >
      h6
    </button>
    <button
      :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      bullet list
    </button>
    <button
      :class="{ 'is-active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      ordered list
    </button>
    <button
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      code block
    </button>
    <button
      :class="{ 'is-active': editor.isActive('blockquote') }"
      @click="editor.chain().focus().toggleBlockquote().run()"
    >
      blockquote
    </button>
    <UButton
      :class="{ 'is-active': editor.isActive('blockquote') }"
      @click="addImage"
    >
      Image
    </UButton>
    <u-modal v-model="isOpen">
      <SupabaseUpload @upload="handleImageUpload" />
    </u-modal>
  </div>
  <div>
    <editor-content :editor="editor" class="border rounded-2 overflow-hidden px-1 py-1" />
  </div>
</template>

<script lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      editor: undefined,
      isOpen: false,
    }
  },
  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor?.getHTML() === value

      if (isSame) {
        return
      }

      this.editor?.commands?.setContent(value, false)
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2],
          },
        }),
        Image,
      ],
      onUpdate: () => {
        this.$emit('update:modelValue', this.editor?.getHTML())
      },
    })
  },

  beforeUnmount() {
    this.editor?.destroy()
  },
  methods: {
    addImage() {
      this.isOpen = true
      // const url = window.prompt('URL')

      // if (url) {
      //   this.editor.chain().focus().setImage({ src: url }).run()
      // }
    },
    handleImageUpload(url: string) {
      this.editor?.chain().focus().setImage({ src: url }).run()
      this.isOpen = false
    },
  },
}
</script>
