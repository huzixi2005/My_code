<template>
    <div class="full100 fx">
        <div class="left">

            <h2 class="f18 title fx-center" :style="{ color: menuStyles.textColor }">
                <el-icon style="margin-right: 10px;">
                    <HomeFilled />
                </el-icon>
                酒店管理系统
            </h2>
            <el-col>
                <el-menu :router="true" :active-text-color="menuStyles.activeTextColor"
                    :background-color="menuStyles.backgroundColor" :text-color="menuStyles.textColor"
                    class="el-menu-vertical-demo" default-active="2">
                    <!-- 账户管理 -->
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>账户管理</span>
                        </template>
                        <el-menu-item index="role">角色管理</el-menu-item>
                        <!-- <el-menu-item index="user">用户管理</el-menu-item> -->
                    </el-sub-menu>

                    <!-- 客房管理 -->
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <House />
                            </el-icon>
                            <span>客房管理</span>
                        </template>
                        <el-menu-item index="roomtype">房型管理</el-menu-item>
                        <el-menu-item index="room">房间管理</el-menu-item>
                    </el-sub-menu>

                    <!-- 客户管理 -->
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <Edit />
                            </el-icon>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="livein">入住管理</el-menu-item>
                        <el-menu-item index="order">收入详情</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-col>
        </div>
        <div class="right">
            <div class="top">
                <el-menu :router="true" default-active="1" class="el-menu-demo" mode="horizontal" :ellipsis="false"
                    :active-text-color="menuStyles.activeTextColor" :background-color="menuStyles.backgroundColor"
                    :text-color="menuStyles.textColor">
                    <el-radio-group v-model="type">
                        <el-radio :value="true" style="color: #fff;" @click="setDarkTheme">深色主题</el-radio>
                        <el-radio :value="false" style="color: #fff;" @click="setLightTheme">浅色主题</el-radio>
                    </el-radio-group>
                    <el-menu-item index="home">
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                        首页</el-menu-item>

                    <el-sub-menu index="">
                        <template #title>
                            <el-icon>
                                <UserFilled />
                            </el-icon>
                            {{ role }}
                        </template>
                        <el-menu-item index="mine">个人中心</el-menu-item>
                        <!-- <el-menu-item index="setpwd">修改密码</el-menu-item>    -->
                        <el-menu-item @click="centerDialogVisible = true">退出系统</el-menu-item>
                    </el-sub-menu>

                </el-menu>
            </div>
            <div class="body">
                <el-card style="max-width: 100%" shadow="hover">
                    <router-view></router-view>
                </el-card>

            </div>
        </div>

        <!-- 退出弹出 -->
        <el-dialog v-model="centerDialogVisible" title="系统提示" width="500" align-center>
            <div class="fx">
                <el-icon size="20px" color="orange">
                    <WarningFilled />
                </el-icon>
                <span style="margin-left: 10px;">确定退出系统吗</span>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="logout">确认</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
    <div class="glow glow1"></div>
    <div class="glow glow2"></div>
    <div class="glow glow3"></div>
</template>

<script setup lang="ts">
import {
    User,
    Edit,
    House,
    HomeFilled,
    UserFilled,
    WarningFilled,
} from '@element-plus/icons-vue'

import router from '../router';
import { onMounted, reactive, ref } from 'vue';

let role = ref('')
onMounted(() => {
    role.value = localStorage.getItem('role')!
    document.documentElement.style.setProperty('--background-gradient', 'linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)');

})

let centerDialogVisible = ref(false)

const logout = () => {
    centerDialogVisible.value = false
    router.push('/login')
    localStorage.removeItem('role')
}

// 颜色
// 定义响应式对象，用来存储样式
const menuStyles = reactive({
    activeTextColor: '#ffd04b',
    backgroundColor: '#2e3b4e',
    textColor: '#fff',
});

const type = ref(true)

// 切换为深色主题
const setDarkTheme = () => {
    menuStyles.activeTextColor = '#ffd04b';
    menuStyles.backgroundColor = '#2e3b4e';
    menuStyles.textColor = '#fff';
    document.documentElement.style.setProperty('--bg-color', '#2e3b4e');
    document.documentElement.style.setProperty('--background-gradient', 'linear-gradient(120deg, #a18cd1 0%, #fbc2eb 100%)');
};
// 切换为浅色主题
const setLightTheme = () => {
    menuStyles.activeTextColor = '#ffd04b';
    menuStyles.backgroundColor = '#606266';
    menuStyles.textColor = '#fff';
    document.documentElement.style.setProperty('--bg-color', '#606266');
    document.documentElement.style.setProperty('--background-gradient', 'linear-gradient(135deg, #CDD0D6 0%, #E6E8EB 100%)');
};
</script>

<style scoped lang="scss">
.left {
    width: 15%;
    height: 100%;

    background-color: var(--bg-color, #2e3b4e);

    :deep(.el-menu) {
        border: none !important;
    }

    .title {
        height: 7%;
    }
}

.right {
    width: 85%;
    display: flex;
    flex-direction: column;

    .top {
        height: 7%;
        background-color: var(--bg-color, #2e3b4e);
        display: flex;
        justify-content: flex-end;

        :deep(.el-menu) {
            border: none !important;
        }
    }

    .body {
        // background-color: red;
        height: 93%;
        // width: 85%;
        padding: 20px;
        background: var(--background-gradient);
        position: relative;
        font-family: 'Arial', sans-serif;
    }
}

.glow {
    position: absolute;
    border-radius: 50%;
    opacity: 0.7;
    z-index: 10;
    /* 提升光晕的层级 */
    box-shadow: 0 0 60px rgba(255, 255, 255, 0.5),
        0 0 100px rgba(255, 255, 255, 0.4),
        0 0 140px rgba(255, 255, 255, 0.3),
        0 0 200px rgba(255, 255, 255, 0.2);
    animation: pulse 15s ease-in-out infinite;
}

/* 定义不同光晕球体的大小和位置 */
.glow1 {
    width: 200px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.3);
    top: 20%;
    left: 30%;
}

.glow2 {
    width: 300px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.2);
    bottom: 25%;
    right: 20%;
}

.glow3 {
    width: 150px;
    height: 150px;
    background-color: rgba(255, 255, 255, 0.4);
    top: 60%;
    left: 70%;
}

@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
        opacity: 0.7;
    }

    50% {
        transform: scale(1.2);
        opacity: 0.9;
    }
}
</style>