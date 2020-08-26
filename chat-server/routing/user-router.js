import express from 'express';
import {ChatServerBuilderDirector} from "./chat-server-builder-director";
import {PromiseWrap} from "../promise-wrap";

/** @type {ChatServerBuilderDirector} */
const chatServerBuilderDirector = new ChatServerBuilderDirector();
/** @type {UserRouterController} */
let controller = chatServerBuilderDirector.createUserRouterController();
/** @type {Router} */
let userRouter = express.Router();

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

export {userRouter};