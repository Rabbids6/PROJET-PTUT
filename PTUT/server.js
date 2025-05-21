const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const { ajouterElementJSON } = require('./RoutineStockage');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pseudo.html'));
});

// Route unique pour ajouter l’élément dans JSON + PostgreSQL
app.post('/ajouterElementJSON', async (req, res) => {
  try {
    const utilisateur = req.body;
    await ajouterElementJSON('RESULTATS.json', utilisateur, pool);
    res.send('Utilisateur ajouté avec succès dans JSON et PostgreSQL');
  } catch (error) {
    console.error("Erreur ajout JSON + PostgreSQL :", error);
    res.status(500).send('Erreur serveur');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
