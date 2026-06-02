<template>

  <div class="card">

    <div class="filter-row">

      <select
        v-model="localFilter.upbjj"
      >
        <option value="">
          Semua UPBJJ
        </option>

        <option
          v-for="item in upbjjList"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>

      </select>

      <<select v-model="localFilter.kategori">

  <option value="">
    Semua Kategori
  </option>

  <option
    v-for="item in kategoriList"
    :key="item"
    :value="item"
  >
    {{ item }}
  </option>

</select>

      <select
        v-model="localFilter.sort"
      >

        <option value="">
          Urutkan
        </option>

        <option value="judul">
          Judul
        </option>

        <option value="harga">
          Harga
        </option>

        <option value="qty">
          Stok
        </option>

      </select>

      <label
        style="
        display:flex;
        align-items:center;
        gap:5px"
      >

        <input
          type="checkbox"
          v-model="localFilter.critical"
        />

        Stok Kritis

      </label>

      <button
        class="btn btn-warning"
        @click="resetFilter"
      >
        Reset
      </button>

    </div>

  </div>

</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  upbjjList: Array,
  kategoriList: Array
})

const emit = defineEmits([
  'change'
])

const localFilter = reactive({
  upbjj: '',
  kategori: '',
  sort: '',
  critical: false
})

watch(
  localFilter,
  () => {
    emit('change', {
      ...localFilter
    })
  },
  {
    deep: true
  }
)

function resetFilter() {

  localFilter.upbjj = ''
  localFilter.kategori = ''
  localFilter.sort = ''
  localFilter.critical = false

}
</script>