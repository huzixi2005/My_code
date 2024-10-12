<template>
    <div>
        <div>
            <!-- 主题切换按钮 -->
            <button @click="setTheme('dark')">深色主题</button>
            <button @click="setTheme('light')">浅色主题</button>
            <button @click="setTheme('purple')">紫色主题</button>
        </div>
    </div>
</template>

<script setup lang="ts">
const setTheme = (theme: any) => {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--primary-color', '#2b3a4e');
        document.documentElement.style.setProperty('--sidebar-background', '#2b3a4e');
        document.documentElement.style.setProperty('--header-background', '#1a2a40');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--button-color', '#3498db');
    } else if (theme === 'light') {
        document.documentElement.style.setProperty('--primary-color', '#ffffff');
        document.documentElement.style.setProperty('--sidebar-background', '#f4f4f4');
        document.documentElement.style.setProperty('--header-background', '#e4e4e4');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--button-color', '#3498db');
    } else if (theme === 'purple') {
        document.documentElement.style.setProperty('--primary-color', '#8e44ad');
        document.documentElement.style.setProperty('--sidebar-background', '#8e44ad');
        document.documentElement.style.setProperty('--header-background', '#663399');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--button-color', '#9b59b6');
    }
}
</script>

<style scoped></style>