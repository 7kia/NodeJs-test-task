import express from 'express';
import {router as chatRouter} from './routing/chat-router';
import {router as userRouter} from './routing/user-router';
const app = express();

app.use("/chats", chatRouter);
app.use("/users", userRouter);

const port = 9000;
app.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
})

