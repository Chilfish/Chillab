<script setup lang="ts">
defineProps<{
  hint: string
}>()

const dropZoneRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const fileText = ref('')

async function onDrop(files: File[] | FileList | null) {
  const file = files?.[0]
  if (!file)
    return

  const content = await file.text()
  fileText.value = content
}

useDropZone(dropZoneRef, onDrop)

defineExpose({
  fileText,
})
</script>

<template>
  <div
    ref="dropZoneRef"
    class="m-4 w-100 w-50% center-col cursor-pointer select-none gap-2 border-2 rounded-md border-dashed p-4 font-bold trans-all sm:h-sm"
    text="6 gray-400"
    hover="text-gray-600 border-gray-400 shadow-lg"
    @click="inputRef?.click()"
  >
    <p> Drop your {{ hint }} here </p>
    <p> or </p>
    <p> Click to select </p>

    <input
      ref="inputRef"
      type="file"
      class="hidden"
      accept="text/*"
      @change="(e) => onDrop((e.target as HTMLInputElement).files)"
    >
  </div>
</template>
