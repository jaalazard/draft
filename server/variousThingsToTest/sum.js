function sum(a, b) {
  return a + b;
}

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'Données de test' });
    }, 2000); // Simule une attente de 2 secondes
  });
}

function fetchDataFail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Erreur de la requête'));
    }, 2000); // Simule une attente de 2 secondes
  });
}

module.exports = { sum, fetchData, fetchDataFail };
