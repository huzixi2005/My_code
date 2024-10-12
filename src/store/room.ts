import { defineStore } from "pinia";
interface roomType {
    Id: string;
    type: string;
    price: number;
    bedNum: number;
    total: number;
    remain: number;
    des: string;
    img: string;
}
export default defineStore('room', {
    state: () => {
        return {
            roomType: [] as roomType[],
            roomList: [] as any
        }
    },
    actions: {
        setRoomType(room: any) {
            this.roomType = room
        },
        addRoomType(room: any) {
            this.roomType.push(room)
        },
        editRoomType(roomNew: any) {
            const { Id } = roomNew
            const index = this.roomType.findIndex((type: { Id: string }) => type.Id == Id)
            this.roomType.splice(index, 1, { ...this.roomType[index], ...roomNew })
        },
        removeRoomType(roomId: string) {
            const index = this.roomType.findIndex((room) => room.Id === roomId);
            this.roomType.splice(index, 1);
            // console.log(this.roomType);
        },
        setRoomList(roomlist: any) {
            this.roomList = roomlist
        },
        addRoom(room: any) {
            this.roomList.push(room)
        },
        editRoom(roomNew: any) {
            const { Id } = roomNew
            const index = this.roomList.findIndex((room: { Id: string }) => room.Id == Id)
            this.roomList.splice(index, 1, { ...this.roomList[index], ...roomNew })
        }
    },
    persist: true
})