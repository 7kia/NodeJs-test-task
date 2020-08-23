import {expect} from 'chai';
import {DomainCoreBuilderDirector} from "../../chat-server/domain-core/domain-core-builder-director";
import {UserAggregate} from "../../chat-server/domain-core/user-aggregate";
import {ChatAggregate} from "../../chat-server/domain-core/chat-aggregate";
import {DatabaseManager} from "../../chat-server/database/database-manager";
import {DomainCore} from "../../chat-server/domain-core/domain-core";

describe("Класс DomainCoreBuilderDirector.", () => {
    /** @type {DomainCoreBuilderDirector} */
    const director = new DomainCoreBuilderDirector(new DatabaseManager());
    describe("Создает DomainCore.", () => {
        /** @type {DomainCore} */
        const core = director.createDomainCore();
        it("Хранит в себе UserAggregate.", () => {
            expect(core.getUserAggregate()).to.be.an.instanceof(UserAggregate);
        })
        it("Хранит в себе ChatAggregate.", () => {
            expect(core.getChatAggregate()).to.be.an.instanceof(ChatAggregate);
        })
    })

})