import {expect} from 'chai';
import chai from "chai";
import chaiHttp from "chai-http";
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
            .post("users/delete")
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
                .post("users/delete")
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
                .post("users/delete")
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

    describe("Создать новый чат между пользователями", () => {
        /** @type {number} */
        const USER_ID_1 = addUser("test1");
        /** @type {number} */
        const USER_ID_2 = addUser("test2");
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


        function deleteChat(chatId) {
            chai.request(SERVER_ADDRESS)
                .post("chats/add")
                .type("json")
                .send({
                    "id": chatId
                });
        }
        describe("Чат не создается и возвращается сообщение с ошибкой, если", () => {
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
    })
    describe("Отправить сообщение в чат от лица пользователя", () => {
        describe("Создает сообщение и возвращает его id, если", () => {
            it("Указанный чат существует", () => {
                expect(true).is.eq(false);
            })
            it("Указанный пользователь(автор) существует", () => {
                expect(true).is.eq(false);
            })
            it("Сообщение не является пустым", () => {
                expect(true).is.eq(false);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного чата не существует", () => {
                expect(true).is.eq(false);
            })
            it("Указанного пользователя не существует", () => {
                expect(true).is.eq(false);
            })
            it("Сообщение пустое", () => {
                expect(true).is.eq(false);
            })
            it("Если содержится несколько ошибок, указываются все", () => {
                expect(true).is.eq(false);
            })
        })
    })
    describe("Получить список чатов конкретного пользователя", () => {
        describe("Возвращает cписок всех чатов со всеми полями, отсортированный " +
            "по времени создания последнего сообщения в чате (от позднего к раннему)," +
            " если", () => {
            it("Указанный пользователь существует", () => {
                expect(true).is.eq(false);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного пользователя не существует", () => {
                expect(true).is.eq(false);
            })
        })
    })
    describe("Получить список сообщений в конкретном чате", () => {
        describe("Возвращает список всех сообщений чата со всеми полями, " +
            "отсортированный по времени создания сообщения (от раннего к " +
            "позднему), если", () => {
            it("Указанный чат существует", () => {
                expect(true).is.eq(false);
            })
        })
        describe("Возвращает сообщение с ошибкой, если", () => {
            it("Указанного чата не существует", () => {
                expect(true).is.eq(false);
            })
        })
    })
})