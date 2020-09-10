import {expect} from 'chai';
import {ChatServerBuilder} from '../../chat-server/routing/chat-server-builder'
import {DomainCore} from '../../chat-server/domain-core/domain-core'
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс ChatServerBuilder. " +
    "Создает все компоненты контейнера \"Чат-сервер\"", () => {
    before(async () => {
        /** @type {DatabaseManagerBuilderDirector} */
        const databaseManagerDirector = new DatabaseManagerBuilderDirector();
        /** @private {ChatServerBuilder} */
        this.chatServerBuilder  = new ChatServerBuilder(
            await databaseManagerDirector.createDatabaseManager()
        );
    })

    it("Создает DomainCore.", () => {
        /** @type {DomainCore} */
        const domainCore = this.chatServerBuilder.createDomainCore();
        expect(domainCore).is.not.null;
    })
    it("Создает UserRouterController, внутри которого лежит UserRequestRules " +
        "и UserRequestStrategies.", () => {
        /** @type {DomainCore} */
        const domainCore = this.chatServerBuilder.createDomainCore();
        /** @type {UserRouterController} */
        const controller = this.chatServerBuilder.createUserRouterController(
            domainCore.getUserRequestRules(),
            domainCore.getUserRequestStrategies()
        );
        expect(controller).is.not.null;
        expect(controller).to.have.property("rules");
        expect(controller).to.have.property("strategies");
    })
    it("Создает ChatRouterController, внутри которого лежит domainCore.chatAggregate.", () => {
        /** @type {DomainCore} */
        const domainCore = this.chatServerBuilder.createDomainCore();
        /** @type {ChatRouterController} */
        const controller = this.chatServerBuilder.createChatRouterController(
            domainCore.getChatRequestRules(),
            domainCore.getChatRequestStrategies(),
        );
        expect(controller).is.not.null;
        expect(controller).to.have.property("rules");
        expect(controller).to.have.property("strategies");
    })
})