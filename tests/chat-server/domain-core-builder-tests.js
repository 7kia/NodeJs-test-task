import {expect} from 'chai';
import {DomainCoreBuilder} from "../../chat-server/domain-core/domain-core-builder";
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс DomainCoreBuilder.", () => {
    /** @type {DomainCoreBuilder} */
    const builder = new DomainCoreBuilder(new DatabaseManagerBuilderDirector().createDatabaseManager());
    describe("Создает Rules.", () => {
        describe("Создает UserRequestRules.", () => {
            it("UserRequestRules содержит в себе UserDatabaseManager", () => {
                /** @type {UserRequestRules} */
                const rules = builder.createUserRules();
                expect(rules).is.not.null;
                expect(rules).have.property("userRepository");
            })
        })
        describe("Создает ChatRequestRules.", () => {
            it("ChatAggregate содержит в себе ChatRepository и MessageRepository", () => {
                /** @type {ChatRequestRules} */
                const rules = builder.createChatRules();
                expect(rules).is.not.null;
                expect(rules).have.property("chatRepository");
                expect(rules).have.property("messageRepository");
            })
        })
        it("UserRequestRules содержит в себе UserRequestRules и ChatRequestRules", () => {
            /** @type {UserRequestRules} */
            const userRules = builder.createUserRules();
            /** @type {ChatRequestRules} */
            const chatRules = builder.createChatRules();
            /** @type {Rules} */
            const rules = builder.createRules(userRules, chatRules);

            expect(rules).is.not.null;
            expect(rules).have.property("userRequestRules");
            expect(rules).have.property("chatRequestRules");
        })
    })
    describe("Создает Strategies.", () => {
        describe("Создает UserRequestStrategies.", () => {
            it("UserRequestStrategies содержит в себе UserRepository", () => {
                /** @type {UserRequestStrategies} */
                const strategies = builder.createUserStrategies();
                expect(strategies).is.not.null;
                expect(strategies).have.property("userRepository");
            })
        })
        describe("Создает ChatRequestStrategies.", () => {
            it("ChatRequestStrategies содержит в себе ChatRepository и MessageRepository", () => {
                /** @type {ChatRequestStrategies} */
                const strategies = builder.createChatStrategies();
                expect(strategies).is.not.null;
                expect(strategies).have.property("chatRepository");
                expect(strategies).have.property("messageRepository");
            })
        })
        it("Strategies содержит в себе UserRequestStrategies и ChatRequestStrategies", () => {
            /** @type {UserRequestStrategies} */
            const userStrategies = builder.createUserStrategies();
            /** @type {ChatRequestStrategies} */
            const chatStrategies = builder.createChatStrategies();
            /** @type {Strategies} */
            const strategies = builder.createStrategies(userStrategies, chatStrategies);

            expect(strategies).is.not.null;
            expect(strategies).have.property("userRequestStrategies");
            expect(strategies).have.property("chatRequestStrategies");
        })
    })
    it("Собирает DomainCore из Rules и Strategies", () => {
        /** @type {UserRequestStrategies} */
        const userStrategies = builder.createUserStrategies();
        /** @type {ChatRequestStrategies} */
        const chatStrategies = builder.createChatStrategies();
        /** @type {Strategies} */
        const strategies = builder.createStrategies(userStrategies, chatStrategies);

        /** @type {UserRequestRules} */
        const userRules = builder.createUserRules();
        /** @type {ChatRequestRules} */
        const chatRules = builder.createChatRules();
        /** @type {Rules} */
        const rules = builder.createRules(userRules, chatRules);

        /** @type {DomainCore} */
        const core = builder.buildDomainCore(rules, strategies);

        expect(core).is.not.null;
        expect(core).have.property("rules");
        expect(core).have.property("strategies");
    })

})