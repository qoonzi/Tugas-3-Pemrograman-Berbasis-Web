<template>
  <div class="modal-overlay">

    <div class="modal">

      <h3>
        Konfirmasi
      </h3>

      <p style="margin:15px 0">
        {{ message }}
      </p>

      <div
        style="
          display:flex;
          gap:10px;
          justify-content:end;
        "
      >

        <button
          class="btn btn-secondary"
          @click="$emit('cancel')"
        >
          Batal
        </button>

        <button
          class="btn btn-danger"
          @click="$emit('confirm')"
        >
          Hapus
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Yakin ingin menghapus data?'
  }
})
</script>

<style scoped>
.btn-secondary{
  background:#777;
  color:white;
}
</style>