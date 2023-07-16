<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { debounceTime, distinctUntilChanged, fromEvent } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'

const results = ref([])
const searchInput = ref<HTMLInputElement | null>(null)

async function search(input: string) {
  return await fetch(`https://api.github.com/search/repositories?q=${input}`)
    .then(res => res.json())
    .then(data => data.items.map((item: any) => item.full_name))
}

onMounted(() => {
  fromEvent(searchInput.value!, 'input')
    .pipe(
      map(e => (e.target as HTMLInputElement).value.trim()),
      filter(val => val.length !== 0),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(val => search(val)),
    )
    .subscribe((data) => {
      results.value = data
    })
})
</script>

<template>
  <input ref="searchInput" type="search">

  <pre>{{ results }}</pre>
</template>
