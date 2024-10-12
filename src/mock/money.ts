import Mock from 'mockjs';
import useMoney from '../store/money'
import moneyList from '../mock/json/earn.json';
let moneyStore: any
setTimeout(() => {
    moneyStore = useMoney()
    moneyStore.setMoneyList(moneyList)
});

// 获取金额列表
Mock.mock('/api/getMoneyList', 'get', () => {
    return {
        code: 200,
        msg: '获取金额列表成功',
        data: moneyStore.moneyList
    };
});