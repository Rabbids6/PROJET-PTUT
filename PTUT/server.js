const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const { ajouterElementJSON } = require('./RoutineStockage');

const app = express();
const PORT = process.env.PORT || 3000;

// Connexion PostgreSQL via variable d'environnement Render
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques depuis 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger la racine vers pseudo.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pseudo.html'));
});

// Route pour ajouter un élément dans le fichier JSON
app.post('/ajouterElementJSON', async (req, res) => {
  try {
    console.log("Ajout JSON en cours...");
    const utilisateur = req.body;
    await ajouterElementJSON('RESULTATS.json', utilisateur);
    res.send('Utilisateur ajouté avec succès');
  } catch (error) {
    console.error("Erreur ajout JSON :", error);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour importer tout le JSON vers PostgreSQL
app.post('/ajouterElementJSON', async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'RESULTATS.json'), 'utf8'));

    for (const obj of data) {
      const [categorie, contenu] = Object.entries(obj)[0]; // "MANGA": { id, details }
      if (!contenu || !contenu.details) continue;

      const id = contenu.id || null;
      const d = contenu.details;

      const fav = d.fav || null;
      const pseudo = d.pseudo || null;
      const age = d.age ? parseInt(d.age) : null;
      const sex = d.sex || null;

      await pool.query(
        'INSERT INTO favoris (categorie, original_id, pseudo, fav, age, sex) VALUES ($1, $2, $3, $4, $5, $6)',
        [categorie, id, pseudo, fav, age, sex]
      );
    }

    res.send('Utilisateur ajouté avec succès en JSON vers PostgreSQL réussi');
  } catch (error) {
    console.error("Erreur import JSON -> PostgreSQL :", error);
    res.status(500).send('Erreur serveur import');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
