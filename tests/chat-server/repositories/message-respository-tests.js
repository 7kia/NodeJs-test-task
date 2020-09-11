import * as chai from 'chai';
import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {ChatMessage} from "../../../chat-server/database/entity/chat-message";
chai.use(require("chai-as-promised"));

describe("Класс MessageRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу Message.", () => {
    before(async () => {
        /** @type {Client} */
        const connection = new DatabaseManagerBuilder().createConnection();
        /** @private {MessageRepository} */
        this.messageRepository = new RepositoriesFactory().createMessageRepository(connection);
        await this.messageRepository.createTableIfNotExist();
    })
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await this.messageRepository.createTableIfNotExist()}).to.not.throw();
    })

    describe("Может добавить сообщение в чат", () => {
        it("Если указан id чата, id автора и текст сообщения, то возвращает его id.", async () => {
            /** @type {number} */
            const chatId = 4;
            /** @type {number} */
            const authorId = 1;
            /** @type {string} */
            const message = "msg1";
            /** @type {number} */
            const messageId = await this.messageRepository.add(chatId, authorId, message);
            expect(messageId).is.a("number").is.greaterThan(0);
        })
    })
    describe("Может удалить сообщение с указанным id", () => {
        it("Если сообщение удалено, то возвращает true.", async () => {
            /** @type {number} */
            const chatId = 2;
            /** @type {number} */
            const authorId = 0;
            /** @type {string} */
            const message = "msg2";
            /** @type {number} */
            let messageId = await this.messageRepository.add(chatId, authorId, message);
            expect(await this.messageRepository.delete(messageId))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await this.messageRepository.delete(-1);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
    })
    describe("Может выдать список всех сообщений чата", () => {
        it("Если запрос успешно выполнен, то возвращает список сообщений, " +
            "даже если он пустой, что означает, что в чате нет сообщений", async () => {
            /** @type {number} */
            const chatId = 3;
            /** @type {number} */
            const authorId = 4;
            /** @type {number} */
            const messageId1 = await this.messageRepository.add(chatId, authorId, "message1");
            /** @type {number} */
            const messageId2 = await this.messageRepository.add(chatId, authorId, "message2");
            /** @type {number} */
            const messageAmount = 2;
            /** @type {Array<ChatMessage>} */
            const messages = await this.messageRepository.getMessages(chatId);
            await this.messageRepository.delete(messageId1);
            await this.messageRepository.delete(messageId2);

            expect(messages).to.be.a("Array").have.length(messageAmount);
            for (let i = 0; i < messageAmount; i++) {
                expect(messages[i]).is.instanceOf(ChatMessage);
                expect(messages[i].author).is.eq(authorId);
                if (i > 0) {
                    expect(messages[i].createdAt.getTime()).is.least(messages[i - 1].createdAt.getTime());
                }
            }
        })
    })
})