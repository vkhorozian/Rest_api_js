const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {
    res.send('we are on posts');
});

router.get('/specfic', (req, res) => {
    res.send('Specfic posts');
});

module.exports = router;





