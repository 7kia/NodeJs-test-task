import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";

/** @type {ChatServerBuilderDirector} */
const chatServerBuilderDirector = new ChatServerBuilderDirector();
/** @type {ChatRouterController} */
let controller = chatServerBuilderDirector.createChatRouterController();
let router = express.Router();

router.post('/add', function(req, res) {
    controller.add(req, res);
});

router.get('/delete', function(req, res) {
    controller.delete(req, res);
});

router.post('/messages/add', function(req, res) {
    controller.addMessageToChat(req, res);
});
router.get('/messages/delete', function(req, res) {
    controller.deleteMessageToChat(req, res);
});

router.post('/get', function(req, res) {
    controller.getListForUser(req, res);
});
router.post('/messages/get', function(req, res) {
    controller.getMessagesFromChat(req, res);
});

export {router};