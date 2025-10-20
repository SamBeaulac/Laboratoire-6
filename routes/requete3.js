/**
 * @file requete3.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Route pour la requête 3
 */

const express = require('express');
const PaysG20 = require('../models/PaysG20');
const router = express.Router();

router.get('/', async function(req, res) {
    try 
    {
        const [rows] = await PaysG20.requete3();
        res.render('data', { title: 'Requête 3', data: rows });
    } 
    catch(err) 
    {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

module.exports = router;
