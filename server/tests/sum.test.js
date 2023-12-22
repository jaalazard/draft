const { sum, fetchData, fetchDataFail } = require("../variousThingsToTest/sum");
/* test('additionner 1 et 2 donne 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

test('additionner 1 et 2 ne donne pas 4', () => {
  expect(sum(1, 2)).not.toBe(4);
})

test('Le test passe avec toEqual puisque les propriétés undefined ne sont pas prises en comtpe', () => {
  const obj1 = {name : "John", age: 32};
  const obj2 = {name : "John", age: 32, origin: undefined};
  expect(obj1).toEqual(obj2);
});

test('Le test passe avec deux objets différents puisque toStrictEqual prend en compte les propriétés undefined', () => {
  const obj1 = { value: 1, otherValue: undefined };
  const obj2 = { value: 1 };
  expect(obj1).not.toStrictEqual(obj2);
});

test('La const "rien" est nulle', () => {
  const rien = null;
  expect(rien).toBeNull();
})

test('La const "rien" n\'est pas nulle', () => {
  const rien = 'rien';
  expect(rien).not.toBeNull();
})

test('La const "rien" n\'est pas undefined', () => {
  const rien = null;
  expect(rien).not.toBeUndefined();
})

//équivalent à :
test('La const "rien" est defined', () => {
  const rien = 'rien';
  expect(rien).toBeDefined();
})

test('La const "rien" est undefined', () => {
  const rien = undefined;
  expect(rien).toBeUndefined();
})

test('La const "truthy" est truthy avec un number', () => {
  const truthy = 1;
  expect(truthy).toBeTruthy();
})

test('La const "truthy" est truthy avec une string', () => {
  const truthy = 'truc';
  expect(truthy).toBeTruthy();
})

test('La const "falsy" est falsy avec 0', () => {
  const falsy = 0;
  expect(falsy).toBeFalsy();
})

test('La const "falsy" est falsy avec null', () => {
  const falsy = null;
  expect(falsy).toBeFalsy();
})

test('La const "falsy" est falsy avec undefined', () => {
  const falsy = undefined;
  expect(falsy).toBeFalsy();
}) */

test("deux plus deux", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe et toEqual sont équivalents pour les nombres
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("deux plus deux n'est pas plus grand que 5", () => {
  const deuxPlusdeux = 2 + 2;
  expect(deuxPlusdeux).toBeLessThan(5);
});

test("addition de deux nombres décimaux strictement égal à 0.75", () => {
  const addition = 0.25 + 0.5;
  expect(addition).toBeCloseTo(0.75); //ne fonctionnerait pas avec toBeEqual ou toBe en raison de la virgule
});

test("il n'y a pas de I dans team", () => {
  expect("team").not.toMatch(/I/);
});

test('mais il y a "stop" dans Christoph', () => {
  expect("Christoph").toMatch(/stop/);
});

test("il n'y a pas de p dans armoire", () => {
  expect("armoire").not.toMatch(/p/);
});

test("il y a un r dans armoire", () => {
  expect("armoire").toMatch(/R/i);
});

test("mon tableau contient le mot poney", () => {
  const array = ["chameau", "brebis", "poney"];
  expect(array).toContain("poney");
});

test("mon tableau ne contient pas le mot pharmacie", () => {
  const array = ["chameau", "brebis", "poney"];
  expect(array).not.toContain("pharmacie");
});

test("fetchData renvoie les bonnes données", async () => {
  await expect(fetchData()).resolves.toEqual({ data: "Données de test" });
});

test("fetchDataFail échoue et renvoie un message d'erreur", async () => {
  await expect(fetchDataFail()).rejects.toThrow("Erreur de la requête");
});

/* Exercice :

Imaginez que vous ayez une fonction getUserData qui récupère les informations d'un utilisateur à partir d'une API externe.
Vous souhaitez tester une autre fonction, processUserData, qui utilise getUserData et effectue un traitement particulier 
sur ces données utilisateur.

Voici les étapes de l'exercice :

Créez une fonction simulée getUserData pour simuler l'appel à l'API externe et retourner des données fictives d'utilisateur.
Créez une fonction processUserData qui utilise getUserData pour récupérer les informations de l'utilisateur et effectuer un traitement simple (par exemple, concaténer le nom et l'âge).
Écrivez des tests Jest pour processUserData en utilisant la fonction simulée getUserData. Assurez-vous de vérifier si getUserData est appelée avec les bons arguments et si processUserData renvoie les résultats attendus.

Notes :

Vous n'avez pas besoin d'une API réelle pour cet exercice. La fonction simulée getUserData doit simplement retourner des données fictives d'utilisateur.
Le traitement dans processUserData peut être aussi simple que la concaténation du nom et de l'âge, mais vous pouvez le personnaliser en fonction de vos préférences. */
