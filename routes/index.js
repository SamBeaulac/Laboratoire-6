/**
 * @file index.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Route pour la page d'accueil
 */

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

module.exports = router;