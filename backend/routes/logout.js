const express = require('express');
const router = express.Router();

router.post('/', (request, response) => {
    request.session.destroy(error => {
        if (error) return response.status(400).send('Unable to log out');

        response.clearCookie('id');
        response.send('Logout successful');
    });
});

module.exports = router;
