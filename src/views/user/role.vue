<template>
    <div>
        <div class="header" style="padding-bottom: 20px;">
            <h3>角色管理</h3>
            <div class="m-t-20">
                <el-input v-model="inputId" style="max-width: 400px;" placeholder="请输入查找编号" class="input-with-select">
                    <template #append><el-button :icon="Search" @click="search" /></template>
                </el-input>
                <el-button size="default" type="success" style="margin-left: 20px;" @click="search">查询 </el-button>
                <el-button size="default" type="primary" :icon="Plus" style="margin-left: 20px;"
                    @click="addRole">添加</el-button>
            </div>
        </div>
        <el-table :data="roleList" stripe style="width: 100%" border>
            <el-table-column prop="roleId" label="角色编号" width="300" />
            <el-table-column prop="loginId" label="账号" width="300" />
            <el-table-column prop="role" label="角色" width="300" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="large" @click="handleEdit(scope.$index, scope.row)" type="primary">编辑</el-button>
                    <el-button size="large" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 抽屉 -->

    <el-drawer v-model="drawer" @close="closeDrawer">
        <template #header>
            <h4>添加角色</h4>
        </template>
        <template #default>
            <div>
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="roleForm" :rules="rules" label-width="auto"
                    class="demo-ruleForm">
                    <el-form-item label="账号" prop="loginId" size="large">
                        <el-input v-model="roleForm.loginId" type="text" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password" size="large">
                        <el-input v-model="roleForm.password" type="text" />
                    </el-form-item>
                    <el-form-item label="编号" prop="roleId" size="large">
                        <el-input v-model="roleForm.roleId" type="text" />
                    </el-form-item>
                    <div class="fx">
                        <el-text class="fx-center">请选择角色：</el-text>
                        <div class="m-l-10">
                            <el-radio-group v-model="roleForm.role">
                                <el-radio value="普通管理员" size="large">普通管理员</el-radio>
                                <el-radio value="超级管理员" size="large">超级管理员</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <el-form-item>
                        <div class="m-t-20 fx-s-a w100">
                            <el-button type="primary" @click="confirmClick()" size="large">确认</el-button>
                            <el-button @click="cancelClick()" size="large">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </template>
    </el-drawer>

    <!-- 编辑按钮对话框 -->
    <el-dialog v-model="editVisible" title="角色编辑" width="500" :before-close="editClose">
        <el-radio-group v-model="selectItem.role">
            <el-radio value="普通管理员" size="large">普通管理员</el-radio>
            <el-radio value="超级管理员" size="large">超级管理员</el-radio>
        </el-radio-group>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="editClose">取消</el-button>
                <el-button type="primary" @click="editConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>


    <!-- 删除按钮对话框 -->
    <el-dialog v-model="deleteVisible" title="系统消息" width="500" :before-close="handleClose">
        <div class="fx">
            <el-icon size="20px" color="orange">
                <WarningFilled />
            </el-icon>
            <span style="margin-left: 10px;">您确定要删除该角色吗？</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClose">取消</el-button>
                <el-button type="primary" @click="romveConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>


</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { $addRole, $editRole, $getRole, $getRoleList, $removeRole } from '../../api';
import { Plus, Search, WarningFilled } from '@element-plus/icons-vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'


onMounted(() => {
    loadRoleList()
    roleInfo.value = localStorage.getItem('role')!
    if (roleInfo.value == '超级管理员') roleRight.value = true
})

// 获取角色列表
let roleList = ref([])
const loadRoleList = async () => {
    const { data } = await $getRoleList()
    roleList.value = data
    // console.log('roleList', roleList);
}

// 获取单个角色信息
let selectItem = reactive({
    loginId: '',
    password: '',
    roleId: '',
    role: '',
})

// 判断角色身份
const roleInfo = ref('')
// 权限
const roleRight = ref(false)

// 角色信息
const roleForm = reactive({
    loginId: '',
    password: '',
    roleId: '',
    role: '普通管理员',
})

// 搜索
let inputId = ref('')
const search = async () => {
    if (inputId.value) {
        let res = await $getRole(inputId.value)
        if (res.code == 200) {
            res = res.data
            // console.log(res);
            roleList.value = res
            ElMessage.success('查找成功')
        } else {
            inputId.value = ''
            ElMessage.error(res.msg)
        }
    } else {
        loadRoleList()
    }
}

// 抽屉-角色添加按钮
const drawer = ref(false)

// 抽屉关闭事件
const closeDrawer = () => {
    roleForm.loginId = ''
    roleForm.password = ''
    roleForm.role = '普通管理员'
    roleForm.roleId = ''
    drawer.value = false
}

// 添加角色
const addRole = () => {
    drawer.value = true
}

// 抽屉-表单信息    
const ruleFormRef = ref<FormInstance>()


// 验证规则
const rules = reactive<FormRules<typeof roleForm>>({
    loginId: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    roleId: [{ required: true, message: '请输入编号', trigger: 'blur' }],
})

// 取消按钮
const cancelClick = () => {
    closeDrawer()
}

// 确认按钮
const confirmClick = async () => {

    if (ruleFormRef.value) {
        try {
            await ruleFormRef.value.validate()
            const res = await $addRole(roleForm)
            if (res.code == 200) {
                closeDrawer()
                ElMessage.success(res.msg)
            } else {
                ElMessage.error(res.msg)
            }
            loadRoleList()
        } catch (error) {
            // console.log(error);
        }
    }


}

let selectId = ref('')

// 编辑按钮
let editVisible = ref(false)
const handleEdit = (index: number, row: any) => {
    if (row.loginId == (JSON.parse(localStorage.getItem('adminInfo')!)).loginId) {
        ElMessage.error("无法对当前用户编辑")
    } else {
        if (roleRight.value) {
            selectId.value = row.loginId
            selectItem = roleList.value[index]
            editVisible.value = true
        } else {
            ElMessage.error("您的权限不够")
        }
    }

}

// 编辑对话框消失事件
const editClose = async () => {
    await loadRoleList()
    editVisible.value = false
}
const editConfirm = async () => {
    editVisible.value = false
    await $editRole(selectItem)
    ElMessage.success('修改成功')
}

// 删除按钮
let deleteVisible = ref(false)
const handleDelete = (index: number, row: any) => {
    if (row.loginId == (JSON.parse(localStorage.getItem('adminInfo')!)).loginId) {
        ElMessage.error("无法对当前用户删除")
    } else {
        if (roleRight.value) {
            selectId.value = row.loginId
            selectItem = roleList.value[index]
            deleteVisible.value = true
        } else {
            ElMessage.error("您的权限不够")
        }
    }
}


// 对话框消失事件
const handleClose = () => {
    deleteVisible.value = false
}
const romveConfirm = async () => {
    deleteVisible.value = false
    const res = await $removeRole(selectId.value)
    if (res.code == 200) {
        ElMessage.success(res.msg)
        loadRoleList()
    }
}
</script>

<style scoped>
:deep(.cell) {
    display: flex;
    justify-content: center;
}
</style>