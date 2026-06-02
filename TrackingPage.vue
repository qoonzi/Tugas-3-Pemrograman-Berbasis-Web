<template>

<div>

  <TrackingForm
    :paketList="paketList"
    :pengirimanList="pengirimanList"
    @save="addTracking"
  />

  <TrackingSearch
    @search="searchTracking"
    @reset="resetSearch"
  />

  <div class="card">

    <h3 style="margin-bottom:15px">
      Data Tracking Delivery Order
    </h3>

    <table>

      <thead>
        <tr>
          <th>Nomor DO</th>
          <th>NIM</th>
          <th>Nama</th>
          <th>Ekspedisi</th>
          <th>Tanggal Kirim</th>
          <th>Total Harga</th>
          <th>Status</th>
          <th>Detail</th>
        </tr>
      </thead>

      <tbody>

        <tr
          v-for="item in filteredTracking"
          :key="item.nomorDO"
        >

          <td>{{ item.nomorDO }}</td>

          <td>{{ item.nim }}</td>

          <td>{{ item.nama }}</td>

          <td>{{ item.ekspedisi }}</td>

          <td>{{ formatTanggal(item.tanggalKirim) }}</td>

          <td>{{ formatRupiah(item.total) }}</td>

          <td>{{ item.status }}</td>

          <td>

            <button
              class="btn btn-primary"
              @click="selectTracking(item)"
            >
              Lihat
            </button>

          </td>

        </tr>

        <tr v-if="!filteredTracking.length">

          <td colspan="8" style="text-align:center">

            Data tidak ditemukan

          </td>

        </tr>

      </tbody>

    </table>

  </div>

  <TrackingTimeline
    v-if="selectedTracking"
    :tracking="selectedTracking"
    @add-progress="addProgress"
  />

</div>

</template>

<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import { getData }
from '../services/api'

import TrackingForm
from '../components/TrackingForm.vue'

import TrackingSearch
from '../components/TrackingSearch.vue'

import TrackingTimeline
from '../components/TrackingTimeline.vue'

const trackingList = ref([])

const paketList = ref([])

const pengirimanList = ref([])

const keyword = ref('')

const selectedTracking = ref(null)

onMounted(async () => {

  const data = await getData()

  paketList.value = data.paket

  pengirimanList.value =
    data.pengirimanList

  trackingList.value =
    convertTracking(data.tracking)

})

function convertTracking(raw){

 const result=[]

 raw.forEach((item,index)=>{

  const nomorDO =
  Object.keys(item)[0]

  const data =
  item[nomorDO]

  result.push({

   id:index,

   nomorDO,

   ...data

  })

 })

 return result

}

function searchTracking(value) {

  keyword.value = value

}

function resetSearch() {

  keyword.value = ''

}

const filteredTracking =
computed(() => {
    
    if (!keyword.value)
    return trackingList.value

  const key =
    keyword.value.toLowerCase()

  return trackingList.value.filter(item =>

    item.nomorDO
      .toLowerCase()
      .includes(key)

    ||

    item.nim
      .toLowerCase()
      .includes(key)

  )

})

function selectTracking(item) {

  selectedTracking.value = item

}

function addTracking(data) {

  trackingList.value.unshift(data)

}

function addProgress(text) {

  if (!selectedTracking.value)
    return

  selectedTracking.value.perjalanan.push({

    waktu:
      new Date()
        .toLocaleString('id-ID'),

    keterangan: text

  })

}

function formatTanggal(date) {

  return new Intl.DateTimeFormat(
    'id-ID',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  ).format(new Date(date))

}

function formatRupiah(value) {

  return new Intl.NumberFormat(
    'id-ID',
    {
      style: 'currency',
      currency: 'IDR'
    }
  ).format(value)

}
</script>