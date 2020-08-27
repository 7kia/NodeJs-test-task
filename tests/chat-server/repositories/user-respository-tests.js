import {expect} from 'chai';
import {RepositoriesFactory} from "../../../chat-server/database/repositories-factory";
import {DatabaseManagerBuilder} from "../../../chat-server/database/database-manager-builder";
import {User} from "../../../chat-server/database/entity/user";

describe("Класс UserRepository. Отвечает за извлечение и внесение данных " +
    "в таблицу User.", () => {
    const connection = new DatabaseManagerBuilder().createConnection();
    /** @type {UserRepository} */
    const repository = new RepositoriesFactory().createUserRepository(connection);
    it("Создает таблицу, если её нет.", async () => {
        expect(async () => {await repository.createTableIfNotExist()}).to.not.throw();
    })
    describe("Может добавить пользователя с указанным именем", () => {
        const userName = "UserRepositoryAddTest";
        it("Если успешно, то возвращает его id.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest";
            expect(await repository.add(userName))
                .is.a("number")
                .is.greaterThan(0);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            expect(await repository.add(userName))
                .to.throw("User not add");
        })
    })
    describe("Может удалить пользователя с указанным именем", () => {
        const userName = "UserRepositoryAddTest";
        it("Если успешно, то возвращает true.", async () => {
            /** @type {string} */
            const userName = "UserRepositoryAddTest";
            expect(await repository.delete(userName))
                .is.a("boolean")
                .is.eq(true);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            expect(await repository.delete(userName))
                .to.throw("User not delete");
        })
    })
    describe("Может найти пользователя с указанными полями", async () => {
        /** @type {string} */
        const userName = "UserRepositoryAddTest2";
        /** @type {number} */
        const userId = await repository.add(userName);
        it("Если успешно, то возвращает true.", async () => {
            /** @type {User} */
            const user = await repository.find({"userName": userName, "id": userId});
            expect(user).is.instanceOf(User);
            expect(user.id).is.eq(userId);
            expect(user.username).is.eq(userName);
        })
        it("Если не удалось, то бросает исключение.", async () => {
            /** @type {string} */
            expect(await repository.find({"userName": null}))
                .to.throw("User not delete");
        })
    })
})