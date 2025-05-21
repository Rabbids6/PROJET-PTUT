const fs = require('fs').promises;
const path = require('path');

async function ajouterElementJSON(filePath, nouvelElement) {
  try {
    // Utiliser un chemin absolu
    const absolutePath = path.join(__dirname, filePath);
    console.log('Chemin absolu du fichier :', absolutePath);

    let jsonData = [];
    try {
      const fileContent = await fs.readFile(absolutePath, 'utf8');
      jsonData = JSON.parse(fileContent);
      if (!Array.isArray(jsonData)) {
        console.log('Fichier non sous forme de tableau, réinitialisation');
        jsonData = [];
      }
    } catch (error) {
      console.log('Fichier non trouvé ou illisible, création d\'un nouveau tableau :', error.message);
      jsonData = [];
    }

    jsonData.push(nouvelElement);
    await fs.writeFile(absolutePath, JSON.stringify(jsonData, null, 2));
    console.log('Données ajoutées à', absolutePath);
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier :', error);
    throw error;
  }
}


async function lireNvSondage() {
  try {
    // Votre logique ici
  } catch (err) {
    console.error('Erreur :', err);
  }
}

// Exporter avec CommonJS
module.exports = { ajouterElementJSON };