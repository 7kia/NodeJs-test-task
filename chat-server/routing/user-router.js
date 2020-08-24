import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";

/** @type {ChatServerBuilderDirector} */
const chatServerBuilderDirector = new ChatServerBuilderDirector();
/** @type {UserRouterController} */
let controller = chatServerBuilderDirector.createUserRouterController();
let router = express.Router();

router.post('/add', function(req, res) {
    controller.add(req, res);
});

router.get('/delete', function(req, res) {
    controller.delete(req, res);
});

export {router};