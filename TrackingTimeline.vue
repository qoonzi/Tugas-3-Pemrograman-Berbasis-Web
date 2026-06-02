<template>

<div class="card">

<h3 style="margin-bottom:15px">

Tracking

{{ tracking.nomorDO }}

</h3>

<div
style="
display:flex;
gap:10px;
margin-bottom:15px;
">

<input
v-model="progressText"
placeholder="Tambah status perjalanan"
/>

<button
class="btn btn-success"
@click="saveProgress"
>

Tambah

</button>

</div>

<div class="timeline">

<div
v-for="(item,index)
in tracking.perjalanan"
:key="index"
class="timeline-item"
>

<h4>

{{ item.waktu }}

</h4>

<p>

{{ item.keterangan }}

</p>

</div>

</div>

</div>

</template>

<script setup>

import { ref }
from 'vue'

const props =
defineProps({
 tracking:Object
})

const emit =
defineEmits([
 'add-progress'
])

const progressText =
ref('')

function saveProgress(){

 if(
  !progressText.value.trim()
 ) return

 emit(
  'add-progress',
  progressText.value
 )

 progressText.value=''

}
</script>