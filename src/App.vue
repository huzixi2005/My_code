<script setup lang="ts">
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
:root {
  /* 默认主题 */
  --primary-color: #3498db;
  --secondary-color: #142334;
  --text-color: #fff;
  --active-text-color: #ffd04b;
  --background-color: #f4f4f4;
  --background-gradient: linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%);
}

.dark-theme {
  --primary-color: #1abc9c;
  --secondary-color: #2c3e50;
  --text-color: #ffffff;
  --active-text-color: #ff6347;
  --background-color: #2e3b4e;
}

.light-theme {
  --primary-color: #f39c12;
  --secondary-color: #e0e0e0;
  --text-color: #333;
  --active-text-color: #e67e22;
  --background-color: #fff;
}

</style>
