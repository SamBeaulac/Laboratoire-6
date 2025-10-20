/**
 * @file insert.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Route pour insérer des données
 */

const express = require('express');
const PaysG20 = require('../models/PaysG20');
const router = express.Router();

router.get('/', async function(req, res) {
    try 
    {
        const [rows] = await PaysG20.requeteGetAll();
        res.render('insert', { title: 'Table', data: rows });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

router.post('/', async function(req, res) {
    const rows = req.body;
    try 
    {
        await PaysG20.insertRows(rows);
        res.json({ success: true });
    } 
    catch(err) 
    {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;