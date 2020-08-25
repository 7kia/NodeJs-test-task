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
    it("Создает UserRouterController, внутри которого лежит UserRequestRules " +
        "и UserRequestStrategies.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        /** @type {UserRouterController} */
        const controller = chatServerBuilder.createUserRouterController(
            domainCore.getUserRequestRules(),
            domainCore.getUserRequestStrategies()
        );
        expect(controller).is.not.null;
        expect(controller).to.have.property("rules");
        expect(controller).to.have.property("strategies");
    })
    it("Создает ChatRouterController, внутри которого лежит domainCore.chatAggregate.", () => {
        /** @type {DomainCore} */
        const domainCore = chatServerBuilder.createDomainCore();
        /** @type {ChatRouterController} */
        const controller = chatServerBuilder.createChatRouterController(
            domainCore.getChatRequestRules(),
            domainCore.getChatRequestStrategies(),
        );
        expect(controller).is.not.null;
        expect(controller).to.have.property("rules");
        expect(controller).to.have.property("strategies");
    })
})