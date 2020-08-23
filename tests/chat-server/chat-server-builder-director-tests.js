import {expect} from 'chai';
import {ChatServerBuilderDirector} from '../../chat-server/routing/chat-server-builder-director';

describe("Класс ChatServerBuilderDirector.", () => {
    /** @type {ChatServerBuilderDirector} */
    const director = new ChatServerBuilderDirector();
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