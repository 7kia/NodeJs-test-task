import {expect} from 'chai';
import {ChatServerBuilderDirector} from '../../chat-server/routing/chat-server-builder-director';
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс ChatServerBuilderDirector.", async () => {
    before(async () => {
        /** @type {DatabaseManagerBuilderDirector} */
        const databaseManagerDirector = new DatabaseManagerBuilderDirector();
        /** @private {ChatServerBuilderDirector} */
        this.director = new ChatServerBuilderDirector(
            await databaseManagerDirector.createDatabaseManager()
        );
    })
    it("Создает UserRouterController. Внутри которого находится все неоходимое " +
        "для функционирования чат-сервера.", () => {
        /** @type {UserRouterController} */
        const controller = this.director.createUserRouterController();
        expect(controller).is.not.null;
    })
    it("Создает ChatRouterController. Внутри которого находится все неоходимое " +
        "для функционирования чат-сервера.", () => {
        /** @type {ChatRouterController} */
        const controller = this.director.createChatRouterController();
        expect(controller).is.not.null;
    })
})