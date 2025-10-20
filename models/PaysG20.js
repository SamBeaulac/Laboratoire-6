/**
 * @file PaysG20.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Modèle de gestion de la base de données PaysG20
 */

// Initialise la connection 
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'PaysG20',
    waitForConnections: true,
}).promise();

// Classe de gestion
class PaysG20 {

    static async requeteGetAll() {
        return pool.query(`
            SELECT *
            FROM caracPays;
        `);
    }
    
    static async requete1() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE NbHab > 100000000 AND DensitePop > 100;
        `);
    }

    static async requete2() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE dejaVisite = 'O' AND (PIB > 2000 OR NbHab > 300000000);
        `);
    }

    static async requete3() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE Pays LIKE 'A%' AND Capitale LIKE '%a%';
        `);
    }

    static async requete4() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE (dejaVisite = 'N' AND (PIB IS NULL OR DensitePop < 50)) 
            OR 
            (dejaVisite = 'O' AND NbHab < 50000000);
        `);
    }

    static async requete5() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE PIB = (SELECT MAX(PIB) FROM caracPays);
        `);
    }

    static async requete6() {
        return pool.query(`
            SELECT *
            FROM caracPays
            WHERE NbHab = (SELECT MIN(NbHab) FROM caracPays);
        `);
    }

    static async insertRows(rows) 
    {
        for (const row of rows) 
        {
            await pool.query(
                `INSERT INTO caracPays 
                (id, NbHab, DensitePop, PIB, dejaVisite, Pays, Capitale, Commentaires) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [row.id, row.NbHab, row.DensitePop, row.PIB, row.dejaVisite, row.Pays, row.Capitale, row.Commentaires]
            );
        }
    }

    static async deleteByPays(pays) 
    {
        return pool.query(
            'DELETE FROM caracPays WHERE Pays = ?',
            [pays]
        );
    }
}

module.exports = PaysG20;
