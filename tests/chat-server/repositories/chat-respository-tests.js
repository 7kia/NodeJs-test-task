import * as chai from 'chai';
import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {Chat} from "../../../chat-server/database/entity/chat";
chai.use(require("chai-as-promised"));

describe("Класс ChatRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу Chat.", () => {
    before(async () => {
        /** @type {Client} */
        const connection = new DatabaseManagerBuilder().createConnection();
        /** @private {ChatRepository} */
        this.chatRepository = new RepositoriesFactory().createChatRepository(connection);
        await this.chatRepository.createTableIfNotExist();
        /** @private {string} */
        this.chatName = "ChatTest1";
        /** @private {Array<number>}  */
        this.users = [1, 2];
    })
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await this.chatRepository.createTableIfNotExist()}).to.not.throw();
    })

    describe("Может добавить чат с указанным именем и списком пользователей", () => {
        it("Если успешно, то возвращает его id.", async () => {
            /** @type {number} */
            const chatId = await this.chatRepository.add(this.chatName, this.users);
            expect(chatId)
                .is.a("number")
                .is.greaterThan(0);
            await this.chatRepository.delete(chatId);
        })
    })
    describe("Может удалить чат с указанным id", async () => {
        it("Если успешно, то возвращает true.", async () => {
            /** @type {number} */
            const chatId = await this.chatRepository.add(this.chatName, this.users);
            expect(await this.chatRepository.delete(chatId))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await this.chatRepository.delete(-1);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
    })
    describe("Может найти чат с указанными полями", () => {
        it("Если успешно, то возвращает true.", async () => {
            /** @type {string} */
            const chatName2 = "ChatTest2";
            /** @type {Array<number>}  */
            const users2 = [3, 4];
            /** @type {number} */
            const chatId = await this.chatRepository.add(chatName2, users2);

            /** @type {Chat} */
            const chat = await this.chatRepository.find({
                "name": chatName2, "users": users2
            });
            await this.chatRepository.delete(chatId);

            expect(chat).is.instanceOf(Chat);
            expect(chat.id).is.eq(chatId);
            expect(chat.name).is.eq(chatName2);
            expect(chat.users).is.deep.equal(users2);
        })
        it("Если не удалось, то возвращает null.", async () => {
            await expect(await this.chatRepository.find({"name": null}))
                .to.be.null;
        })
    })
    describe("Может выдать список чатов пользователя", async () => {
        it("Если успешно, то возвращает список чатов.", async () => {
            /** @type {string} */
            const chatName1 = "ChatTest3";
            /** @type {number} */
            const userId = 5;
            /** @type {Array<number>}  */
            const users1 = [4, userId];
            /** @type {number} */
            const chatId1 = await this.chatRepository.add(chatName1, users1);
            /** @type {string} */
            const chatName2 = "ChatTest4";
            /** @type {Array<number>}  */
            const users2 = [userId, 6];
            /** @type {number} */
            const chatId2 = await this.chatRepository.add(chatName2, users2);

            /** @type {number} */
            const chatAmount = 2;
            /** @type {Array<Chat>} */
            const chats = await this.chatRepository.findAllForUser(userId);
            await this.chatRepository.delete(chatId1);
            await this.chatRepository.delete(chatId2);

            expect(chats).to.be.a("Array").have.length(chatAmount);
            for (let i = 0; i < chatAmount; i++) {
                expect(chats[i]).is.instanceOf(Chat);
                expect(chats[i].users).include(userId);
                if (i > 0) {
                    expect(chats[i].createdAt.getTime()).is.least(chats[i - 1].createdAt.getTime());
                }
            }
        })
    })
})