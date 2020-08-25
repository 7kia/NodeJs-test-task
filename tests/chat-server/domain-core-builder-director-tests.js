import {expect} from 'chai';
import {DomainCoreBuilderDirector} from "../../chat-server/domain-core/domain-core-builder-director";
import {UserRequestStrategies} from "../../chat-server/domain-core/user-request-strategies";
import {ChatRequestStrategies} from "../../chat-server/domain-core/chat-request-strategies";
import {DatabaseManager} from "../../chat-server/database/database-manager";
import {DomainCore} from "../../chat-server/domain-core/domain-core";
import {ChatRequestRules} from "../../chat-server/domain-core/chat-request-rules";
import {UserRequestRules} from "../../chat-server/domain-core/user-request-rules";

describe("Класс DomainCoreBuilderDirector.", () => {
    /** @type {DomainCoreBuilderDirector} */
    const director = new DomainCoreBuilderDirector(new DatabaseManager());
    describe("Создает DomainCore.", () => {
        /** @type {DomainCore} */
        const core = director.createDomainCore();
        it("Хранит в себе UserRequestStrategies.", () => {
            expect(core.getUserRequestStrategies()).to.be.an.instanceof(UserRequestStrategies);
        })
        it("Хранит в себе ChatRequestStrategies.", () => {
            expect(core.getChatRequestStrategies()).to.be.an.instanceof(ChatRequestStrategies);
        })
        it("Хранит в себе UserRequestRules.", () => {
            expect(core.getUserRequestRules()).to.be.an.instanceof(UserRequestRules);
        })
        it("Хранит в себе ChatRequestRules.", () => {
            expect(core.getChatRequestRules()).to.be.an.instanceof(ChatRequestRules);
        })
    })

})