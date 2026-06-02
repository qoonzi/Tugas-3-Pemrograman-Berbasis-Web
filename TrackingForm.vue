<template>

<div class="card">

<h3 style="margin-bottom:15px">
Tambah Delivery Order
</h3>

<form
class="form-grid"
@submit.prevent="saveTracking"
>

<input
:value="nomorDO"
readonly
/>

<input
v-model="form.nim"
placeholder="NIM"
required
/>

<input
v-model="form.nama"
placeholder="Nama"
required
/>

<select
v-model="form.ekspedisi"
required
>

<option value="">
Pilih Ekspedisi
</option>

<option
v-for="item in pengirimanList"
:key="item.kode"
:value="item.nama"
>

{{ item.nama }}

</option>

</select>

<select
v-model="selectedPaket"
required
>

<option value="">
Pilih Paket
</option>

<option
v-for="item in paketList"
:key="item.kode"
:value="item.kode"
>

{{ item.kode }} - {{ item.nama }}

</option>

</select>

<input
type="date"
v-model="form.tanggalKirim"
/>

<input
:value="formatRupiah(totalHarga)"
readonly
/>

<button
class="btn btn-success"
type="submit"
>

Simpan DO

</button>

</form>

<div
v-if="paketTerpilih"
class="package-detail"
>

<h4>
Detail Paket
</h4>

<p>
Kode :
{{ paketTerpilih.kode }}
</p>

<p>
Nama :
{{ paketTerpilih.nama }}
</p>

<ul>

<li
v-for="item in paketTerpilih.isi"
:key="item"
>

{{ item }}

</li>

</ul>

</div>

</div>

</template>

<script setup>

import {
 ref,
 computed
}
from 'vue'

const props =
defineProps({

 paketList:Array,

 pengirimanList:Array

})

const emit =
defineEmits(['save'])

const sequence =
ref(3)

const form =
ref({

 nim:'',

 nama:'',

 ekspedisi:'',

 tanggalKirim:
 new Date()
 .toISOString()
 .split('T')[0]

})

const selectedPaket =
ref('')

const nomorDO =
computed(()=>{

 const year =
 new Date()
 .getFullYear()

 return `DO${year}-${String(sequence.value)
 .padStart(3,'0')}`

})

const paketTerpilih =
computed(()=>{

 return props.paketList.find(
 item =>
 item.kode ===
 selectedPaket.value
 )

})

const totalHarga =
computed(()=>{

 return paketTerpilih.value
 ? paketTerpilih.value.harga
 : 0

})

function saveTracking(){

 emit(
 'save',
 {

  nomorDO:
  nomorDO.value,

  nim:
  form.value.nim,

  nama:
  form.value.nama,

  ekspedisi:
  form.value.ekspedisi,

  tanggalKirim:
  form.value.tanggalKirim,

  paket:
  selectedPaket.value,

  total:
  totalHarga.value,

  status:
  'Dalam Perjalanan',

  perjalanan:[
   {
    waktu:
    new Date()
    .toLocaleString('id-ID'),

    keterangan:
    'Data Delivery Order dibuat'
   }
  ]

 }
 )

 sequence.value++

 form.value.nim=''
 form.value.nama=''
 selectedPaket.value=''

}

function formatRupiah(value){

 return new Intl.NumberFormat(
 'id-ID',
 {
  style:'currency',
  currency:'IDR'
 }
 ).format(value)

}

</script>