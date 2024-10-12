import { $get, $post } from "../utils/request";

// 登录
export const $login = (params: object) => $post('/api/login', params)
// 获取角色信息
export const $getRoleList = () => $get('/api/getRoleList')
// 查找角色
export const $getRole = (params: string) => $post('/api/getRole', params)
// 添加角色
export const $addRole = (params: object) => $post('/api/addRole', params)
// 删除角色
export const $removeRole = (params: any) => $post('/api/removeRole', params)
// 编辑角色
export const $editRole = (params: any) => $post('/api/editRole', params)
// 更新登录用户信息
export const $editUserInfo = (params: any) => $post('/api/editUserInfo', params)

// room
// 获取房间类型列表
export const $getRoomTypeList = () => $get('/api/room/getRoomTypeList')
// 添加房间类型
export const $addRoomType = (params: any) => $post('/api/room/addRoomType', params)
// 编辑房间类型
export const $editRoomType = (params: any) => $post('/api/room/editRoomType', params)
// 删除房间类型
export const $removeRoomType = (params: any) => $post('/api/room/removeRoomType', params)

// 获取房间列表
export const $getRoomList = (params: any = null) => $post('/api/room/getRoomList', params)

// 添加房间
export const $addRoom = (params: any = null) => $post('/api/room/addRoom', params)

// 订单
// 获取订单列表
export const $getOrderList = () => $get('/api/order/getOrderList')
// 添加订单
export const $addOrder = (params: any) => $post('/api/order/addOrder', params)
// 删除订单
export const $removeOrder = (params: any) => $post('/api/order/removeOrder', params)

// 金额
export const $getMoneyList = () => $get('/api/getMoneyList')