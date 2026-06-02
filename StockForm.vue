<template>

  <div class="card">

    <h3 style="margin-bottom:15px">

      {{ isEdit ? 'Edit Data' : 'Tambah Data Bahan Ajar' }}

    </h3>

    <form
      class="form-grid"
      @submit.prevent="submitForm"
    >

      <input
        v-model="form.kode"
        placeholder="Kode MK"
        required
      />

      <input
        v-model="form.judul"
        placeholder="Nama Mata Kuliah"
        required
      />

      <select
        v-model="form.kategori"
        required
      >

        <option value="">
          Pilih Kategori
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
        v-model="form.upbjj"
        required
      >

        <option value="">
          Pilih UPBJJ
        </option>

        <option
          v-for="item in upbjjList"
          :key="item"
          :value="item"
        >
          {{ item }}
        </option>

      </select>

      <input
        v-model="form.lokasiRak"
        placeholder="Lokasi Rak"
        required
      />

      <input
        type="number"
        min="0"
        v-model.number="form.harga"
        placeholder="Harga"
        required
      />

      <input
        type="number"
        min="0"
        v-model.number="form.qty"
        placeholder="Qty"
        required
      />

      <input
        type="number"
        min="0"
        v-model.number="form.safety"
        placeholder="Safety Stock"
        required
      />

      <input
        v-model="form.catatanHTML"
        placeholder="Catatan"
      />

      <button
        class="btn btn-success"
        type="submit"
      >
        {{ isEdit ? 'Update' : 'Simpan' }}
      </button>

    </form>

  </div>

</template>

<script setup>
import {
  reactive,
  watch,
  computed
} from 'vue'

const props = defineProps({
  dataEdit: Object,
  upbjjList: Array,
  kategoriList: Array
})

const emit = defineEmits([
  'save'
])

const form = reactive({
  kode: '',
  judul: '',
  kategori: '',
  upbjj: '',
  lokasiRak: '',
  harga: 0,
  qty: 0,
  safety: 0,
  catatanHTML: ''
})

const isEdit = computed(() => {
  return !!props.dataEdit
})

watch(
  () => props.dataEdit,
  (val) => {

    if (val) {

      Object.assign(
        form,
        JSON.parse(
          JSON.stringify(val)
        )
      )

    } else {

      resetForm()

    }

  },
  {
    immediate: true
  }
)

function submitForm() {

  if (!form.kode.trim()) {
    return alert('Kode wajib diisi')
  }

  if (!form.judul.trim()) {
    return alert('Judul wajib diisi')
  }

  if (form.harga < 0) {
    return alert('Harga tidak valid')
  }

  emit(
    'save',
    {
      ...form
    }
  )

  if (!isEdit.value) {
    resetForm()
  }

}

function resetForm() {

  form.kode = ''
  form.judul = ''
  form.kategori = ''
  form.upbjj = ''
  form.lokasiRak = ''
  form.harga = 0
  form.qty = 0
  form.safety = 0
  form.catatanHTML = ''

}
</script>