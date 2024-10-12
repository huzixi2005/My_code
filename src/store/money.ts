import { defineStore } from "pinia";

export default defineStore('money', {
    state: () => {
        return {
            moneyList: {} as any
        }
    },
    actions: {
        setMoneyList(money: any) {
            this.moneyList = money
        },
        updateMoneyList(money: number, type: any, state: boolean) {
            const targetRoom = this.moneyList.detail.find((room: any) => Object.keys(room)[0] == type);
            console.log(this.moneyList.total);
            if (targetRoom) {
                if (state) {
                    this.moneyList.total += Number(money)
                    targetRoom[type] += Number(money)
                } else {
                    this.moneyList.total -= Number(money)
                    targetRoom[type] -= Number(money)
                }
            }
            console.log(this.moneyList.total);
        }
    },
    persist: true
})