import express from 'express';
let router = express.Router();

router.get('/add', function(req, res) {
    res.send('Chat Add tests');
});

router.get('/delete', function(req, res) {
    res.send('Chat Delete tests');
});

export {router};