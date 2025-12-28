<template>
  <div class="infinite-loading-container">
    <div class="spinner"></div>
    <p>Loading...</p>
  </div>
</template>

<script setup>
// ...existing code...
// No script logic needed for infinite loading simulation
</script>

<style scoped>
.infinite-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 3s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>