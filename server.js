let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignments = require('./routes/assignments');
let matiere = require('./routes/route-matieres');
let users = require('./routes/users');
let mongoose = require('mongoose');
const { verifyAccessToken } = require('./routes/middleware');

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri =
  'mongodb+srv://tpAngular:tpAngular@cluster0.hjrjl.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

mongoose.connect(uri, options).then(
  () => {
    console.log('Connecté à la base MongoDB assignments dans le cloud !');
    console.log('at URI = ' + uri);
  },
  (err) => {
    console.log('Erreur de connexion: ', err);
  }
);

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

app.use(prefix + '/users', users);
app.use(prefix + '/assignments', assignments);

// app
//   .route()
//   // .get(verifyAccessToken, assignment.getAssignments)
//   .get(assignment.getAssignments)
//   .post(assignment.postAssignment)
//   .put(assignment.updateAssignment);

// app
//   .route(prefix + '/assignments/:id')
//   .get(assignment.getAssignment)
//   .delete(assignment.deleteAssignment);

app.route(prefix + '/matieres').get(matiere.getMatieres);

// On démarre le serveur
app.listen(port, '0.0.0.0');
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;
