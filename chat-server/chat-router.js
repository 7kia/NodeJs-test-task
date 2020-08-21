import express from 'express';
let router = express.Router();

// define the about route
router.get('/add', function(req, res) {
    res.send('Chat Add tests');
});

export {router};