import {expect} from 'chai';
import {MessageGenerator} from "../../chat-server/helper-modules/message-generator";

describe("Класс MessageGenerator. Генерирует сообщения.", () => {
    describe("Для исключений:", () => {
        it("Список пользователей не существует.", () => {
            /** @type {Array<number>} */
            const userList = [1, 2];
            expect(MessageGenerator.generateUserListNotExist(userList)).is.eq(
                "Users [" + userList + "] not exist"
            );
        })
        it("Чат существует.", () => {
            /** @type {number} */
            const id = 2;
            expect(MessageGenerator.generateChatExist(id)).is.eq(
                "Chat with id " + id + " exist"
            );
        })
        it("Чата не существует.", () => {
            /** @type {number} */
            const id = 2;
            expect(MessageGenerator.generateChatNotExist(id)).is.eq(
                "Chat with id " + id + " not exist"
            );
        })
        it("Попытка отправить пустое сообщение.", () => {
            expect(MessageGenerator.generateTrySendEmptyMessage()).is.eq(
                "Try send empty message"
            );
        })
        it("Пользователь существует.", () => {
            /** @type {string} */
            const userName = "name3";
            expect(MessageGenerator.generateUserExist(userName)).is.eq(
                "User with name " + userName + " exist"
            );
        })
        it("Пользователя не существует.", () => {
            /** @type {string} */
            const userName = "name4";
            expect(MessageGenerator.generateUserNotExist(userName)).is.eq(
                "User with name " + userName + " not exist"
            );
        })
    })
})