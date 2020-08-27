import {expect} from 'chai';
import {DomainCoreBuilderDirector} from "../../chat-server/domain-core/domain-core-builder-director";
import {UserRequestStrategies} from "../../chat-server/domain-core/user-request-strategies";
import {ChatRequestStrategies} from "../../chat-server/domain-core/chat-request-strategies";
import {DomainCore} from "../../chat-server/domain-core/domain-core";
import {ChatRequestRules} from "../../chat-server/domain-core/chat-request-rules";
import {UserRequestRules} from "../../chat-server/domain-core/user-request-rules";
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс DomainCoreBuilderDirector.", () => {
    /** @type {DomainCoreBuilderDirector} */
    const director = new DomainCoreBuilderDirector(new DatabaseManagerBuilderDirector().createDatabaseManager());
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