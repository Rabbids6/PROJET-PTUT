const express = require('express');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const { ajouterElementJSON } = require('./RoutineStockage'); // Ton module pour écrire dans JSON

const app = express();
const PORT = process.env.PORT || 3000;

// Config PostgreSQL via variable d'environnement
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques depuis 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger '/' vers 'pseudo.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pseudo.html'));
});

// Route pour ajouter un élément JSON
app.post('/ajouterElementJSON', async (req, res) => {
  try {
    console.log("Appel de ajouterElementJSON (server.js)");
    const utilisateur = req.body; // Doit contenir { Pseudo: "..." }
    await ajouterElementJSON('RESULTATS.json', utilisateur);
    res.send('Utilisateur ajouté avec succès');
    console.log("Succès ajouterElementJSON (server.js)");
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).send('Erreur serveur');
  }
});

// Route POST pour convertir le JSON en PostgreSQL
app.post('/importJSON', async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'RESULTATS.json'), 'utf8'));

    for (const item of data) {
      // Adapte les champs ici selon ta table et JSON
      await pool.query(
        'INSERT INTO joueurs (pseudo, score) VALUES ($1, $2)',
        [item.Pseudo || item.pseudo, item.Score || item.score || 0] // exemples de clés possibles
      );
    }

    res.send('Import JSON vers PostgreSQL réussi !');
  } catch (error) {
    console.error("Erreur lors de l'import JSON vers PostgreSQL :", error);
    res.status(500).send('Erreur lors de l\'import JSON');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
