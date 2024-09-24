const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.get('/user-categorie/:userId', (req, res) => {
  const db = router.db;
  const generalCategories = db.get('generalCategories').value();
  const userCategories = db
    .get('userCategories')
    .filter({ userId: parseInt(req.params.userId) })
    .value();
  res.json({ generalCategories, userCategories });
});
//authentication
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = router.db;
  const user = db.get('users').find(user => user.email === email && user.password === password).value();
  if (user) {
    res.json({ id: user.id });
  } else {
    res.status(404).json({ error: 'user not found' });
  }
});
server.post('/auth/signin', (req, res) => {
  const { email, password, name } = req.body;
  const db = router.db;
  const newUser = { id: Date.now(), email, password, name };
  db.get('users').push(newUser).write();

  if (newUser) {
    res.json({ id: newUser.id });
  } else {
    res.status(404).json({ error: 'User could not be created' });
  }
});


server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
