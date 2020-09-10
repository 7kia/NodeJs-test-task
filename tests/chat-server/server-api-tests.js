import {expect, should as shouldFunc} from 'chai';
import chai from "chai";
import chaiHttp from "chai-http";
import {describe, it} from "mocha";
import {sprintf} from "sprintf-js";
chai.use(chaiHttp);
/** @type {Chai.Should} */
const should = shouldFunc();

describe("Класс ServerApiController. Генерирует REST-ответы чат сервера.", () => {
    /** @type {string} */
    const SERVER_ADDRESS = "http://localhost:9000/";

    /**
     *
     * @param {string} text
     * @return {string}
     */
    function fixDoubleQuotes(text) {
        /** @type {string} */
        let result = text.split('\"').join("");
        result = result.split('\\').join("");
        return result;
    }
    /**
     * @param {string} url
     * @param {Object} sendData
     * @return {Promise<request.Response>}
     */
    async function generatePostRequest(url, sendData) {
        /** @type {request.Response} */
        const response = await chai.request(SERVER_ADDRESS)
            .post(url)
            .set('content-type', 'application/json')
            .send(sendData);
        return response;
    }

    /**
     * @param {string} message
     * @return {string}
     */
    function generateErrorMessage(message) {
        return sprintf('{errorMessage:%s}', message);
    }

    /**
     * @param {string} username
     * @return {number}
     */
    async function deleteUser(username) {
        /** @type {request.Response} */
        const response = await generatePostRequest(
            "users/delete",
            {
                "username": username
            }
        );
        response.should.have.status(200);
    }

    /**
     * @param {string} username
     * @return {number}
     */
    async function addUser(username) {
        /** @type {request.Response} */
        const response = await generatePostRequest(
            "users/add",
            {
                "username": username
            }
        );
        expect(response.error).is.eq(false);
        expect(response.body.id).is.a("number").and.is.not.undefined;
        return response.body.id;
    }
    describe("Добавить нового пользователя", () => {
        /** @type {string} */
        const USER_NAME = "user_1";
        it("Если такого пользователя нет, то он добавляется. " +
        "Возвращается id нового пользователя.", async () => {
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "users/add",
                {
                    "username": USER_NAME
                }
            );
            expect(response.error).is.eq(false);
            expect(response.status).is.eq(200);
            expect(response.body).is.an("Object");
            expect(response.body.id).is.a("number").is.greaterThan(0);
            await deleteUser(USER_NAME);
        })
        it("Если пользователь с указанным именем существует, то возвращается " +
            "сообщение о существовании пользователя и пользователь не добавляется", async () => {
            /** @type {string} */
            const USER_NAME = "user_1_";
            await addUser(USER_NAME);
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "users/add",
                {
                    "username": USER_NAME
                }
            );
            expect(response.error).is.instanceOf(Error);
            expect(response.error.status).is.eq(500);
            expect(fixDoubleQuotes(response.error.text)).is.eq(
                generateErrorMessage(sprintf("User with name %s exist", USER_NAME))
            );
            await deleteUser(USER_NAME);
        })

    })
    describe("Удалить пользователя", () => {
        it("Если такой пользователь существует, то он удаляется.", async () => {
            /** @type {string} */
            const USER_NAME = "testUser1";
            await addUser(USER_NAME);
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "users/delete",
                {
                    "username": USER_NAME
                }
            );
            expect(response.error).is.eq(false);
            expect(response.status).is.eq(200);
        })
        it("Если пользователя с указанным именем не существует, то возвращается " +
            "сообщение об отсутствии пользователя.", async () => {
            /** @type {null} */
            const USER_NAME = null;
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "users/delete",
                {
                    "username": USER_NAME
                }
            );
            expect(response.error).is.instanceOf(Error);
            expect(response.error.status).is.eq(500);
            expect(fixDoubleQuotes(response.error.text)).is.eq(
                generateErrorMessage(sprintf('User with {username:%s} not exist', USER_NAME))
            );
        })
    })

    /**
     * @return {number}
     * @param {string} chatName
     * @param {Array<number>} users
     */
    async function addChat(chatName, users) {
        /** @type {request.Response} */
        const response = await generatePostRequest(
            "chats/add",
            {
                "name": chatName, "users": users
            }
        );
        expect(response.error).is.eq(false);
        expect(response.body.id).is.a("number").and.is.not.undefined;
        return response.body.id;
    }

    /**
     *
     * @param {number} chatId
     */
    async function deleteChat(chatId) {
        /** @type {request.Response} */
        const response = await generatePostRequest(
            "chats/delete",
            {
                "id": chatId
            }
        );
        response.should.have.status(200);
    }
    describe("Создать новый чат между пользователями", () => {
        before(async () => {
            /** @type {string} */
            this.USER_NAME_1 = "test1";
            /** @type {string} */
            this.USER_NAME_2 = "test2";
            /** @type {number} */
            this.USER_ID_1 = await addUser(this.USER_NAME_1);
            /** @type {number} */
            this.USER_ID_2 = await addUser(this.USER_NAME_2);
            /** @type {string} */
            this.CHAT_NAME = "chat_1";
            /** @type {Array<number>} */
            this.USERS = [this.USER_ID_1, this.USER_ID_2];

        })
        describe("Чат создается и возвращается id нового чата, если", () => {
            it("1) Указанные пользователи существуют;\n" +
                "2) Не существует чата с указанными пользователями;" +
                "3) Имя чата не пустое", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/add",
                    {
                        "name": this.CHAT_NAME, "users": this.USERS
                    }
                );
                expect(response.error).is.eq(false);

                expect(response.status).is.eq(200);
                expect(response.body).is.an("Object");
                expect(response.body.id).is.a("number").is.greaterThan(0);
            })

        })
        describe("Чат не создается и возвращается сообщение с ошибкой, если", async () => {
            before(async () => {
                /** @type {string} */
                this.USER_NAME_3 = "test3";
                /** @type {number} */
                this.USER_ID_3 = await addUser(this.USER_NAME_3);
                /** @type {string} */
                this.CHAT_NAME_2 = "testChat2";
                /** @type {Array<number>} */
                this.USERS = [this.USER_ID_1, this.USER_ID_2, this.USER_ID_3];
            });

            it("Хотя бы один из пользователей не существует", async () => {
                /** @type {number} */
                const NOT_EXIST_USER = -1;
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/add",
                    {
                        "name": this.CHAT_NAME_2, "users": [this.USER_ID_1, NOT_EXIST_USER]
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(
                        sprintf("Users [%i] not exist", NOT_EXIST_USER)
                    )
                );
            })
            it("Существует чат с указанными пользователями", async () => {
                /** @type {number} */
                const chatId = await addChat(this.CHAT_NAME_2, this.USERS);
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/add",
                    {
                        "name": this.CHAT_NAME_2, "users": this.USERS
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(sprintf("Chat with {users:%j} exist", this.USERS))
                );

                await deleteChat(chatId);
            })
            it("Имя чата пустое", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/add",
                    {
                        "name": "", "users": this.USERS
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage("Chat name is empty")
                );
            })
            after(async () => {
                await deleteUser(this.USER_NAME_3);
            });
        })

        after(async () => {
            await deleteUser(this.USER_NAME_1);
            await deleteUser(this.USER_NAME_2);
        });
    })

    describe("Отправить сообщение в чат от лица пользователя", () => {
        before(async () => {
            /** @type {string} */
            this.USER_NAME_1 = "test4";
            /** @type {string} */
            this.USER_NAME_2 = "test5";
            /** @type {number} */
            this.USER_ID = await addUser(this.USER_NAME_1);
            /** @type {number} */
            this.USER_ID_2 = await addUser(this.USER_NAME_2);
            /** @type {string} */
            this.CHAT_NAME = "testChat3";
            /** @type {number} */
            this.CHAT_ID = await addChat(this.CHAT_NAME, [this.USER_ID, this.USER_ID_2]);
            /** @type {string} */
            this.MESSAGE_TEXT = "msg1";
        })



        describe("Создает сообщение и возвращает его id, если:", () => {
            it("1) Указанный чат существует;\n" +
                "2) Указанный пользователь(автор) существует;\n" +
                "3) Сообщение не является пустым", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/add",
                    {
                        "chat": this.CHAT_ID, "author": this.USER_ID, "text": this.MESSAGE_TEXT
                    }
                );
                expect(response.error).is.eq(false);

                expect(response.status).is.eq(200);
                expect(response.body).is.an("Object");
                expect(response.body.id).is.a("number").is.greaterThan(0);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            /** @type {number} */
            const NOT_EXIST_CHAT_ID = -1;
            /** @type {number} */
            const NOT_EXIST_USER = -1;
            it("Указанного чата не существует", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/add",
                    {
                        "chat": NOT_EXIST_CHAT_ID, "author": this.USER_ID, "text": this.MESSAGE_TEXT
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(sprintf(
                        "Chat with id %i not exist", NOT_EXIST_CHAT_ID
                    ))
                );
            })
            it("Указанного пользователя не существует", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/add",
                    {
                        "chat": this.CHAT_ID, "author": NOT_EXIST_USER, "text": this.MESSAGE_TEXT
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(
                        sprintf(
                        "User with {id:%i} not exist", NOT_EXIST_USER
                    ))
                );
            })
            it("Сообщение пустое", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/add",
                    {
                        "chat": this.CHAT_ID, "author": this.USER_ID, "text": ""
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(sprintf(
                        "User with id %i try send empty message", this.USER_ID
                    ))
                );
            })
        })

        after(async () => {
            await deleteUser(this.USER_NAME_1);
            await deleteUser(this.USER_NAME_2);
            await deleteChat(this.CHAT_ID);
        })
    })

    /**
     * @param {JSON} element
     */
    function checkChatListElementStructure(element) {
        element.should.have.property("id").is.a("number");
        element.should.have.property("name").is.a("string");
        element.should.have.property("users").is.a("Array");
        element.should.have.property("createdAt").is.a("string");
    }

    describe("Получить список чатов конкретного пользователя", () => {
        before(async () => {
            /** @type {string} */
            this.USER_NAME_1 = "test6";
            /** @type {string} */
            this.USER_NAME_2 = "test7";
            /** @type {string} */
            this.USER_NAME_3 = "test8";
            /** @type {number} */
            this.USER_ID = await addUser(this.USER_NAME_1);
            /** @type {number} */
            this.USER_ID_2 = await addUser(this.USER_NAME_2);
            /** @type {number} */
            this.USER_ID_3 = await addUser(this.USER_NAME_3);
            /** @type {string} */
            this.CHAT_NAME = "testChat5";
            /** @type {number} */
            this.CHAT_ID_1 = await addChat(this.CHAT_NAME, [this.USER_ID, this.USER_ID_2]);
            /** @type {number} */
            this.CHAT_ID_2 = await addChat(this.CHAT_NAME, [this.USER_ID, this.USER_ID_3]);
        })

        describe("Возвращает cписок всех чатов со всеми полями, отсортированный " +
            "по времени создания последнего сообщения в чате (от позднего к раннему)," +
            " если", () => {
            it("Указанный пользователь существует", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/get",
                    {
                        "user": this.USER_ID
                    }
                );
                expect(response.error).is.eq(false);

                expect(response.status).is.eq(200);
                expect(response.body).is.an("Object");
                /** @type {JSON} */
                const json = response.body;
                json.should.have.property("chatList").is.a("Array");
                checkChatListElementStructure(json["chatList"][0]);
                checkChatListElementStructure(json["chatList"][1]);
                expect(json["chatList"][0].id).is.eq(this.CHAT_ID_1);
                expect(json["chatList"][1].id).is.eq(this.CHAT_ID_2);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного пользователя не существует", async () => {
                /** @type {number} */
                const NOT_EXIST_USER = -1;
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/get",
                    {
                        "user": NOT_EXIST_USER
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(sprintf(
                        "User with {id:%i} not exist", NOT_EXIST_USER
                    ))
                );
            })
        })

        after(async () => {
            await deleteUser(this.USER_NAME_1);
            await deleteUser(this.USER_NAME_2);
            await deleteUser(this.USER_NAME_3);
            await deleteChat(this.CHAT_ID_1);
            await deleteChat(this.CHAT_ID_2);
        })

    })
    describe("Получить список сообщений в конкретном чате", () => {
        /**
         * @param {number} chatId
         * @param {number} userId
         * @param {string} message
         * @return {number}
         */
        async function addMessage(chatId, userId, message) {
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "chats/messages/add",
                {
                    "chat": chatId, "author": userId, "text": message
                }
            );
            expect(response.error).is.eq(false);
            expect(response.body.id).is.a("number").and.is.not.undefined;
            return response.body.id;
        }

        /**
         * @param {number} id
         */
        async function deleteMessage(id) {
            /** @type {request.Response} */
            const response = await generatePostRequest(
                "chats/messages/delete",
                {
                    "id": id
                }
            );
            response.should.have.status(200);
        }



        /**
         * @param {JSON} element
         */
        function checkMessageListElementStructure(element) {
            element.should.have.property("id").is.a("number");
            element.should.have.property("chat").is.a("number");
            element.should.have.property("author").is.a("number");
            element.should.have.property("text").is.a("string");
            element.should.have.property("createdAt").is.a("string");
        }
        describe("Возвращает список всех сообщений чата со всеми полями, " +
            "отсортированный по времени создания сообщения (от раннего к " +
            "позднему), если", () => {
            before(async () => {
                /** @private {string} */
                this.USER_NAME_1 = "test9";
                /** @private {string} */
                this.USER_NAME_2 = "test10";
                /** @private {number} */
                this.USER_ID = await addUser(this.USER_NAME_1);
                /** @private {number} */
                this.USER_ID_2 = await addUser(this.USER_NAME_2);
                /** @private {string} */
                this.CHAT_NAME = "testChat7";
                /** @private {number} */
                this.EXISTING_CHAT_ID = await addChat(this.CHAT_NAME, [this.USER_ID, this.USER_ID_2]);
                /** @private {string} */
                this.MESSAGE_TEXT_1 = "msg1";
                /** @private {string} */
                this.MESSAGE_TEXT_2 = "msg2";
                /** @private {number} */
                this.MESSAGE_ID_1 = await addMessage(this.EXISTING_CHAT_ID, this.USER_ID, this.MESSAGE_TEXT_1);
                /** @private {number} */
                this.MESSAGE_ID_2 = await addMessage(this.EXISTING_CHAT_ID, this.USER_ID, this.MESSAGE_TEXT_2);
            })
            it("Указанный чат существует", async () => {
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/get",
                    {
                        "chat": this.EXISTING_CHAT_ID
                    }
                );
                expect(response.error).is.eq(false);

                expect(response.status).is.eq(200);
                expect(response.body).is.an("Object");
                /** @type {JSON} */
                const json = response.body;
                json.should.have.property("messageList").is.a("Array");
                checkMessageListElementStructure(json["messageList"][0]);
                checkMessageListElementStructure(json["messageList"][1]);
                expect(json["messageList"][0].id).is.eq(this.MESSAGE_ID_1);
                expect(json["messageList"][1].id).is.eq(this.MESSAGE_ID_2);
            })
            after(async () => {
                await deleteMessage(this.MESSAGE_ID_1);
                await deleteMessage(this.MESSAGE_ID_2);
                await deleteUser(this.USER_NAME_1);
                await deleteUser(this.USER_NAME_2);
                await deleteChat(this.EXISTING_CHAT_ID);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного чата не существует", async () => {
                /** @type {number} */
                const NOT_EXIST_CHAT = -1;
                /** @type {request.Response} */
                const response = await generatePostRequest(
                    "chats/messages/get",
                    {
                        "chat": NOT_EXIST_CHAT
                    }
                );
                expect(response.error).is.instanceOf(Error);
                expect(response.error.status).is.eq(500);
                expect(fixDoubleQuotes(response.error.text)).is.eq(
                    generateErrorMessage(sprintf(
                        "Chat with id %i not exist", NOT_EXIST_CHAT
                    ))
                );
            })
        })


    })
})