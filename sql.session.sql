/**
 * @file sql.session.sql
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Requêtes SQL pour le laboratoire 6
 */

-- Sélectionner la database
USE PaysG20;

-- Requête de type "SELECT"

/*  id,
    Pays,
    NbHab,
    Capitale,
    DensitePop,
    PIB,
    dejaVisite,
    Commentaires
*/

/*
    SELECT [colonnes]
    FROM [table]
    WHERE [conditions];
*/

-- 1. Quels sont les pays de plus de 100 000 000 d’habitants qui ont plus de 100 hab/km2 ?
SELECT *
FROM caracPays
WHERE NbHab > 100000000 AND DensitePop > 100;

-- 2. Quels sont les pays identifiés comme visités et : 
    -- a. Qui ont un PIB plus grand que 2000 
    -- b. Ou qui ont une population supérieure à 300 000 000 ?
SELECT *
FROM caracPays
WHERE dejaVisite = 'O' AND (PIB > 2000 OR NbHab > 300000000);

-- 3. Quels sont les pays commençant par a ET dont le nom de la capitale contient un a ?
SELECT *
FROM caracPays
WHERE Pays LIKE 'A%' AND Capitale LIKE '%a%';

-- 4.	Quels sont les pays :
    -- a. Soit qui ne sont pas identifiés comme visités et qui ont : 
        -- i. Soit un PIB « NULL » 
        -- ii. Ou une densité inférieure à 50, 
    -- b. Soit qui sont identifiés comme visités et :
        -- i. Qui ont une population de moins de 50 000 000 d’habitants ?
SELECT *
FROM caracPays
WHERE (dejaVisite = 'N' AND (PIB IS NULL OR DensitePop < 50)) 
      OR 
      (dejaVisite = 'O' AND NbHab < 50000000);

-- 5. Quel est le pays qui a le plus grand PIB ?
SELECT *
FROM caracpays
WHERE PIB = (SELECT MAX(PIB) FROM caracPays);


-- 6. Quel est le pays qui a la plus petite population ?
SELECT *
FROM caracPays
WHERE NbHab = (SELECT MIN(NbHab) FROM caracPays);

