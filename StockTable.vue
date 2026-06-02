<template>

<div class="card">

<table>

<thead>
<tr>
  <th>Kode</th>
  <th>Mata Kuliah</th>
  <th>Kategori</th>
  <th>UPBJJ</th>
  <th>Rak</th>
  <th>Harga</th>
  <th>Stok</th>
  <th>Safety</th>
  <th>Status</th>
  <th>Aksi</th>
</tr>
</thead>

<tbody>

<tr
v-for="item in data"
:key="item.kode">

<td>{{ item.kode }}</td>

<td>{{ item.judul }}</td>

<td>{{ item.kategori }}</td>

<td>{{ item.upbjj }}</td>

<td>{{ item.lokasiRak }}</td>

<td>
{{ formatRupiah(item.harga) }}
</td>

<td>
{{ item.qty }} buah
</td>

<td>
{{ item.safety }} buah
</td>

<td>

<div
class="status-wrapper"
>

<StatusBadge
:qty="item.qty"
:safety="item.safety"
/>

<div
class="tooltip"
v-html="item.catatanHTML">
</div>

</div>

</td>

<td>

<div
style="
display:flex;
gap:5px;
">

<button
class="btn btn-primary"
@click="$emit('edit', item)"
>
✏️
</button>

<button
class="btn btn-danger"
@click="$emit('delete', item)"
>
🗑️
</button>

</div>

</td>

</tr>

<tr v-if="!data?.length">

<td
colspan="10"
style="
text-align:center;
padding:20px;
">

Data tidak ditemukan

</td>

</tr>

</tbody>

</table>

</div>

</template>

<script setup>
import StatusBadge from './StatusBadge.vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  }
})

function formatRupiah(value){
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value)
}
</script>

<style scoped>

.status-wrapper{
  position:relative;
  display:inline-block;
}

.tooltip{

  position:absolute;

  bottom:120%;
  left:50%;

  transform:translateX(-50%);

  background:#222;
  color:white;

  padding:10px;

  border-radius:8px;

  min-width:180px;

  opacity:0;
  pointer-events:none;

  transition:.3s;

  z-index:99;
}

.status-wrapper:hover .tooltip{
  opacity:1;
}

</style>
