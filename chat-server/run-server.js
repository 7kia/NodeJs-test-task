import express from 'express'
import {router as chatRouter} from './chat-router';
const app = express();

app.use("/chats", chatRouter);

const port = 9000;
app.listen(port, () => {
    console.log(`Chat server listening at http://localhost:${port}`);
})

