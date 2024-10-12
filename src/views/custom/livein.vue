<template>
    <div>
        <div class="fx">
            <h3 style="margin-right: 200px;">入住管理</h3>
            <el-button size="default" type="primary" :icon="Plus" @click="addOrderVis = true">办理入住</el-button>
        </div>

        <div class="m-t-20">
            <el-table :data="orderList" stripe style="width: 100%" border>
                <el-table-column prop="uid" label="住户id" width="100" />
                <el-table-column prop="name" label="昵称" width="100" />
                <el-table-column prop="idCard" label="身份证" width="200" />
                <el-table-column prop="phone" label="电话" width="150" />
                <el-table-column prop="checkInDate" label="入住时间" width="150" />
                <el-table-column prop="checkOutDate" label="预计退房时间" width="150" />
                <el-table-column prop="roomType" label="房型" width="100" />
                <el-table-column prop="occupants" label="入住人数" width="100" />
                <el-table-column prop="deposit" label="押金" width="80" />
                <el-table-column prop="pricePerDay" label="金额" width="80" />
                <el-table-column prop="totalAmount" label="总金额" width="80" />
                <el-table-column label="操作" align='center'>
                    <template #default="scope">
                        <el-button size="large" type="danger" @click="handleOut(scope.$index, scope.row)">退房</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="fx-center m-t-20">
            <el-pagination background layout="total, sizes,prev, pager, next" :total="roomNum"
                :current-page="currentPage" :page-size="pageSize" :page-sizes="[5, 10]" @size-change="sizeChange"
                @current-change="pageChange" />
        </div>
    </div>

    <!-- 添加订单抽屉 -->
    <el-drawer v-model="addOrderVis" @close="closeDrawer">
        <template #header>
            <h4>添加订单</h4>
        </template>
        <template #default>
            <div>
                <el-form status-icon ref="ruleFormRef" style="max-width: 600px" :model="orderInfo" :rules="rules"
                    label-width="auto" class="demo-ruleForm">
                    <el-form-item label="房型类型" prop="type" size="large">
                        <el-select v-model="orderInfo.roomType" placeholder="Select" size="large" style="width: 240px"
                            @change="typeChange">
                            <el-option v-for="type in roomType" :key="type.Id" :label="type.type" :value="type.type" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="房间编号" prop="roomId" size="large">
                        <el-select v-model="orderInfo.roomId" placeholder="Select" size="large" style="width: 240px"
                            :filterable="true" :filter-method="filterMethod">
                            <el-option v-for="room in IdArr" :key="room.Id" :label="room.Id" :value="room.Id" />
                        </el-select>
                    </el-form-item>

                    <el-form-item label="用户ID" prop="uid" size="large">
                        <el-input v-model="orderInfo.uid" type="text" />
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="name" size="large">
                        <el-input v-model="orderInfo.name" type="text" />
                    </el-form-item>
                    <el-form-item label="身份证" prop="idCard" size="large">
                        <el-input v-model="orderInfo.idCard" type="text" />
                    </el-form-item>
                    <el-form-item label="手机" prop="phone" size="large">
                        <el-input v-model="orderInfo.phone" type="text" />
                    </el-form-item>
                    <el-form-item label="起始时间" prop="duringTime" size="large">
                        <el-date-picker v-model="orderInfo.duringTime" type="daterange" range-separator="To"
                            format="YYYY/MM/DD" value-format="YYYY-MM-DD" start-placeholder="Start date"
                            end-placeholder="End date" />
                    </el-form-item>
                    <el-form-item label="押金" prop="deposit" size="large">
                        <el-input v-model="orderInfo.deposit" type="text" />
                    </el-form-item>
                    <el-form-item label="每日房费" prop="pricePerDay" size="large">
                        <el-input v-model="orderInfo.pricePerDay" type="text" />
                    </el-form-item>
                    <el-form-item label="总金额" prop="totalAmount" size="large">
                        <el-input v-model="orderInfo.totalAmount" type="text" />
                    </el-form-item>

                    <div class="m-t-20 fx-s-a w100">
                        <el-button type="primary" @click="addConfirm()" size="large">确认</el-button>
                        <el-button @click="closeDrawer()" size="large">取消</el-button>
                    </div>

                </el-form>
            </div>
        </template>
    </el-drawer>

    <!-- 退出弹出 -->
    <el-dialog v-model="outVis" title="系统提示" width="500" align-center>
        <div class="fx">
            <el-icon size="20px" color="orange">
                <WarningFilled />
            </el-icon>
            <span style="margin-left: 10px;">确定给用户{{}}办理退房吗</span>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="outVis = false">取消</el-button>
                <el-button type="primary" @click="outConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { $addOrder, $getOrderList, $getRoomTypeList, $removeOrder } from '../../api';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { Plus, WarningFilled } from '@element-plus/icons-vue'
import useRoom from '../../store/room'


const roomStore = useRoom()
const roomType = ref([] as any)

// 编号下拉展示
const IdArr = ref([] as any)

onMounted(async () => {
    updateOrderList()
    // 获取房间类型
    const { data: roottype } = await $getRoomTypeList()
    roomType.value = roottype
})
// 所有的数据
let orderListTotal = ref([] as any)
const orderList = ref([]);           // 用于展示当前页的数据

// 分页逻辑，更新 roomList 的数据
const updateOrderList = async () => {
    const { data: res } = await $getOrderList();
    orderListTotal.value = res
    console.log(orderListTotal);

    // 计算起始索引和结束索引
    const startIndex = (currentPage.value - 1) * pageSize.value;
    const endIndex = currentPage.value * pageSize.value;
    // 使用 slice 提取当前页的数据
    orderList.value = orderListTotal.value.slice(startIndex, endIndex);
    roomNum.value = orderListTotal.value.length
};

// 分页相关
const roomNum = ref(0)              //总数
const currentPage = ref(1);         // 当前页码，默认为第一页
const pageSize = ref(5);            // 每页显示的条数

// 展示数量改变
const sizeChange = (size: number) => {
    pageSize.value = size
    updateOrderList()
}
const pageChange = (page: number) => {
    currentPage.value = page
    updateOrderList()

}

// 添加订单抽屉
const addOrderVis = ref(false)
const orderInfo = reactive({
    roomId: "",        // 房间 ID
    uid: "",           // 用户 ID
    name: "",          // 用户名
    idCard: "",        // 身份证号
    phone: "",         // 电话
    checkInDate: "",   // 入住日期
    checkOutDate: "",  // 退房日期
    duringTime: [],      //住房时间
    roomType: "标准间",      // 房间类型
    occupants: 1,      // 入住人数
    deposit: 100,        // 押金
    pricePerDay: 0,    // 每天的房间价格
    totalAmount: 0     // 总金额
})
// 房间类型下拉选择器改变
const typeChange = () => {
    console.log();
}
const filterMethod = () => {
    IdArr.value = roomStore.roomList.filter((room: any) => room.type === orderInfo.roomType)
}

// 验证规则
const rules = reactive<FormRules<typeof orderInfo>>({
    roomId: [{ required: true, message: '请输入房间编号', trigger: 'blur' },],
    uid: [{ required: true, message: '请输入用户ID', trigger: 'blur' },],
    name: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
    idCard: [{ required: true, message: '请输入身份证号', trigger: 'blur' },],
    phone: [{ required: true, message: '请输入电话', trigger: 'blur' },],
    occupants: [{ required: true, message: '请输入住房人数', trigger: 'blur' },],
    deposit: [{ required: true, message: '请输入押金', trigger: 'blur' },],
    pricePerDay: [{ required: true, message: '请输入日单价', trigger: 'blur' },],
    totalAmount: [{ required: true, message: '请输入日单价', trigger: 'blur' },],
    duringTime: [{ required: true, message: '请选择时间', trigger: 'blur' },],
})
// 抽屉关闭
const closeDrawer = () => {
    addOrderVis.value = false
    orderInfo.roomId = ""        // 房间 ID
    orderInfo.uid = ""           // 用户 ID
    orderInfo.name = ""        // 用户名
    orderInfo.idCard = ""        // 身份证号
    orderInfo.phone = ""         // 电话
    orderInfo.checkInDate = ""   // 入住日期
    orderInfo.checkOutDate = ""  // 退房日期
    orderInfo.deposit = 100  // 押金
    orderInfo.pricePerDay = 100  // 每天的房间价格
    orderInfo.totalAmount = 200  // 总金额
    orderInfo.duringTime = []  // 退房日期
}
// 确认添加
const ruleFormRef = ref<FormInstance>()
const addConfirm = async () => {
    orderInfo.checkInDate = orderInfo.duringTime[0]
    orderInfo.checkOutDate = orderInfo.duringTime[1]
    if (ruleFormRef.value) {
        try {
            await ruleFormRef.value.validate()
            const res = await $addOrder(orderInfo)
            // console.log(res);
            
            if (res.code == 200) ElMessage.success(res.msg)
            else {
                ElMessage.error(res.msg)
            }
            updateOrderList()
            closeDrawer()
        } catch (error) {
            console.log(error);
        }
    }
}

// 退房按钮
const outVis = ref(false)
let selectId = ''
const handleOut = (index: number, row: any) => {
    outVis.value = true
    selectId = row.roomId;
}
const outConfirm = async () => {
    const res = await $removeOrder(selectId)
    ElMessage.success(res.msg)
    currentPage.value = 1
    outVis.value = false
    updateOrderList()
}
</script>

<style scoped></style>