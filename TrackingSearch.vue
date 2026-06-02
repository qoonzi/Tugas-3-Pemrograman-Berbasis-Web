<template>

<div class="card">

  <h3 style="margin-bottom:15px">
    Pencarian Delivery Order
  </h3>

  <div class="search-box">

    <input
      v-model="keyword"
      placeholder="Cari Nomor DO atau NIM"
      @keyup.enter="doSearch"
      @keyup.esc="doReset"
    />

    <button
      class="btn btn-primary"
      @click="doSearch"
    >
      Cari
    </button>

    <button
      class="btn btn-warning"
      @click="doReset"
    >
      Reset
    </button>

  </div>

</div>

</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits([
  'search',
  'reset'
])

const keyword = ref('')

function doSearch() {

  emit(
    'search',
    keyword.value
  )

}

function doReset() {

  keyword.value = ''

  emit('reset')

}
</script>