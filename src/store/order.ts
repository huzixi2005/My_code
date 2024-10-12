import { defineStore } from "pinia";

export default defineStore('order', {
    state: () => {
        return {
            orderList: [] as any
        }
    },
    actions: {
        setOrderList(list: any) {
            this.orderList = list
        },
        addOrder(room: any) {
            this.orderList.push(room)
        },
        removeOrder(roomId: string) {
            const index = this.orderList.findIndex((order:any) => order.roomId === roomId);
            console.log(index);
            
            this.orderList.splice(index, 1);
            // console.log(this.roomType);
        },
    },
    persist: true
})