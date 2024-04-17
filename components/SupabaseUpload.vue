<script setup lang="ts">
const supabase = useSupabase()
const uploading = ref(false)
const runtimeConfig = useRuntimeConfig()
const files = ref()
const emit = defineEmits(['update:path', 'upload'])
const uploadImage = async (evt: unknown[]) => {
  console.log(evt)

  files.value = evt
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`
    const { error: uploadError, data } = await supabase.storage
      .from('love-story')
      .upload(filePath, file)
    if (uploadError) throw uploadError

    emit('update:path', filePath)
    if (data?.path) {
      emit(
        'upload',
        `${runtimeConfig.public.supabaseUrl}/storage/v1/object/public/${runtimeConfig.public.supabaseStorage}/${data.path}`
      )
    }
  } catch (error) {
    alert((error as Error).message)
  } finally {
    uploading.value = false
  }
}
</script>

<template>
  <UInput
    type="file"
    size="sm"
    accept="image/*"
    :disabled="uploading"
    @change="uploadImage"
  />
</template>
