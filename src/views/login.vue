<template>
    <div class="login fx-center">
        <div class="loginbox fx-c-center p-0-50">
            <div class="f20 fw fx-center m-b-20">酒店管理系统</div>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                label-width="auto" class="demo-ruleForm">
                <el-form-item label="账号" prop="loginId">
                    <el-input v-model="ruleForm.loginId" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item label="密码" prop="loginPsw">
                    <el-input v-model="ruleForm.loginPsw" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item>
                    <div class="w100 fx-center fx-s-a p-t-10">
                        <el-button type="primary" round size="large" @click="submitForm(ruleFormRef)">
                            登录
                        </el-button>
                        <el-button type="default" round size="large" @click="resetForm(ruleFormRef)">
                            重置
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import axios from 'axios';

// pinia
import useUser from '../store/user'
const userStore = useUser()

const ruleFormRef = ref<FormInstance>()

const router = useRouter()

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } {
        callback()
    }
}

const ruleForm = reactive({
    loginId: '',
    loginPsw: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
    loginId: [{ validator: validatePass, trigger: 'blur' }],
    loginPsw: [{ validator: validatePass2, trigger: 'blur' }],
})

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            const { data: res } = await axios.post('/api/login', ruleForm)
            if (res.code == 200) {
                userStore.setUser(res.data)
                router.push('/index')
                ElMessage.success('登录成功')
            } else {
                ElMessage.error('账号或密码错误')
                ruleForm.loginPsw = ''
            }
        } else {
            ElMessage.error('请输入账号和密码')
        }
    })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style scoped lang="scss">
.login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/bg1.jpg') 0 no-repeat;
    background-size: 100vw auto;


    .loginbox {
        background: rgba(191, 198, 202, 0.8);
        border-radius: 20px;
        width: 25%;
        height: 30%;

        :deep(.el-form-item__label) {
            color: #fff;
        }
    }
}
</style>