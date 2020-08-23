import {expect} from 'chai';

describe("Класс ChatServerBuilder. " +
    "Создает все компоненты контейнера \"Чат-сервер\"", () => {
    it("Создает DomainCore.", () => {
        expect(true).is.eq(false);
    })
    it("Создает UserRouterController, внутри которого лежит domainCore.userAggregate.", () => {
        expect(true).is.eq(false);
    })
    it("Создает ChatRouterController, внутри которого лежит domainCore.chatAggregate.", () => {
        expect(true).is.eq(false);
    })
})