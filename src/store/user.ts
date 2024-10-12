import { defineStore } from "pinia";
interface User {
    loginId: string;
    username: string;
    password: string;
    role: string;
    roleId: string;
    location: string;
}

export default defineStore('user', {
    state: () => {
        return {
            userInfo: {},
            adminList: [] as User[]
        }
    },
    actions: {
        setUser(user: any) {
            this.userInfo = user
            localStorage.setItem('adminInfo', JSON.stringify(user))
            localStorage.setItem('role', user.role)
            // 更新列表里的内容
            const index = this.adminList.findIndex(((admin: { loginId: string }) => admin.loginId == user.loginId))
            this.adminList[index] = user
            this.setAdminList(this.adminList)
        },
        addRole(role: any) {
            this.adminList.push(role)
            this.setAdminList(this.adminList)
        },
        setAdminList(adminList: any) {
            this.adminList = adminList
            localStorage.setItem('adminList', JSON.stringify(adminList))
        }
    },
    persist: true
})