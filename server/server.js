const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Route pour obtenir les catégories personnel à un utilisateur
server.get('/user-categorie/:userId', (req, res) => {
  const db = router.db;
  const generalCategories = db.get('generalCategories').value();
  const userCategories = db
    .get('userCategories')
    .filter({ userId: parseInt(req.params.userId) })
    .value();
  res.json({ generalCategories, userCategories });
});

// Route pour l'authentification
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find(user => user.email === email && user.password === password).value();
  if (user) {
    res.json({ id: user.id });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Route pour l'enregistrement d'un utilisateur
server.post('/auth/register', (req, res) => {
  const { email, password, name } = req.body;
  const db = router.db;
  const newUser = {
    id: Date.now(),
    email,
    password,
    name,
    budget: 1000, // Valeur par défaut pour le budget
  };
  db.get('users').push(newUser).write();

  if (newUser) {
    res.json({ id: newUser.id });
  } else {
    res.status(404).json({ error: 'User could not be created' });
  }
});

// Route pour obtenir les dépenses d'un utilisateur
server.get('/expenses/:userId', (req, res) => {
  const db = router.db;
  const expenses = db
    .get('expenses')
    .filter({ userId: parseInt(req.params.userId) })
    .value();
  res.json(expenses);
});

// Route pour ajouter une dépense
server.post('/expenses', (req, res) => {
  const { date, category, store, amount, description, userId } = req.body;
  const db = router.db;
  const newExpense = {
    id: Date.now(),
    date,
    category,
    store,
    amount,
    description,
    userId
  };
  db.get('expenses').push(newExpense).write();

  if (newExpense) {
    res.json(newExpense);
  } else {
    res.status(404).json({ error: 'Expense could not be created' });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});