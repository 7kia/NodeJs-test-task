import {expect} from 'chai';
import {ChatServerBuilder} from '../../chat-server/routing/chat-server-builder'
import {DomainCore} from '../../chat-server/domain-core/domain-core'

describe("Класс ChatServerBuilder. " +
    "Создает все компоненты контейнера \"Чат-сервер\"", () => {
    /** @type {ChatServerBuilder} */
    const chatServerBuilder  = new ChatServerBuilder();
    it("Создает DomainCore.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        expect(domainCore).is.not.null;
    })
    it("Создает UserRouterController, внутри которого лежит domainCore.userAggregate.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        /** @type {UserRouterController} */
        const controller = chatServerBuilder.createUserRouterController(domainCore.getUserAggregate());
        expect(controller).is.not.null;
        expect(controller).to.have.property("userAggregate");
    })
    it("Создает ChatRouterController, внутри которого лежит domainCore.chatAggregate.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        /** @type {ChatRouterController} */
        const controller = chatServerBuilder.createChatRouterController(domainCore.getChatAggregate());
        expect(controller).is.not.null;
        expect(controller).to.have.property("chatAggregate");
    })
})