export class ChatRouterController {
    /**
     *
     * @param {ChatAggregate} chatAggregate
     */
    constructor(chatAggregate) {
        this.chatAggregate = chatAggregate;
    }


    /**
     * @param {Request} req
     * @param {Response} res
     */
    add(req, res) {
        res.send('Chat Add tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    delete(req, res) {
        res.send('Chat Delete tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    addMessageToChat(req, res) {
        res.send('Chat add message tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    deleteMessageToChat(req, res) {
        res.send('Chat delete message tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    getListForUser(req, res) {
        res.send('Get chat list for user tests');
    }

    /**
     * @param {Request} req
     * @param {Response} res
     */
    getMessagesFromChat(req, res) {
        res.send('Get messages from chat tests');
    }
}