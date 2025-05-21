const express = require('express');
const path = require('path');
const { ajouterElementJSON } = require('./RoutineStockage'); // Remplacez par le chemin de votre fichier JS

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers statiques depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rediriger la racine '/' vers 'pseudo.html'
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

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
