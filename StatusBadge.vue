<template>
  <span
    class="badge"
    :class="badgeClass"
  >
    {{ badgeText }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  qty: {
    type: Number,
    required: true
  },
  safety: {
    type: Number,
    required: true
  }
})

const badgeText = computed(() => {
  if (props.qty === 0) return '❌ Kosong'
  if (props.qty < props.safety) return '⚠️ Menipis'
  return '✅ Aman'
})

const badgeClass = computed(() => {
  if (props.qty === 0) return 'badge-danger'
  if (props.qty < props.safety) return 'badge-warning'
  return 'badge-success'
})
</script>