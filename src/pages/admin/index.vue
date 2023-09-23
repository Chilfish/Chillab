<script setup lang="ts">
definePageMeta({
  redirect: '/admin/dashboard',
})

const title = 'Chilfish\'s Admin Dashboard'

useSeoMeta({
  ogUrl: useRoute().fullPath,
  twitterTitle: title,
  twitterDescription: title,
  ogDescription: title,
  ogTitle: title,
  title,
  description: title,
})
</script>
