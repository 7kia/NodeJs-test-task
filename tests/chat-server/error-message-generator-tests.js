import {expect} from 'chai';
import {ErrorMessageGenerator} from "../../chat-server/helper-modules/error-message-generator";

describe("Класс ErrorMessageGenerator. Генерирует сообщения.", () => {
    describe("Для исключений:", () => {
        it("Список пользователей не существует.", () => {
            /** @type {Array<number>} */
            const userList = [1, 2];
            expect(ErrorMessageGenerator.generateUserListNotExist(userList)).is.eq(
                "Users [" + userList + "] not exist"
            );
        })
        it("Чат существует.", () => {
            /** @type {number} */
            const id = 2;
            expect(ErrorMessageGenerator.generateChatExist({"id": id})).is.eq(
                "Chat with {\"id\":" + id + "} exist"
            );
        })
        it("Чата не существует.", () => {
            /** @type {number} */
            const id = 2;
            expect(ErrorMessageGenerator.generateChatNotExist(id)).is.eq(
                "Chat with id " + id + " not exist"
            );
        })
        it("Попытка отправить пустое сообщение.", () => {
            /** @type {number} */
            const authorId = 1;
            expect(ErrorMessageGenerator.generateTrySendEmptyMessage(authorId)).is.eq(
                "User with id " + authorId + " try send empty message"
            );
        })
        it("Пользователь существует.", () => {
            /** @type {string} */
            const userName = "name3";
            expect(ErrorMessageGenerator.generateUserExist(userName)).is.eq(
                "User with name " + userName + " exist"
            );
        })
        it("Пользователя не существует.", () => {
            /** @type {string} */
            const userName = "name4";
            expect(ErrorMessageGenerator.generateUserNotExist({"username": userName})).is.eq(
                "User with {\"username\":\"" + userName + "\"} not exist"
            );
        })
    })
})