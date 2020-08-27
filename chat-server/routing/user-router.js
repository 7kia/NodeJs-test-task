import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";
import {PromiseWrap} from "../helper-modules/promise-wrap";
import {DatabaseManagerBuilderDirector} from "../database/database-manager-builder-director";

/** @type {Router} */
let userRouter = express.Router();

async function func() {
    /** @type {DatabaseManagerBuilderDirector} */
    const databaseManagerBuilderDirector = new DatabaseManagerBuilderDirector();
    /** @type {DatabaseManager} */
    const databaseManager = await databaseManagerBuilderDirector.createDatabaseManager();
    /** @type {ChatServerBuilderDirector} */
    const chatServerBuilderDirector = new ChatServerBuilderDirector(
        databaseManager
    );
    /** @type {UserRouterController} */
    let controller = chatServerBuilderDirector.createUserRouterController();

    userRouter.post('/add', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.add(req, res);
        }, true);
    });

    userRouter.get('/delete', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.delete(req, res);
        }, true);
    });
}
func().then(
    function(p1){return undefined;},
    function(p1){return undefined;},
    undefined
);

export {userRouter};