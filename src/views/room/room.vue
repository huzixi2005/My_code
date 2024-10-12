<template>
    <div>
        <div class="fx">
            <h3 style="margin-right: 200px;">房型管理</h3>
            <el-button size="default" type="primary" :icon="Plus" @click="addRoomTypeVis = true">添加房间</el-button>
        </div>
        <div class="fx-wrap">
            <card v-for="room in roomList" :key="room.Id">
                <template #top>
                    <el-image :src="room.img" style="width: 100%; height: 100%">
                        <template #error>
                            <div class="image-slot">
                                <el-icon><icon-picture /></el-icon>
                            </div>
                        </template>
                    </el-image>
                </template>

                <template #bottom>
                    <div class="fx-s-b p-5">
                        <div>房型:{{ room.type }}</div>
                        <div>价格:{{ room.price }}</div>
                    </div>
                    <div class="fx-s-b p-5">
                        <div>床位:{{ room.bedNum }}</div>
                        <div class="fx">
                            <el-tag v-if="room.hasWiFi" type="primary" size="small">WIFI</el-tag>
                            <el-tag v-if="room.hasBreakfast" size="small" type="success">早餐供应</el-tag>
                        </div>
                    </div>
                    <div class="p-5">描述:{{ room.des }}</div>
                </template>
            </card>
        </div>
        <div class="fx-center m-t-20">
            <el-pagination background layout="total, sizes,prev, pager, next" :total="roomNum" :current-page="currentPage"
                :page-size="pageSize" :page-sizes="[6, 12]" @size-change="sizeChange" @current-change="pageChange" />
        </div>
    </div>

    <!-- 添加房间抽屉 -->
    <el-drawer v-model="addRoomTypeVis" @close="closeDrawer">
        <template #header>
            <h4>添加房间</h4>
        </template>
        <template #default>
            <div>
                <el-form status-icon ref="ruleFormRef" style="max-width: 600px" :model="roomInfo" :rules="rules"
                    label-width="auto" class="demo-ruleForm">
                    <el-form-item label="房型类型" prop="type" size="large">
                        <el-select v-model="roomInfo.type" placeholder="Select" size="large" style="width: 240px">
                            <el-option v-for="type in roomType" :key="type.Id" :label="type.type" :value="type.type" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="房间编号" prop="Id" size="large">
                        <el-input v-model="roomInfo.Id" type="text" />
                    </el-form-item>
                    <el-form-item label="床位数量" prop="bedNum" size="large">
                        <el-input v-model="roomInfo.bedNum" type="text" />
                    </el-form-item>
                    <el-form-item label="价格" prop="price" size="large">
                        <el-input v-model="roomInfo.price" type="text" />
                    </el-form-item>
                    <el-form-item label="房间描述" prop="des" size="large">
                        <el-input v-model="roomInfo.des" type="text" />
                    </el-form-item>
                    <el-form-item label="图片地址" prop="img" size="large">
                        <el-input v-model="roomInfo.img" type="text" disabled />
                    </el-form-item>
                    <el-form-item label="WIFI" prop="hasWiFi" size="large">
                        <el-radio-group v-model="roomInfo.hasWiFi">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="早餐" prop="hasBreakfast" size="large">
                        <el-radio-group v-model="roomInfo.hasBreakfast">
                            <el-radio :value="true">是</el-radio>
                            <el-radio :value="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <div class="m-t-20 fx-s-a w100">
                            <el-button type="primary" @click="addConfirm()" size="large">确认</el-button>
                            <el-button @click="closeDrawer()" size="large">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import card from '../../components/card.vue';
import { $addRoom, $getRoomList, $getRoomTypeList } from '../../api';
import { Picture as IconPicture, Plus } from '@element-plus/icons-vue'
import { ElMessage, FormRules } from 'element-plus';
// 所有的数据
let roomListTotal = ref([] as any)
// 展示的数据
let roomList = ref([] as any)
// 房间类型
let roomType = ref([] as any)
// 分页相关
let roomNum = ref(0)
let pageSize = ref(6)
onMounted(async () => {
    getRoomList()
    // 获取房间类型
    const { data: roottype } = await $getRoomTypeList()
    roomType.value = roottype

})

const getRoomList = async () => {
    const { data: res } = await $getRoomList()
    roomListTotal.value.splice(0, roomListTotal.value.length, ...res)
    roomList.value = roomListTotal.value.slice(0, pageSize.value);
    roomNum.value = roomListTotal.value.length
}

// 页码改变
let currentPage = ref<number>(1);  // 当前是第1页
const pageChange = (page: number) => {
    currentPage.value = page
    let startIndex = (currentPage.value - 1) * pageSize.value;  // (2 - 1) * 5 = 5
    let endIndex = currentPage.value * pageSize.value;  // 2 * 5 = 10
    roomList.value = roomListTotal.value.slice(startIndex, endIndex);
}

// 展示数量改变
const sizeChange = (size: number) => {
    pageSize.value = size
    let startIndex = (currentPage.value - 1) * pageSize.value;  // (2 - 1) * 5 = 5
    let endIndex = currentPage.value * pageSize.value;  // 2 * 5 = 10
    roomList.value = roomListTotal.value.slice(startIndex, endIndex);
}

// 添加抽屉可视参数
let addRoomTypeVis = ref(false)
let roomInfo = reactive({
    Id: '',
    type: '单人间',
    price: 100,
    bedNum: 1,
    des: '暂无描述',
    img: '/room/test.png',
    hasWiFi: true,
    hasBreakfast: true,
    isAvailable: true,
    uid: null
});

// 验证规则
const rules = reactive<FormRules<typeof roomInfo>>({
    type: [{ required: true, message: '请输入房型名称', trigger: 'blur' },],
    price: [{ required: true, message: '请输入房型价格', trigger: 'blur' },],
    Id: [{ required: true, message: '请输入房间编号', trigger: 'blur' },],
    bedNum: [{ required: true, message: '请输入床位数量', trigger: 'blur' },],
})

// 添加房间关闭事件
const closeDrawer = () => {
    addRoomTypeVis.value = false
    roomInfo.Id = ''
    roomInfo.type = '单人间'
    roomInfo.price = 100
    roomInfo.bedNum = 1
    roomInfo.des = '暂无描述'
    roomInfo.hasWiFi = true
    roomInfo.hasBreakfast = true
}
// 确认添加按钮
const addConfirm = async () => {
    const res = await $addRoom(roomInfo)
    ElMessage.success(res.msg)
    getRoomList()
    closeDrawer()
    currentPage.value = 1
}


</script>

<style scoped></style>