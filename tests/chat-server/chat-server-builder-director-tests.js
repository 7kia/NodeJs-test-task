import {expect} from 'chai';
import {ChatServerBuilderDirector} from '../../chat-server/routing/chat-server-builder-director';
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс ChatServerBuilderDirector.", async () => {
    /** @type {DatabaseManagerBuilderDirector} */
    const databaseManagerBuilderDirector = new DatabaseManagerBuilderDirector();
    /** @type {ChatServerBuilderDirector} */
    const director = new ChatServerBuilderDirector(await databaseManagerBuilderDirector.createDatabaseManager());
    it("Создает UserRouterController. Внутри которого находится все неоходимое " +
        "для функционирования чат-сервера.", () => {
        /** @type {UserRouterController} */
        const controller = director.createUserRouterController();
        expect(controller).is.not.null;
    })
    it("Создает ChatRouterController. Внутри которого находится все неоходимое " +
        "для функционирования чат-сервера.", () => {
        /** @type {ChatRouterController} */
        const controller = director.createChatRouterController();
        expect(controller).is.not.null;
    })
})