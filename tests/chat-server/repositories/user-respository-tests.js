import * as chai from 'chai';
import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {User} from "../../../chat-server/database/entity/user";
chai.use(require("chai-as-promised"));

describe("Класс UserRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу User.", () => {
    before(async () => {
        /** @type {Client} */
        const connection = new DatabaseManagerBuilder().createConnection();
        /** @private {UserRepository} */
        this.repository = new RepositoriesFactory().createUserRepository(connection);
        await this.repository.createTableIfNotExist();
    })
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await this.repository.createTableIfNotExist()}).to.not.throw();
    })
    /**
     * Созданный пользователь удаляется в следующем тесте, в тесте на удаление
     */
    describe("Может добавить пользователя с указанным именем", () => {
        before(() => {
            /** @private {string} */
            this.userName = "UserRepositoryAddTest";
        })
        it("Если пользователь добавлен успешно, то возвращает " +
            "его id.", async () => {
            expect(await this.repository.add(this.userName))
                .is.a("number")
                .is.greaterThan(0);
        })

        after(async () => {
            await this.repository.delete(this.userName);
        })
    })
    describe("Может удалить пользователя с указанным именем", () => {
        it("Если успешно, то возвращает true.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest2";
            await this.repository.add(userName);
            expect(await this.repository.delete(userName))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await this.repository.delete("");
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
    })
    describe("Может найти пользователя с указанными полями", () => {
        it("Если успешно, то возвращает пользователь.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest3";
            /** @type {number} */
            const userId = await this.repository.add(userName);

            /** @type {User} */
            const user = await this.repository.find({"userName": userName, "id": userId});
            await this.repository.delete(userName);

            expect(user).is.instanceOf(User);
            expect(user.id).is.eq(userId);
            expect(user.username).is.eq(userName);
        })
        it("Если не удалось, то null.", async () => {
            await expect(await this.repository.find({"userName": null}))
                .to.be.null;
        })
    })
})