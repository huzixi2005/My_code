<template>
    <div class="header">
        <!-- 展示类型选择 -->
        <div>
            <el-text style="margin-right: 20px;">展示类型：</el-text>
            <el-select v-model="selectChartType" placeholder="Select" size="large" style="width: 240px"
                @change="typeChange">
                <el-option v-for="item, index in showChartsArr" :key="index" :label="item.chart" :value="item.chart" />
            </el-select>
        </div>
    </div>

    <div id="showChart" v-if="role == '超级管理员'"></div>
    <el-empty v-else :image-size="400" description="您的权限不够"/>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { $getMoneyList, $getRoomTypeList } from '../../api';
import * as echarts from 'echarts';
const role = localStorage.getItem('role')
const roomType = ref([] as any)
const moneyList = reactive({
    total: 0,
    detail: []
})
const roomTypes = ref([] as any)
const amounts = ref([] as any)
var myChart: any
onMounted(async () => {
    const { data: roottype } = await $getRoomTypeList()
    const { data: res } = await $getMoneyList()
    myChart = echarts.init(document.getElementById('showChart'));
    roomType.value = roottype
    Object.assign(moneyList, res)
    // 提取房型名称和对应的金额
    roomTypes.value = moneyList.detail.map(item => Object.keys(item)[0]); // ['单人间', '标准间', ...]
    amounts.value = moneyList.detail.map(item => Object.values(item)[0]); // [1500, 800, ...]
    updatePic1()
    myChart.setOption(chatOption1)
})

const selectChartType = ref('柱状图')
const showChartsArr = [{ chart: '柱状图' }, { chart: '折线图' }, { chart: '饼状图' }, { chart: '南丁格尔图（玫瑰图）' }]

// 给柱状图赋值
const updatePic1 = () => {
    chatOption1.xAxis.data = roomTypes.value
    chatOption1.series[0].data = amounts.value
}
// 给折线图赋值
const updatePic2 = () => {
    chatOption2.xAxis.data = roomTypes.value
    chatOption2.series[0].data = amounts.value
}
// 给饼状图赋值
const updatePic3 = () => {
    const pieChartData = moneyList.detail.map(item => {
        return {
            name: Object.keys(item)[0], // 房型名称
            value: Object.values(item)[0] as number // 对应金额
        };
    });
    chatOption3.series[0].data = pieChartData
}
// 给饼状图赋值
const updatePic4 = () => {
    const pieChartData = moneyList.detail.map(item => {
        return {
            name: Object.keys(item)[0], // 房型名称
            value: Object.values(item)[0] as number // 对应金额
        };
    });
    chatOption4.series[0].data = pieChartData
}


// 柱状图
const chatOption1 = reactive({
    title: {
        text: '收入展示'
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [
        {
            type: 'bar',
            data: []
        }
    ]
})

// 折线图
const chatOption2 = reactive({
    title: {
        text: '收入展示'
    },
    xAxis: {
        type: 'category',
        data: ['A', 'B', 'C']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [120, 200, 150],
            type: 'line'
        }
    ]
})

const chatOption3 = reactive({
    series: [
        {
            type: 'pie',
            data: [] as { name: string; value: number }[],
            radius: '60%',
        },

    ],
})

const chatOption4 = reactive({
    series: [
        {
            type: 'pie',
            data: [] as { name: string; value: number }[],
            roseType: 'area'
        }
    ]
})


// 展示类型改变
const typeChange = () => {
    
    switch (selectChartType.value) {
        case '柱状图':
            updatePic1()
            myChart.setOption(chatOption1)
            break;
        case '折线图':
            updatePic2()
            myChart.setOption(chatOption2)
            break;
        case '饼状图':
            updatePic3()
            console.log(chatOption3);
            
            myChart.setOption(chatOption3)
            break;
        case '南丁格尔图（玫瑰图）':
            updatePic4()
            myChart.setOption(chatOption4)
            break;
    }


}

</script>

<style scoped lang="scss">
.header {
    display: flex;
}

#showChart {
    margin-top: 50px;
    width: 80vw;
    height: 500px;
}
</style>