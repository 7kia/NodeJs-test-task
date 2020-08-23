import express from 'express';
let router = express.Router();

router.get('/add', function(req, res) {
    res.send('User Add tests');
});

router.get('/delete', function(req, res) {
    res.send('User Delete tests');
});

export {router};