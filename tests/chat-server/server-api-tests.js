import {expect} from 'chai';
import chai from "chai";
import chaiHttp from "chai-http";
import {describe, it} from "mocha";
chai.use(chaiHttp);

describe("Класс ServerApiController. Генерирует REST-ответы чат сервера.", () => {
    /** @type {string} */
    const SERVER_ADDRESS = "http://localhost:9000/";
    /**
     * @param {string} username
     * @return {number}
     */
    function deleteUser(username) {
        chai.request(SERVER_ADDRESS)
            .get("users/delete")
            .type("json")
            .send({
                "username": username
            });
    }
    describe("Добавить нового пользователя", () => {
        /** @type {string} */
        const USER_NAME = "user_1";
        it("Если такого пользователя нет, то он добавляется. " +
        "Возвращается id нового пользователя.", (done) => {
            chai.request(SERVER_ADDRESS)
                .post("users/add")
                .type("json")
                .send({
                    "username": USER_NAME
                }).end(function (err, res) {
                    expect(err).to.be.null;

                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(JSON.parse(res.body).id).is.a("number");
                    done();
                });
        })
        it("Если пользователь с указанным именем существует, то возвращается " +
            "сообщение о существовании пользователя и пользователь не добавляется", (done) => {
            chai.request(SERVER_ADDRESS)
                .post("users/add")
                .type("json")
                .send({
                    "username": USER_NAME
                }).end(function (err, res) {
                    expect(err).to.be.not.null;

                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(JSON.parse(res.body).errorMessage).is.eq(
                        "User with name=" + USER_NAME + " exist."
                    );
                    done();
                });
        })
        deleteUser(USER_NAME);
    })
    /*
     *  Удаление добавлено для тестирования
     */
    /**
     * @param {string} username
     * @return {number}
     */
    function addUser(username) {
        /** @type {number} */
        let result = 0;
        chai.request(SERVER_ADDRESS)
            .post("users/add")
            .type("json")
            .send({
                "username": username
            }).then(function (res) {
            result = JSON.parse(res.body).id;
        });
        return result;
    }
    describe("Удалить пользователя", () => {
        /** @type {string} */
        const USER_NAME = "testUser1";
        addUser(USER_NAME);
        it("Если такой пользователь существует, то он удаляется.", (done) => {
            chai.request(SERVER_ADDRESS)
                .get("users/delete")
                .type("json")
                .send({
                    "username": USER_NAME
                }).end(function (err, res) {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    done();
                });
        })
        it("Если пользователя с указанным именем не существует, то возвращается " +
            "сообщение об отсутствии пользователя.", (done) => {
            chai.request(SERVER_ADDRESS)
                .get("users/delete")
                .type("json")
                .send({
                    "username": USER_NAME
                }).end(function (err, res) {
                    expect(err).to.be.not.null;

                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(JSON.parse(res.body).errorMessage).is.eq(
                        "User with name=" + USER_NAME + " not exist."
                    );
                    done();
                });
        })
    })

    /**
     * @return {number}
     * @param {string} chatName
     * @param {Array<number>} users
     */
    function addChat(chatName, users) {
        /** @type {number} */
        let result = 0;
        chai.request(SERVER_ADDRESS)
            .post("chats/add")
            .type("json")
            .send({
                "name": chatName, "users": users
            }).then(function (err, res) {
                result = JSON.parse(res.body).id;
            });
        return result;
    }

    /**
     *
     * @param {number} chatId
     */
    function deleteChat(chatId) {
        chai.request(SERVER_ADDRESS)
            .get("chats/delete")
            .type("json")
            .send({
                "id": chatId
            });
    }
    describe("Создать новый чат между пользователями", () => {
        /** @type {string} */
        const USER_NAME_1 = "test1";
        /** @type {string} */
        const USER_NAME_2 = "test2";
        /** @type {number} */
        const USER_ID_1 = addUser(USER_NAME_1);
        /** @type {number} */
        const USER_ID_2 = addUser(USER_NAME_2);
        /** @type {string} */
        const CHAT_NAME = "user_1";
        /** @type {number} */
        let testChatId = 0;
        describe("Чат создается и возвращается id нового чата, если", () => {
            it("1) Указанные пользователи существуют;\n" +
                "2) Не существует чата с указанными пользователями;", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/add")
                    .type("json")
                    .send({
                        "name": CHAT_NAME, "users": [USER_ID_1, USER_ID_2]
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        testChatId = JSON.parse(res.body).id;
                        expect(testChatId).is.a("number");

                        done();
                    });
            })
            deleteChat(testChatId);
        })
        describe("Чат не создается и возвращается сообщение с ошибкой, если", () => {
            /** @type {number} */
            const USER_ID_3 = addUser("test3");
            /** @type {string} */
            const CHAT_NAME_2 = "testChat2";
            /** @type {Array<number>} */
            const USERS = [USER_ID_1, USER_ID_2, USER_ID_3];
            /** @type {number} */
            const chatId = addChat(CHAT_NAME_2, USERS);
            it("Хотя бы один из пользователей не существует", (done) => {
                /** @type {number} */
                const NOT_EXIST_USER = 0;
                chai.request(SERVER_ADDRESS)
                    .post("chats/add")
                    .type("json")
                    .send({
                            "name": CHAT_NAME, "users": [USER_ID_1, NOT_EXIST_USER]
                    }).then(function (err, res) {
                        expect(err).to.be.not.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "Chat \"${CHAT_NAME}\" not create. User with name=${NOT_EXIST_USER} not exist."
                        );
                        done();
                    });
            })
            it("Существует чат с указанными пользователями", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/add")
                    .type("json")
                    .send({
                        "name": CHAT_NAME_2, "users": USERS
                    }).then(function (err, res) {
                        expect(err).to.be.not.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "Chat with users=${USERS} exist."
                        );
                        done();
                    });
            })
            deleteChat(chatId);
        })

        deleteUser(USER_NAME_1);
        deleteUser(USER_NAME_2);
    })

    describe("Отправить сообщение в чат от лица пользователя", () => {
        /** @type {string} */
        const USER_NAME_1 = "test4";
        /** @type {string} */
        const USER_NAME_2 = "test5";
        /** @type {number} */
        const USER_ID = addUser(USER_NAME_1);
        /** @type {number} */
        const USER_ID_2 = addUser(USER_NAME_2);
        /** @type {string} */
        const CHAT_NAME = "testChat3";
        /** @type {number} */
        const CHAT_ID = addChat(CHAT_NAME, [USER_ID, USER_ID_2]);
        /** @type {string} */
        const MESSAGE_TEXT = "msg1";


        describe("Создает сообщение и возвращает его id, если:", () => {
            it("1) Указанный чат существует;\n" +
                "2) Указанный пользователь(автор) существует;\n" +
                "3) Сообщение не является пустым", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/add")
                    .type("json")
                    .send({
                        "chat": CHAT_ID, "author": USER_ID, "text": MESSAGE_TEXT
                    }).then(function (err, res) {
                    expect(err).to.be.null;

                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    /** @type {number} */
                    const messageId = JSON.parse(res.body).id;
                    expect(messageId).is.a("number");
                    done();
                });
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            /** @type {number} */
            const NOT_EXIST_CHAT_ID = -1;
            /** @type {number} */
            const NOT_EXIST_USER = -1;
            it("Указанного чата не существует", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/add")
                    .type("json")
                    .send({
                        "chat": NOT_EXIST_CHAT_ID, "author": USER_ID, "text": MESSAGE_TEXT
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "Chat with id=${NOT_EXIST_CHAT_ID} not exist."
                        );
                        done();
                    });
                })
            it("Указанного пользователя не существует", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/add")
                    .type("json")
                    .send({
                        "chat": CHAT_ID, "author": NOT_EXIST_USER, "text": MESSAGE_TEXT
                    }).then(function (err, res) {
                    expect(err).to.be.null;

                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(JSON.parse(res.body).errorMessage).is.eq(
                        "User with id=${NOT_EXIST_USER} not exist."
                    );
                    done();
                });
            })
            it("Сообщение пустое", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/add")
                    .type("json")
                    .send({
                        "chat": CHAT_ID, "author": USER_ID, "text": ""
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "User with id=${NOT_EXIST_USER} try send empty message."
                        );
                        done();
                    });
            })
            it("Если содержится несколько ошибок, указываются все", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/add")
                    .type("json")
                    .send({
                        "chat": NOT_EXIST_CHAT_ID, "author": NOT_EXIST_USER, "text": ""
                    }).then(function (err, res) {
                    expect(err).to.be.null;

                    expect(res).to.have.status(500);
                    expect(res).to.be.json;
                    expect(JSON.parse(res.body).errorMessage).is.eq(
                        "Chat with id=${NOT_EXIST_CHAT_ID} not exist." +
                        "User with id=${NOT_EXIST_USER} not exist." +
                        "User with id=${NOT_EXIST_USER} try send empty message."
                    );
                    done();
                });
            });
        })
        deleteUser(USER_NAME_1);
        deleteUser(USER_NAME_2);
        deleteChat(CHAT_ID);
    })

    /**
     *
     * @param {JSON} jsonElementElement
     */
    function checkChatListElementStructure(jsonElementElement) {
        expect(jsonElementElement).to.have.property("id");
        expect(jsonElementElement.id).to.be.a("number");
        expect(jsonElementElement).to.have.property("name");
        expect(jsonElementElement.name).to.be.a("string");
        expect(jsonElementElement).to.have.property("users");
        expect(jsonElementElement.users).to.be.a("Array");
        expect(jsonElementElement).to.have.property("created_at");
        expect(jsonElementElement.created_at).to.be.a("string");
    }

    describe("Получить список чатов конкретного пользователя", () => {
        /** @type {string} */
        const USER_NAME_1 = "test6";
        /** @type {string} */
        const USER_NAME_2 = "test7";
        /** @type {string} */
        const USER_NAME_3 = "test8";
        /** @type {number} */
        const USER_ID = addUser(USER_NAME_1);
        /** @type {number} */
        const USER_ID_2 = addUser(USER_NAME_2);
        /** @type {number} */
        const USER_ID_3 = addUser(USER_NAME_3);
        /** @type {string} */
        const CHAT_NAME = "testChat5";
        /** @type {number} */
        const CHAT_ID_1 = addChat(CHAT_NAME, [USER_ID, USER_ID_2]);
        /** @type {number} */
        const CHAT_ID_2 = addChat(CHAT_NAME, [USER_ID, USER_ID_3]);
        describe("Возвращает cписок всех чатов со всеми полями, отсортированный " +
            "по времени создания последнего сообщения в чате (от позднего к раннему)," +
            " если", () => {
            it("Указанный пользователь существует", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/get")
                    .type("json")
                    .send({
                        "user": USER_ID
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        /** @type {JSON} */
                        const json = JSON.parse(res.body);
                        expect(json).to.have.property("chatList");
                        expect(json["chatList"]).is.a("Array");
                        checkChatListElementStructure(json["chatList"][0]);
                        checkChatListElementStructure(json["chatList"][1]);
                        expect(json["chatList"][0].id).is.eq(CHAT_ID_1);
                        expect(json["chatList"][1].id).is.eq(CHAT_ID_2);
                        done();
                    });
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного пользователя не существует", (done) => {
                /** @type {number} */
                const NOT_EXIST_USER = -1;
                chai.request(SERVER_ADDRESS)
                    .post("chats/get")
                    .type("json")
                    .send({
                        "user": NOT_EXIST_USER
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "User with id=${NOT_EXIST_USER} not exist."
                        );
                        done();
                    });
            })
        })
        deleteUser(USER_NAME_1);
        deleteUser(USER_NAME_2);
        deleteUser(USER_NAME_3);
        deleteChat(CHAT_ID_1);
        deleteChat(CHAT_ID_2);
    })
    describe("Получить список сообщений в конкретном чате", () => {
        /**
         * @param {number} chatId
         * @param {number} userId
         * @param {string} message
         * @return {number}
         */
        function addMessage(chatId, userId, message) {
            /** @type {number} */
            let result = 0;
            chai.request(SERVER_ADDRESS)
                .post("chats/messages/add")
                .type("json")
                .send({
                    "chat": chatId, "author": userId, "text": message
                }).then(function (err, res) {
                    result = JSON.parse(res.body).id;
                });
            return result;
        }

        /**
         * @param {number} id
         */
        function deleteMessage(id) {
            chai.request(SERVER_ADDRESS)
                .get("chats/messages/delete")
                .type("json")
                .send({
                    "id": id
                }).then(function (err, res) {
                    expect(res).to.have.status(200);
                });
        }
        /** @type {string} */
        const USER_NAME_1 = "test9";
        /** @type {string} */
        const USER_NAME_2 = "test10";
        /** @type {number} */
        const USER_ID = addUser(USER_NAME_1);
        /** @type {number} */
        const USER_ID_2 = addUser(USER_NAME_2);
        /** @type {string} */
        const CHAT_NAME = "testChat7";
        /** @type {number} */
        const CHAT_ID = addChat(CHAT_NAME, [USER_ID, USER_ID_2]);
        /** @type {string} */
        const MESSAGE_TEXT_1 = "msg1";
        /** @type {string} */
        const MESSAGE_TEXT_2 = "msg2";
        /** @type {number} */
        const MESSAGE_ID_1 = addMessage(CHAT_ID, USER_ID, MESSAGE_TEXT_1);
        /** @type {number} */
        const MESSAGE_ID_2 = addMessage(CHAT_ID, USER_ID, MESSAGE_TEXT_2);
        describe("Возвращает список всех сообщений чата со всеми полями, " +
            "отсортированный по времени создания сообщения (от раннего к " +
            "позднему), если", () => {
            it("Указанный чат существует", (done) => {
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/get")
                    .type("json")
                    .send({
                        "chat": CHAT_ID
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        /** @type {JSON} */
                        const json = JSON.parse(res.body);
                        expect(json).to.have.property("chatList");
                        expect(json["chatList"]).is.a("Array");
                        checkChatListElementStructure(json["chatList"][0]);
                        checkChatListElementStructure(json["chatList"][1]);
                        expect(json["chatList"][0].id).is.eq(CHAT_ID_1);
                        expect(json["chatList"][1].id).is.eq(CHAT_ID_2);
                        done();
                    });
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного чата не существует", (done) => {
                /** @type {number} */
                const NOT_EXIST_CHAT = -1;
                chai.request(SERVER_ADDRESS)
                    .post("chats/messages/get")
                    .type("json")
                    .send({
                        "chat": NOT_EXIST_CHAT
                    }).then(function (err, res) {
                        expect(err).to.be.null;

                        expect(res).to.have.status(500);
                        expect(res).to.be.json;
                        expect(JSON.parse(res.body).errorMessage).is.eq(
                            "Chat with id=${NOT_EXIST_CHAT} not exist."
                        );
                        done();
                    });
            })
        })
        deleteMessage(MESSAGE_ID_1);
        deleteMessage(MESSAGE_ID_2);
        deleteUser(USER_NAME_1);
        deleteUser(USER_NAME_2);
        deleteChat(CHAT_ID);
    })
})