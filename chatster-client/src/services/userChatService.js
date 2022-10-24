import BaseServiceClass from "./baseServiceClass";

class UserChatService extends BaseServiceClass {
    async getUsers (payload) {
        return (await this.searchUser(payload, 'users'))
    }

    async createNewChat (payload) {
        this.postMethod(payload, 'Chat created', 'Chat already exists', 'createNewChat')
    }

    async getChatsWithAllUsers(payload) {
        return this.getMethod(`getChatsWithAllUsers/${payload._id}`)
    }

    async chatHistory(payload) {
        return this.getMethod(`chatHistory/${payload}`)
    }

    async addNewChatMessage(payload) {
        this.postMethod(payload, '', '', `addNewChatMessage/${payload.chatId}`)
    }
}

export default UserChatService