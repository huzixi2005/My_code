<template>
    <div>
        <div>
            <div>
                <div class="fx" style="padding-bottom: 20px;">
                    <h3 style="margin-right: 200px;">房型管理</h3>
                    <el-button size="default" type="primary" :icon="Plus"
                        @click="addRoomTypeVis = true">添加房型</el-button>
                </div>
            </div>
            <el-table :data="roomTypeList" stripe style="width: 100%" border>
                <el-table-column prop="Id" label="房型编号" width="100" />
                <el-table-column prop="type" label="房型名称" width="100" />
                <el-table-column prop="bedNum" label="床位数量" width="200" />
                <el-table-column prop="price" label="房型价格(元/天)" width="100" />
                <el-table-column prop="total" label="房型总数" width="100" />
                <el-table-column prop="remain" label="剩余数量" width="100" />
                <el-table-column prop="des" label="房型描述" width="500" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="large" @click="handleEdit(scope.$index, scope.row)"
                            type="primary">编辑</el-button>
                        <el-button size="large" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- 添加房型抽屉 -->
    <el-drawer v-model="addRoomTypeVis" @close="closeDrawer">
        <template #header>
            <h4>添加房型</h4>
        </template>
        <template #default>
            <div>
                <el-form status-icon ref="ruleFormRef" style="max-width: 600px" :model="addRoomTypeInfo" :rules="rules"
                    label-width="auto" class="demo-ruleForm">
                    <el-form-item label="房型编号" prop="Id" size="large">
                        <el-input v-model="addRoomTypeInfo.Id" type="text" />
                    </el-form-item>
                    <el-form-item label="房型名称" prop="type" size="large">
                        <el-input v-model="addRoomTypeInfo.type" type="text" />
                    </el-form-item>
                    <el-form-item label="床位数量" prop="bedNum" size="large">
                        <el-input v-model="addRoomTypeInfo.bedNum" type="text" />
                    </el-form-item>
                    <el-form-item label="价格" prop="price" size="large">
                        <el-input v-model="addRoomTypeInfo.price" type="text" />
                    </el-form-item>
                    <el-form-item label="房型总数" prop="total" size="large">
                        <el-input v-model="addRoomTypeInfo.total" type="text" disabled />
                    </el-form-item>
                    <el-form-item label="剩余数量" prop="remain" size="large">
                        <el-input v-model="addRoomTypeInfo.remain" type="text" disabled />
                    </el-form-item>
                    <el-form-item label="房间描述" prop="des" size="large">
                        <el-input v-model="addRoomTypeInfo.des" type="text" />
                    </el-form-item>
                    <el-form-item label="图片地址" prop="img" size="large">
                        <el-input v-model="addRoomTypeInfo.img" type="text" disabled />
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

    <!-- 编辑按钮对话框 -->
    <el-dialog v-model="editVisible" title="房型编辑" width="500" :before-close="editClose">
        <el-form status-icon ref="ruleFormRef" style="max-width: 600px" :model="selectItem" :rules="rules"
            label-width="auto" class="demo-ruleForm">
            <el-form-item label="房型编号" prop="Id" size="large">
                <el-input v-model="selectItem.Id" type="text" disabled />
            </el-form-item>
            <el-form-item label="房型名称" prop="type" size="large">
                <el-input v-model="selectItem.type" type="text" />
            </el-form-item>
            <el-form-item label="床位数量" prop="bedNum" size="large">
                <el-input v-model="selectItem.bedNum" type="text" />
            </el-form-item>
            <el-form-item label="价格" prop="price" size="large">
                <el-input v-model="selectItem.price" type="text" />
            </el-form-item>
            <el-form-item label="房型总数" prop="total" size="large">
                <el-input v-model="selectItem.total" type="text" disabled />
            </el-form-item>
            <el-form-item label="剩余数量" prop="remain" size="large">
                <el-input v-model="selectItem.remain" type="text" disabled />
            </el-form-item>
            <el-form-item label="房间描述" prop="des" size="large">
                <el-input v-model="selectItem.des" type="text" />
            </el-form-item>
            <el-form-item label="图片地址" prop="img" size="large">
                <el-input v-model="selectItem.img" type="text" disabled />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editClose">取消</el-button>
                <el-button type="primary" @click="editConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>

    <!-- 删除按钮对话框 -->
    <el-dialog v-model="deleteVisible" title="系统消息" width="500" :before-close="removeClose">
        <div class="fx">
            <el-icon size="20px" color="orange">
                <WarningFilled />
            </el-icon>
            <span style="margin-left: 10px;">您确定要删除该房型吗？</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="removeClose">取消</el-button>
                <el-button type="primary" @click="romveConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { $addRoomType, $editRoomType, $getRoomTypeList, $removeRoomType } from '../../api';
import { Plus, WarningFilled } from '@element-plus/icons-vue'
import { ElMessage, FormInstance, type FormRules } from 'element-plus'
import useRoom from '../../store/room'

onMounted(() => {
    getRoomTypeList()
})

const roomStore = useRoom()

let roomTypeList = reactive([] as any)
// 第一次获取房间类型列表
const getRoomTypeList = async () => {
    const { data: res } = await $getRoomTypeList()
    console.log('res', res);
    // Object.assign(roomTypeList, res)
    // roomTypeList = [...res];
    roomTypeList.splice(0, roomTypeList.length, ...res);

    console.log('roomTypeList', roomTypeList);
}

// 添加房型信息
const addRoomTypeInfo = reactive({
    "Id": "",
    "type": "",
    "price": 100,
    "bedNum": 1,
    "total": 5,
    "remain": 5,
    "des": "暂无描述",
    "img": "/room/001.png"
})
const addRoomTypeVis = ref(false)

const ruleFormRef = ref<FormInstance>()

// 确认添加
const addConfirm = async () => {
    if (ruleFormRef.value) {
        try {
            await ruleFormRef.value.validate()
            const res = await $addRoomType(addRoomTypeInfo)
            if (res.code == 200) ElMessage.success(res.msg)
            else {
                ElMessage.error(res.msg)
            }
            getRoomTypeList()
            closeDrawer()
        } catch (error) {
            // console.log(error);
        }
    }
}

// 验证规则
const rules = reactive<FormRules<typeof addRoomTypeInfo>>({
    Id: [{ required: true, message: '请输入房型编号', trigger: 'blur' },],
    type: [{ required: true, message: '请输入房型名称', trigger: 'blur' },],
    price: [{ required: true, message: '请输入房型价格', trigger: 'blur' },],
    bedNum: [{ required: true, message: '请输入床位数量', trigger: 'blur' },],
})

// 抽屉关闭事件
const closeDrawer = () => {
    addRoomTypeInfo.Id = ''
    addRoomTypeInfo.type = ''
    addRoomTypeInfo.des = '暂无描述'
    addRoomTypeVis.value = false
}

// 选中的行
let selectId = ref('')
let selectItem: any = reactive({})

// 编辑按钮
const editVisible = ref(false)
const handleEdit = (index: number, row: any) => {
    Object.assign(selectItem, roomStore.roomType[index])
    editVisible.value = true
}
const editClose = () => {
    editVisible.value = false
}
const editConfirm = async () => {
    await $editRoomType(selectItem)
    getRoomTypeList()
    editClose()
    ElMessage.success('更新成功')
}

// 删除按钮
let deleteVisible = ref(false)
const handleDelete = (index: number, row: any) => {
    if (localStorage.getItem('role')=='超级管理员') {
        selectId = row.Id
        deleteVisible.value = true
    }else{
        ElMessage.error('您的权限不够')
    }
}

const removeClose = () => {
    deleteVisible.value = false
}
const romveConfirm = async () => {
    await $removeRoomType(selectId)
    getRoomTypeList()
    removeClose()
    ElMessage.success('删除成功')
}

</script>

<style scoped></style>