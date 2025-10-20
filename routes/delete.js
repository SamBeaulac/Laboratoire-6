/**
 * @file delete.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Route pour supprimer des données
 */

const express = require('express');
const PaysG20 = require('../models/PaysG20');
const router = express.Router();

router.get('/', async function(req, res) {
    try 
    {
        const [rows] = await PaysG20.requeteGetAll();
        res.render('delete', { data: rows });
    } 
    catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
});

router.post('/', async function(req, res)
{
    const pays = req.body.pays;
    
    if (!pays || pays.trim() === '') 
    {
        return res.status(400).send("Le nom du pays est requis");
    }

    try 
    {
        const [result] = await PaysG20.deleteByPays(pays.trim());
        
        if (result.affectedRows === 0) 
        {
            return res.send(`
                <script>
                    alert('Erreur : aucun pays trouvé');
                    window.location.href = '/delete';
                </script>
            `);
        }
        
        return res.send(`
            <script>
                alert('Ligne supprimée avec succès');
                window.location.href = '/delete';
            </script>
        `);
    } 
    catch (err) 
    {
        console.error(err);
        res.status(500).send("Erreur");
    }
});

module.exports = router;