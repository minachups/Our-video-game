const express = require('express');
const app = express.Router();
const multer = require('multer');
const path = require('path');




app.get('/image/:id', (req, res) => {
    db.query('SELECT image FROM images WHERE id = ?', [req.params.id], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).send('Image non trouvée.');
        }

        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(results[0].image);
    });
});


module.exports = app;