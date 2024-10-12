<template>
    <div class="container">
        <!-- 统计信息卡片 -->
        <div class="stats-grid">
            <div class="stat-card">
                <h3>房间占用率</h3>
                <div class="stat-value">{{ ((orderStore.orderList.length / roomStore.roomList.length) * 100).toFixed(2) }}%
                </div>
                <small>本周数据</small>
            </div>
            <div class="stat-card">
                <h3>当前订单</h3>
                <div class="stat-value">{{ orderStore.orderList.length }}</div>
                <small>正在进行</small>
            </div>
            <div class="stat-card">
                <h3>总收入</h3>
                <div class="stat-value">¥{{ moneyStor.moneyList.total }}</div>
                <small>本月收入</small>
            </div>
            <div class="stat-card">
                <h3>客户评价</h3>
                <div class="stat-value">4.8 ⭐</div>
                <small>平均评分</small>
            </div>
        </div>

        <!-- 快捷操作按钮 -->
        <div class="quick-actions">
            <router-link to="/livein">
                <button class="action-btn">📅 查看订单</button>
            </router-link>
            <router-link to="/order">
                <button class="action-btn">💰 收入报表</button>
            </router-link>
            <router-link to="/room">
                <button class="action-btn">🏨 新增房间</button>
            </router-link>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useOrder from '../store/order'
import useRoom from '../store/room'
import useMoney from '../store/money'
const orderStore = useOrder()
const roomStore = useRoom()
const moneyStor = useMoney()
onMounted(() => {

})
</script>

<style scoped>
.container {
    max-width: 1200px;
    margin: 20px auto;
}

/* 统计卡片部分 */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 30px;
    /* 增加卡片之间的间距 */
    margin-bottom: 40px;
}

.stat-card {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    /* 增加更柔和的阴影效果 */
}

.stat-card h3 {
    margin-bottom: 10px;
    font-size: 18px;
}

.stat-value {
    font-size: 28px;
    /* 让数字更显眼 */
    font-weight: bold;
    color: #3498db;
}

.stat-card small {
    color: #777;
}

/* 快捷操作按钮部分 */
.quick-actions {
    display: flex;
    justify-content: center;
    /* 按钮居中对齐 */
    gap: 20px;
    /* 增加按钮之间的间距 */
    margin-bottom: 40px;
}

.action-btn {
    padding: 15px 25px;
    /* 加大按钮内边距，按钮更大 */
    border: none;
    border-radius: 8px;
    background-color: #3498db;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
}

.action-btn:hover {
    background-color: #2980b9;
}
</style>