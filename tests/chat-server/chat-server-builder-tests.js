import {expect} from 'chai';
import {ChatServerBuilder} from '../../chat-server/routing/chat-server-builder'
import {DomainCore} from '../../chat-server/domain-core/domain-core'

describe("Класс ChatServerBuilder. " +
    "Создает все компоненты контейнера \"Чат-сервер\"", () => {
    /** @type {ChatServerBuilder} */
    let chatServerBuilder  = new ChatServerBuilder();
    it("Создает DomainCore.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        expect(domainCore).is.not.null;
    })
    it("Создает UserRouterController, внутри которого лежит domainCore.userAggregate.", () => {
        /** @type {UserRouterController} */
        const controller = chatServerBuilder.createUserRouterController();
        expect(controller).is.not.null;
        expect(controller.getUserAggregate()).is.not.null;
    })
    it("Создает ChatRouterController, внутри которого лежит domainCore.chatAggregate.", () => {
        /** @type {ChatRouterController} */
        const controller = chatServerBuilder.createChatRouterController();
        expect(controller).is.not.null;
        expect(controller.getChatAggregate()).is.not.null;
    })
})