<template>
    <div>
        <el-radio-group v-model="size">
            <el-radio value="large">大</el-radio>
            <el-radio value="default">默认</el-radio>
            <el-radio value="small">小</el-radio>
        </el-radio-group>
        <el-descriptions title="个人中心" direction="vertical" :column="4" :size="size" border>
            <template #extra><el-button type="primary" @click="editVisable = true">编辑</el-button></template>
            <el-descriptions-item label="昵称">{{ userStore.userInfo.userName }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ userStore.userInfo.tel }}</el-descriptions-item>
            <el-descriptions-item label="地址">{{ userStore.userInfo.location }}</el-descriptions-item>
            <el-descriptions-item label="角色">
                <el-tag size="large">{{ userStore.userInfo.role }}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
    </div>

    <!-- 抽屉 -->
    <el-drawer v-model="editVisable" title="I am the title" :with-header="false" @close="closeDrawer">
        <h3>编辑个人信息</h3>
        <div class="m-t-20">
            <div class="m-t-20">
                <span style="margin-right: 10px;">昵称</span>
                <el-input v-model="usreinfo.userName" style="width: 400px" placeholder="Please input" />
            </div>
            <div class="m-t-20">
                <span style="margin-right: 10px;">电话</span>
                <el-input v-model="usreinfo.tel" style="width: 400px" placeholder="Please input" />
            </div>
            <div class="m-t-20">
                <span style="margin-right: 10px;">地址</span>
                <el-input v-model="usreinfo.location" style="width: 400px" placeholder="Please input" />
            </div>
            <div class="m-t-20">
                <span style="margin-right: 10px;">角色</span>
                <el-input v-model="usreinfo.role" disabled style="width: 400px" placeholder="Please input" />
            </div>

        </div>
        <div class="m-t-20 w100 fx-s-a">
            <el-button @click="closeDrawer">取消</el-button>
            <el-button type="primary" @click="editConfimr">确定</el-button>
        </div>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import useUser from '../../store/user'
import { ref } from 'vue'
import { ElMessage, type ComponentSize } from 'element-plus'
import { $editUserInfo } from '../../api';

const userStore: any = useUser()
const usreinfo: any = reactive({})
onMounted(() => {
    Object.assign(usreinfo, userStore.userInfo)
})


const size = ref<ComponentSize>('large')

const editVisable = ref(false)
// 关闭抽屉
const closeDrawer = () => {
    editVisable.value = false
    Object.assign(usreinfo, userStore.userInfo)
}

// 确定按钮
const editConfimr = async () => {
    const res = await $editUserInfo(usreinfo)
    ElMessage.success(res.msg)
    closeDrawer()
}

</script>

<style scoped></style>