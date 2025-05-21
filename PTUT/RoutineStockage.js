const fs = require('fs').promises;
const path = require('path');

async function ajouterElementJSON(filePath, nouvelElement, pool) {
  try {
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

    // Extraction des champs à insérer en base
    // Adaptation selon la structure de nouvelElement
    // Ici on suppose un objet du type { categorie, id, details: { fav, pseudo, age, sex } }
    const [categorie, contenu] = Object.entries(nouvelElement)[0];
    if (!contenu || !contenu.details) {
      console.warn('Structure inattendue, insertion en base ignorée');
      return;
    }

    const id = contenu.id || null;
    const d = contenu.details;

    const fav = d.fav || null;
    const pseudo = d.pseudo || null;
    const age = d.age ? parseInt(d.age) : null;
    const sex = d.sex || null;

    const query = `
      INSERT INTO favoris (type, fav, pseudo, age, sex)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [categorie, fav, pseudo, age, sex];

    await pool.query(query, values);
    console.log('Données insérées en base PostgreSQL');
    
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le fichier ou insertion SQL :', error);
    throw error;
  }
}

module.exports = { ajouterElementJSON };
