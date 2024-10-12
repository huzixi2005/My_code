<template>
    <div class="card" :style="{ width: width, height: height }">
      <!-- 上部分 -->
      <div class="card-top">
        <slot name="top"></slot>  <!-- 插槽内容 -->
      </div>
  
      <!-- 下部分 -->
      <div class="card-bottom">
        <slot name="bottom"></slot>  <!-- 插槽内容 -->
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    width: {
      type: String,
      default: '200px'  // 默认宽度
    },
    height: {
      type: String,
      default: '300px'  // 默认高度
    }
  });
  </script>
  
  <style scoped>
  .card {
    margin: 20px;
    display: flex;
    flex-direction: column;  /* 垂直排列 */
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden
  }
  
  .card-top {
    /* flex: 6; */
    /* background-color: #f1ecec; */
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .card-bottom {
    padding: 10px;
    /* flex: 4;  */
    height: 45%;
    background-color: #fff;     
    border-top: 1px solid #ccc;
    font-size: 14px;
  }
  </style>
  