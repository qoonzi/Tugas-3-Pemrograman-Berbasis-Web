<template>
  <div class="container">

    <header class="header">
      <h1>
        📚 Sistem Pemesanan Bahan Ajar UT
      </h1>

      <p>
        Universitas Terbuka
      </p>
    </header>

    <nav class="navbar">

      <button
        :class="{active: page==='stock'}"
        @click="page='stock'">

        Stok Bahan Ajar
      </button>

      <button
        :class="{active: page==='tracking'}"
        @click="page='tracking'">

        Tracking DO
      </button>

    </nav>

    <StockPage
      v-if="page==='stock'"
    />

    <TrackingPage
      v-else
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'

import StockPage from './StockPage.vue'
import TrackingPage from './TrackingPage.vue'

const page = ref('stock')
</script>
