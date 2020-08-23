import {expect} from 'chai';

describe("Основные API методы", () => {
    describe("Добавить нового пользователя", () => {
        it("Если такого пользователя нет, то он добавляется. " +
            "Возвращается id нового пользователя.", () => {
            expect(true).is.eq(false);
        })
        it("Если пользователь с указанным именем существует, то возвращается " +
            "сообщение о существовании пользователя и пользователь не добавляется", () => {
            expect(true).is.eq(false);
        })
    })
    describe("Создать новый чат между пользователями", () => {
        describe("Чат создается и возвращается id нового чата, если", () => {
            it("Указанные пользователи существуют", () => {
                expect(true).is.eq(false);
            })
            it("Не существует чата с указанными пользователями", () => {
                expect(true).is.eq(false);
            })
        })
        describe("Чат не создается и возвращается сообщение с ошибкой, если", () => {
            it("Хотя бы один из пользователей не существует", () => {
                expect(true).is.eq(false);
            })
            it("Существует чат с указанными пользователями", () => {
                expect(true).is.eq(false);
            })
            it("Если содержится несколько ошибок, указываются все", () => {
                expect(true).is.eq(false);
            })
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