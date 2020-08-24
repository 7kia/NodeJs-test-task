import {expect} from 'chai';
import {DomainCoreBuilder} from "../../chat-server/domain-core/domain-core-builder";
import {DatabaseManager} from "../../chat-server/database/database-manager";

describe("Класс DomainCoreBuilder.", () => {
    /** @type {DomainCoreBuilder} */
    const builder = new DomainCoreBuilder(new DatabaseManager());
    describe("Создает UserAggregate.", () => {
        it("UserAggregate содержит в себе UserDatabaseManager", () => {
            /** @type {UserAggregate} */
            const manager = builder.createUserAggregate();
            expect(manager).is.not.null;
            expect(manager).have.property("userDatabaseManager");
        })
    })
    describe("Создает ChatAggregate.", () => {
        it("ChatAggregate содержит в себе ChatDatabaseManager", () => {
            /** @type {ChatAggregate} */
            const manager = builder.createChatAggregate();
            expect(manager).is.not.null;
            expect(manager).have.property("chatDatabaseManager");
            expect(manager).have.property("messageRepository");
        })
    })
    it("Собирает DomainCore из UserAggregate и ChatAggregate", () => {
        /** @type {UserAggregate} */
        const userAggregate = builder.createUserAggregate();
        /** @type {ChatAggregate} */
        const chatAggregate = builder.createChatAggregate();
        /** @type {DomainCore} */
        const core = builder.buildDomainCore(userAggregate, chatAggregate);

        expect(core).is.not.null;
        expect(core).have.property("userAggregate");
        expect(core).have.property("chatAggregate");
    })

})