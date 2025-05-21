

function afficherStatistiques() {
  const container = document.getElementById("statistiques-container");
  container.innerHTML = "";

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  for (const [nom, nbVotes] of Object.entries(votes)) {
    const pourcentage = ((nbVotes / totalVotes) * 100).toFixed(1);
    
    const bloc = document.createElement("div");
    bloc.className = "stat-block";

    const titre = document.createElement("div");
    titre.className = "stat-title";
    titre.textContent = `${nom} — ${nbVotes} votes (${pourcentage}%)`;

    const barre = document.createElement("div");
    barre.className = "stat-bar";

    const remplissage = document.createElement("div");
    remplissage.className = "stat-fill";
    remplissage.style.width = `${pourcentage}%`;

    barre.appendChild(remplissage);
    bloc.appendChild(titre);
    bloc.appendChild(barre);
    container.appendChild(bloc);
  }
}

// Simule un vote toutes les 5 secondes pour démonstration
setInterval(() => {
  const keys = Object.keys(votes);
  const index = Math.floor(Math.random() * keys.length);
  votes[keys[index]] += 1;
  afficherStatistiques();
}, 5000);

window.onload = afficherStatistiques;

async function chargerVotes() {
  try {
    const response = await fetch("https://votre-domaine.fr/api/votes");
    if (!response.ok) throw new Error("Erreur serveur");
    const votes = await response.json();
    afficherStatistiques(votes);
  } catch (error) {
    console.error("Erreur de chargement des votes :", error);
  }
}

function afficherStatistiques(votes) {
  const container = document.getElementById("statistiques-container");
  container.innerHTML = "";

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  for (const [nom, nbVotes] of Object.entries(votes)) {
    const pourcentage = ((nbVotes / totalVotes) * 100).toFixed(1);

    const bloc = document.createElement("div");
    bloc.className = "stat-block";

    const titre = document.createElement("div");
    titre.className = "stat-title";
    titre.textContent = `${nom} — ${nbVotes} votes (${pourcentage}%)`;

    const barre = document.createElement("div");
    barre.className = "stat-bar";

    const remplissage = document.createElement("div");
    remplissage.className = "stat-fill";
    remplissage.style.width = `${pourcentage}%`;

    barre.appendChild(remplissage);
    bloc.appendChild(titre);
    bloc.appendChild(barre);
    container.appendChild(bloc);
  }
}

// Actualiser toutes les 5 secondes
setInterval(chargerVotes, 5000);
window.onload = chargerVotes;
