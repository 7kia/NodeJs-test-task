import {expect} from 'chai';
import {DomainCoreBuilder} from "../../chat-server/domain-core/domain-core-builder";
import {DatabaseManagerBuilderDirector} from "../../chat-server/database/database-manager-builder-director";

describe("Класс DomainCoreBuilder.", async () => {
    before(async () => {
        /** @type {DatabaseManagerBuilderDirector} */
        const databaseManagerDirector = new DatabaseManagerBuilderDirector();
        /** @private {DomainCoreBuilder} */
        this.builder = new DomainCoreBuilder(
            await databaseManagerDirector.createDatabaseManager()
        );
    })
    describe("Создает Rules.", () => {
        describe("Создает UserRequestRules.", () => {
            it("UserRequestRules содержит в себе UserDatabaseManager", () => {
                /** @type {UserRequestRules} */
                const rules = this.builder.createUserRules();
                expect(rules).is.not.null;
                expect(rules).have.property("userRepository");
            })
        })
        describe("Создает ChatRequestRules.", () => {
            it("ChatAggregate содержит в себе ChatRepository и MessageRepository", () => {
                /** @type {ChatRequestRules} */
                const rules = this.builder.createChatRules();
                expect(rules).is.not.null;
                expect(rules).have.property("chatRepository");
                expect(rules).have.property("messageRepository");
            })
        })
        it("UserRequestRules содержит в себе UserRequestRules и ChatRequestRules", () => {
            /** @type {UserRequestRules} */
            const userRules = this.builder.createUserRules();
            /** @type {ChatRequestRules} */
            const chatRules = this.builder.createChatRules();
            /** @type {Rules} */
            const rules = this.builder.createRules(userRules, chatRules);

            expect(rules).is.not.null;
            expect(rules).have.property("userRequestRules");
            expect(rules).have.property("chatRequestRules");
        })
    })
    describe("Создает Strategies.", () => {
        describe("Создает UserRequestStrategies.", () => {
            it("UserRequestStrategies содержит в себе UserRepository", () => {
                /** @type {UserRequestStrategies} */
                const strategies = this.builder.createUserStrategies();
                expect(strategies).is.not.null;
                expect(strategies).have.property("userRepository");
            })
        })
        describe("Создает ChatRequestStrategies.", () => {
            it("ChatRequestStrategies содержит в себе ChatRepository и MessageRepository", () => {
                /** @type {ChatRequestStrategies} */
                const strategies = this.builder.createChatStrategies();
                expect(strategies).is.not.null;
                expect(strategies).have.property("chatRepository");
                expect(strategies).have.property("messageRepository");
            })
        })
        it("Strategies содержит в себе UserRequestStrategies и ChatRequestStrategies", () => {
            /** @type {UserRequestStrategies} */
            const userStrategies = this.builder.createUserStrategies();
            /** @type {ChatRequestStrategies} */
            const chatStrategies = this.builder.createChatStrategies();
            /** @type {Strategies} */
            const strategies = this.builder.createStrategies(userStrategies, chatStrategies);

            expect(strategies).is.not.null;
            expect(strategies).have.property("userRequestStrategies");
            expect(strategies).have.property("chatRequestStrategies");
        })
    })
    it("Собирает DomainCore из Rules и Strategies", () => {
        /** @type {UserRequestStrategies} */
        const userStrategies = this.builder.createUserStrategies();
        /** @type {ChatRequestStrategies} */
        const chatStrategies = this.builder.createChatStrategies();
        /** @type {Strategies} */
        const strategies = this.builder.createStrategies(userStrategies, chatStrategies);

        /** @type {UserRequestRules} */
        const userRules = this.builder.createUserRules();
        /** @type {ChatRequestRules} */
        const chatRules = this.builder.createChatRules();
        /** @type {Rules} */
        const rules = this.builder.createRules(userRules, chatRules);

        /** @type {DomainCore} */
        const core = this.builder.buildDomainCore(rules, strategies);

        expect(core).is.not.null;
        expect(core).have.property("rules");
        expect(core).have.property("strategies");
    })

})