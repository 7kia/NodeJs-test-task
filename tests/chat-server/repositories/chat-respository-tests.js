import * as chai from 'chai';
import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {Chat} from "../../../chat-server/database/entity/chat";
chai.use(require("chai-as-promised"));

describe("Класс ChatRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу Chat.", async () => {
    /** @type {Client} */
    const connection = new DatabaseManagerBuilder().createConnection();
    /** @type {ChatRepository} */
    const chatRepository = new RepositoriesFactory().createChatRepository(connection);
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await chatRepository.createTableIfNotExist()}).to.not.throw();
    })
    /** @type {string} */
    const chatName = "ChatTest1";
    /** @type {Array<number>}  */
    const users = [1, 2];
    describe("Может добавить чат с указанным именем и списком пользователей", async () => {
        /**
         * @type {number}
         * созданный чат нужно будет потом удалить, чтобы БД перед следующим
         * использованием была в том состоянии, в котором она была до тестов.
         * */
        let chatId = -1;
        it("Если успешно, то возвращает его id.", async () => {
            chatId = await chatRepository.add(chatName, users);
            expect(chatId)
                .is.a("number")
                .is.greaterThan(0);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            const func = async () => {
                await chatRepository.add(chatName, users);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
        await chatRepository.delete(chatId);
    })
    describe("Может удалить чат с указанным id", async () => {
        /** @type {number} */
        let chatId = await chatRepository.add(chatName, users);
        it("Если успешно, то возвращает true.", async () => {
            expect(await chatRepository.delete(chatId))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await chatRepository.delete(chatId);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
        await chatRepository.delete(chatId);
    })
    describe("Может найти чат с указанными полями", async () => {
        /** @type {string} */
        const chatName2 = "ChatTest2";
        /** @type {Array<number>}  */
        const users2 = [3, 4];
        /** @type {number} */
        const chatId2 = await chatRepository.add(chatName2, users2);
        it("Если успешно, то возвращает true.", async () => {
            /** @type {Chat} */
            const chat = await chatRepository.find({"name": chatName2, "users": users2});
            expect(chat).is.instanceOf(Chat);
            expect(chat.id).is.eq(chatId2);
            expect(chat.name).is.eq(chatName2);
            expect(chat.users).is.eq(users2);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await chatRepository.find({"name": null});
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
        await chatRepository.delete(chatId2);
    })
    describe("Может выдать список чатов пользователя", async () => {
        /** @type {string} */
        const chatName1 = "ChatTest3";
        /** @type {Array<number>}  */
        const users1 = [4, 5];
        /** @type {number} */
        const chatId1 = await chatRepository.add(chatName1, users1);
        /** @type {string} */
        const chatName2 = "ChatTest4";
        /** @type {Array<number>}  */
        const users2 = [5, 6];
        /** @type {number} */
        const chatId2 = await chatRepository.add(chatName2, users2);

        /** @type {number} */
        const userId = 5;
        it("Если успешно, то возвращает список чатов.", async () => {
            /** @type {number} */
            const chatAmount = 2;
            /** @type {Array<Chat>} */
            const chats = await chatRepository.findAllForUser(userId);
            expect(chats).to.be.a("Array").have.length(chatAmount);
            for (let i = 0; i < chatAmount; i++) {
                expect(chats[i]).is.instanceOf(Chat);
                expect(chats[i].users).include(userId);
                if (i > 0) {
                    expect(chats[i].createdAt.getTime()).is.lessThan(chats[i - 1].createdAt.getTime());
                }
            }
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await chatRepository.findAllForUser(-1);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
        await chatRepository.delete(chatId1);
        await chatRepository.delete(chatId2);
    })
})