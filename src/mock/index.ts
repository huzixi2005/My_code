// src/mock/index.ts
import Mock from 'mockjs';
import adminList from './json/admin.json'
import useUser from '../store/user'
import './room.ts'
import './order.ts'
import './money.ts'

let userStore: any = {}
setTimeout(() => {
  userStore = useUser()
  userStore.setAdminList(adminList)
});

// 登录
Mock.mock('/api/login', 'post', (params) => {
  const { loginId, loginPsw } = JSON.parse(params.body)
  const res = userStore.adminList.find((admin: { loginId: string, password: string }) => admin.loginId == loginId && admin.password == loginPsw);
  if (res) {
    return {
      code: 200,
      message: '登录成功',
      data: res
    };
  } else {
    return {
      code: 300,
      msg: "账号或密码错误"
    }
  }

});

// 获取角色列表
Mock.mock('/api/getRoleList', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: userStore.adminList
  };
})

// 获取单个角色
Mock.mock('/api/getRole', 'post', (params) => {
  const roleId = params.body
  let roleList = JSON.parse(localStorage.getItem('adminList')!)
  const res = roleList.find((role: { roleId: string }) => role.roleId == roleId)
  if (res) {
    return {
      code: 200,
      message: 'success',
      data: [res]
    };
  } else {
    return {
      code: 300,
      msg: '查找失败'
    };
  }

})

// 添加角色
Mock.mock('/api/addRole', 'post', (params) => {
  const { loginId, password, roleId, role } = JSON.parse(params.body)
  const res = userStore.adminList.find((admin: { loginId: string, roleId: string }) => admin.loginId == loginId || admin.roleId == roleId)
  if (!res) {
    userStore.addRole(JSON.parse(params.body))
    return {
      code: 200,
      msg: '添加成功',
    }
  } else {
    return {
      code: 300,
      msg: '该账号或编号已存在',
    }
  }
})

// 删除角色
Mock.mock('/api/removeRole', 'post', (params) => {
  const loginId = params.body
  const resList = userStore.adminList.filter(((admin: { loginId: string }) => admin.loginId != loginId))
  userStore.setAdminList(resList)
  return {
    code: 200,
    msg: '删除成功'
  };
})

// 编辑角色
Mock.mock('/api/editRole', 'post', (params) => {
  const { loginId, role } = JSON.parse(params.body)!
  let roleList = userStore.adminList
  const index = roleList.findIndex(((admin: { loginId: string }) => admin.loginId == loginId))
  if (index !== -1) {
    // 修改该索引对应的元素
    roleList[index].role = role;
  }
  userStore.setAdminList(roleList)
  return {
    code: 200,
    msg: '修改成功'
  };
})

// 更新登录用户信息
Mock.mock('/api/editUserInfo', 'post', (params) => {
  const { userName, tel, location } = JSON.parse(params.body)!
  let obj = userStore.userInfo
  obj = { ...obj, userName, tel, location }
  userStore.setUser(obj)
  return {
    code: 200,
    msg: '更新成功'
  }
})