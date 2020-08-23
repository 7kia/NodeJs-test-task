import {expect} from 'chai';

describe("Класс ChatServerBuilder. " +
    "Создает все компоненты контейнера \"Чат-сервер\"", () => {
    describe("Создает DomainCore.", () => {
        it("Создает DatabaseManager.", () => {
            expect(true).is.eq(false);
        })
        it("DomainCore содержит в себе DatabaseManager", () => {
            expect(true).is.eq(false);
        })
    })
    it("Создает ServerApiController, внутри которого лежит DomainCore.", () => {
        expect(true).is.eq(false);
    })
})