import * as chai from 'chai';
import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {User} from "../../../chat-server/database/entity/user";
chai.use(require("chai-as-promised"));

describe("Класс UserRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу User.", () => {
    /** @type {Client} */
    const connection = new DatabaseManagerBuilder().createConnection();
    /** @type {UserRepository} */
    const repository = new RepositoriesFactory().createUserRepository(connection);
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await repository.createTableIfNotExist()}).to.not.throw();
    })
    /** @type {string} */
    const userName = "UserRepositoryAddTest";
    /**
     * Созданный пользователь удаляется в следующем тесте, в тесте на удаление
     */
    describe("Может добавить пользователя с указанным именем", () => {
        it("Если пользователь добавлен успешно, то возвращает " +
            "его id.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest";
            expect(await repository.add(userName))
                .is.a("number")
                .is.greaterThan(0);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            const func = async () => {
                await repository.add(userName);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
    })
    describe("Может удалить пользователя с указанным именем", () => {
        it("Если успешно, то возвращает true.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest";
            expect(await repository.delete(userName))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {Function} */
            const func = async () => {
                await repository.delete(userName);
            };
            await expect(func()).to.be.rejectedWith(Error);
        })
    })
    describe("Может найти пользователя с указанными полями", () => {
        it("Если успешно, то возвращает пользователь.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest2";
            /** @type {number} */
            const userId = await repository.add(userName);

            /** @type {User} */
            const user = await repository.find({"userName": userName, "id": userId});
            expect(user).is.instanceOf(User);
            expect(user.id).is.eq(userId);
            expect(user.username).is.eq(userName);

            await repository.delete(userName);
        })
        it("Если не удалось, то null.", async () => {
            await expect(await repository.find({"userName": null}))
                .to.be.null;
        })
    })
})