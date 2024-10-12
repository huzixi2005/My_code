import roomType from './json/roomType.json'
import roomList from './json/roomList.json'
import Mock from 'mockjs';
import useRoom from '../store/room'

let roomStore: any
setTimeout(() => {
    roomStore = useRoom()
    roomStore.setRoomType(roomType)
    roomStore.setRoomList(roomList)
});

// 获取房间类型列表
Mock.mock('/api/room/getRoomTypeList', 'get', () => {
    return {
        code: 200,
        message: 'getRoomList',
        data: roomStore.roomType
    };
});

// 添加房间类型
Mock.mock('/api/room/addRoomType', 'post', (params) => {
    const { Id, type } = JSON.parse(params.body)!
    const room = JSON.parse(params.body)!
    const index = roomStore.roomType.find((room: { Id: string, type: string }) => { room.Id == Id || room.type == type })
    if (roomStore.roomType.length < 10) {
        if (!index) {
            roomStore.addRoomType(room)
            return {
                code: 200,
                msg: '添加成功'
            };
        } else {
            return {
                code: 300,
                msg: '该房型已存在'
            };
        }
    } else {
        return {
            code: 300,
            msg: '最多只能有10种房型'
        };
    }
});

// 编辑房间类型
Mock.mock('/api/room/editRoomType', 'post', (params) => {
    const roomNew = JSON.parse(params.body)
    roomStore.editRoomType(roomNew)
    return {
        code: 200,
        msg: '更新成功'
    }
})

// 删除房间类型
Mock.mock('/api/room/removeRoomType', 'post', (params) => {
    roomStore.removeRoomType(params.body)
    return {
        code: 200,
        msg: '删除成功'
    }
})

// 获取所有房间
Mock.mock('/api/room/getRoomList', 'post', (params: any = null) => {
    return {
        data: roomList
    }
})

// 添加房间
Mock.mock('/api/room/addRoom', 'post', (params: any = null) => {
    roomStore.addRoom(JSON.parse(params.body))
    return {
        code: 200,
        msg: '添加成功'
    }
})