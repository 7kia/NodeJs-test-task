import express from 'express';
import {chatRouter} from './routing/chat-router';
import {userRouter} from './routing/user-router';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use("/chats", chatRouter);
app.use("/users", userRouter);

/** @type {boolean} */
const isProduction = (process.env.NODE_ENV === 'production');
/** @type {number} */
const port = isProduction ? 9000 : 9001;
app.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
})

