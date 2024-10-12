import orderList from './json/order.json'
import useOrder from '../store/order'
import Mock from 'mockjs';
import useRoom from '../store/room'
import useMoney from '../store/money'
let roomStore: any
let orderStore: any
let moneyStore: any

setTimeout(() => {
    orderStore = useOrder()
    roomStore = useRoom()
    moneyStore = useMoney()
    orderStore.setOrderList(orderList)
});

// 获取订单列表
Mock.mock('/api/order/getOrderList', 'get', () => {
    return {
        code: 200,
        msg: '获取订单列表成功',
        data: orderStore.orderList
    };
});

// 添加订单流程：
/*
根据rootType找到对应房型，判断房型的remain，如果房型数<1,返回添加失败
找到Id为roomId的房间
    若当前房间不是该类型，返回失败
    若该房间的isAvailable为false，返回失败
添加成功后，房型数-1，房间isAvailable为true,uid为用户id
*/
Mock.mock('/api/order/addOrder', 'post', (params: any) => {
    const { roomType, roomId, uid, totalAmount } = JSON.parse(params.body)
    // 找到房型
    const roomTypeObj = roomStore.roomType.find((room: any) => room.type === roomType)

    if (Number(roomTypeObj.remain) > 0) {
        // 找对应的房间
        const room = roomStore.roomList.find((room: any) => room.Id == roomId)
        if (room.isAvailable) {
            // 1.增加订单
            orderStore.addOrder(JSON.parse(params.body))
            // 2.修改房型
            roomTypeObj.remain--
            roomStore.editRoomType(roomTypeObj)
            // 3.修改房间
            room.uid = uid
            room.isAvailable = false
            roomStore.editRoom(room)
            // 4.加钱
            moneyStore.updateMoneyList(totalAmount, roomType, true)
            return {
                code: 200,
                msg: '添加成功'
            }
        } else {
            return {
                code: 300,
                msg: '该房间已入住其他用户'
            }
        }
    } else {
        return {
            code: 300,
            msg: '该房型已满'
        }
    }
})

// 删除订单
/* 
根据房间Id找到对应房间，修改房间uid,isAvailable
找到房间类型，房间类型对应数量+1
找到订单，删除订单
*/
Mock.mock('/api/order/removeOrder', 'post', (params) => {
    const room = roomStore.roomList.find((room: any) => room.Id == params.body)
    room.uid = null
    room.isAvailable = true

    const type = roomStore.roomType.find((type: any) => type.type == room.type)
    type.remain++
    roomStore.editRoomType(type)
    orderStore.removeOrder(params.body)

    return {
        code: 200,
        msg: '退房成功'
    }
});