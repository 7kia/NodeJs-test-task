import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";
import {PromiseWrap} from "../helper-modules/promise-wrap";
import {DatabaseManagerBuilderDirector} from "../database/database-manager-builder-director";

/** @type {Router} */
let chatRouter = express.Router();
async function initRoute() {
    /** @type {DatabaseManagerBuilderDirector} */
    const databaseManagerBuilderDirector = new DatabaseManagerBuilderDirector();
    /** @type {DatabaseManager} */
    const databaseManager = await databaseManagerBuilderDirector.createDatabaseManager(
        process.env.NODE_ENV === 'production'
    );
    /** @type {ChatServerBuilderDirector} */
    const chatServerBuilderDirector = new ChatServerBuilderDirector(
        databaseManager
    );
    /** @type {ChatRouterController} */
    let controller = chatServerBuilderDirector.createChatRouterController();

    chatRouter.post('/add', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            return await controller.add(req, res);
        }, true);
    });

    chatRouter.post('/delete', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            await controller.delete(req, res);
        }, true);
    });

    chatRouter.post('/messages/add', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            return await controller.addMessageToChat(req, res);
        }, true);
    });
    chatRouter.post('/messages/delete', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            await controller.deleteMessageToChat(req, res);
        }, true);
    });

    chatRouter.post('/get', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            return await controller.getListForUser(req, res);
        }, true);
    });
    chatRouter.post('/messages/get', async function(req, res) {
        return await PromiseWrap.asyncWrap(async function() {
            return await controller.getMessagesFromChat(req, res);
        }, true);
    });
}
initRoute().then(
    function(){return undefined;},
    function(){return undefined;},
    undefined
);
export {chatRouter};