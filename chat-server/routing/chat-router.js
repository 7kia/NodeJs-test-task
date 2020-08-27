import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";
import {PromiseWrap} from "../helper-modules/promise-wrap";
import {DatabaseManagerBuilderDirector} from "../database/database-manager-builder-director";

/** @type {Router} */
let chatRouter = express.Router();
async function func() {
    /** @type {DatabaseManagerBuilderDirector} */
    const databaseManagerBuilderDirector = new DatabaseManagerBuilderDirector();
    /** @type {DatabaseManager} */
    const databaseManager = await databaseManagerBuilderDirector.createDatabaseManager();
    /** @type {ChatServerBuilderDirector} */
    const chatServerBuilderDirector = new ChatServerBuilderDirector(
        databaseManager
    );
    /** @type {ChatRouterController} */
    let controller = chatServerBuilderDirector.createChatRouterController();


    chatRouter.post('/add', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.add(req, res);
        }, true);
    });

    chatRouter.get('/delete', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.delete(req, res);
        }, true);
    });

    chatRouter.post('/messages/add', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.addMessageToChat(req, res);
        }, true);
    });
    chatRouter.get('/messages/delete', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.deleteMessageToChat(req, res);
        }, true);
    });

    chatRouter.post('/get', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.getListForUser(req, res);
        }, true);
    });
    chatRouter.post('/messages/get', async function(req, res) {
        await PromiseWrap.asyncWrap(async function() {
            await controller.getMessagesFromChat(req, res);
        }, true);
    });
}
func().then(
    function(p1){return undefined;},
    function(p1){return undefined;},
    undefined
);
export {chatRouter};