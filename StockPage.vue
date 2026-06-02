<template>

<div>

<StockForm

:dataEdit="editData"

:upbjjList="upbjjList"

:kategoriList="kategoriList"

@save="saveData"

/>

<StockFilter

:upbjjList="upbjjList"

:kategoriList="kategoriList"

@change="updateFilter"

/>

<StockTable

:data="filteredStocks"

@edit="editItem"

@delete="showDelete"

/>

<ConfirmModal

v-if="showModal"

message="Yakin ingin menghapus data bahan ajar ini?"

@confirm="deleteItem"

@cancel="showModal=false"

/>

</div>
</template>

<script setup>

import {
 ref,
 computed,
 onMounted
}
from 'vue'

import { getData }
from '../services/api'

import StockTable
from '../components/StockTable.vue'

import StockFilter
from '../components/StockFilter.vue'

import StockForm
from '../components/StockForm.vue'

import ConfirmModal
from '../components/ConfirmModal.vue'

const stocks = ref([])

const upbjjList = ref([])

const kategoriList = ref([])

const editData = ref(null)

const deleteTarget = ref(null)

const showModal = ref(false)

const filter = ref({
 upbjj:'',
 kategori:'',
 sort:'',
 critical:false
})

onMounted(async()=>{

 const data = await getData()

 stocks.value = [...data.stok]

 upbjjList.value = data.upbjjList

 kategoriList.value = data.kategoriList

})

function updateFilter(value){

 filter.value = value

}

const filteredStocks = computed(()=>{

 let result = [...stocks.value]

 if(filter.value.upbjj){

   result = result.filter(
     item =>
     item.upbjj === filter.value.upbjj
   )

 }

 if(filter.value.kategori){

   result = result.filter(
     item =>
     item.kategori === filter.value.kategori
   )

 }

 if(filter.value.critical){

   result = result.filter(
     item =>
     item.qty < item.safety ||
     item.qty === 0
   )

 }

 if(filter.value.sort === 'judul'){

   result.sort(
     (a,b)=>
     a.judul.localeCompare(b.judul)
   )

 }

 if(filter.value.sort === 'harga'){

   result.sort(
     (a,b)=>
     a.harga - b.harga
   )

 }

 if(filter.value.sort === 'qty'){

   result.sort(
     (a,b)=>
     a.qty - b.qty
   )

 }

 return result

})

function saveData(data){

 if(editData.value){

   const index =
   stocks.value.findIndex(
     item =>
     item.kode === editData.value.kode
   )

   stocks.value[index] = {
     ...data
   }

   editData.value = null

 }else{

   stocks.value.push({
     ...data
   })

 }

}

function editItem(item){

 editData.value = {
   ...item
 }

 window.scrollTo({
   top:0,
   behavior:'smooth'
 })

}

function showDelete(item){

 deleteTarget.value = item

 showModal.value = true

}

function deleteItem(){

 stocks.value =
 stocks.value.filter(
   item =>
   item.kode !== deleteTarget.value.kode
 )

 showModal.value = false

}
</script>