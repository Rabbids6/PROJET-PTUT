const express = require('express');
const { ajouterElementJSON } = require('./RoutineStockage'); // Remplacez par le chemin de votre fichier JS
const app = express();
const path = require('path'); // Pour gérer les chemins de fichiers


// Middleware pour parser le JSON
app.use(express.json());
//app.use(express.static('public')); 
app.use(express.static(path.join(__dirname, 'public')));

// Route pour ajouter un élément
// app.post('/ajouterElement', async (req, res) => {
//     const nouvelElement = req.body;
//     const filePath = 'RESULTATS.json'; // Chemin vers votre fichier JSON
//     try {
//         console.log('Appel de ajouterElementJSON avec :', nouvelElement);
//         await ajouterElementJSON(filePath, nouvelElement);
//         console.log('ajouterElementJSON exécutée avec succès');
//         res.status(200).send('Élément ajouté avec succès !');
//     } catch (err) {
//         res.status(500).send('Erreur lors de l\'ajout de l\'élément');
//     }
// });

// app.get('/ajouterElementJSON', async (req, res) => {
//     const nouvelElement = req.body;
//     const filePath = 'RESULTATS.json'; // Chemin vers votre fichier JSON
//     try {
//         console.log('Appel de ajouterElementJSON avec :', nouvelElement);
//         await ajouterElementJSON(filePath, nouvelElement);
//         console.log('ajouterElementJSON exécutée avec succès');
//         res.status(200).send('Élément ajouté avec succès !');
//     } catch (err) {
//         res.status(500).send('Erreur lors de l\'ajout de l\'élément');
//     }
// });


app.post('/ajouterElementJSON', async (req, res) => {
    try {
        console.log("calling ajouter ElementJSON (server.js");
        const utilisateur = req.body; // Doit contenir { Pseudo: "..." }
          await ajouterElementJSON('RESULTATS.json',utilisateur);
        res.send('Utilisateur ajouté avec succès');
        console.log("succes ajouter ElementJSON (server.js)");
    } catch (error) {
      console.error("Erreur :", error);
      res.status(500).send('Erreur serveur');
    }
  });


// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
