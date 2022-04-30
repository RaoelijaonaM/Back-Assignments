# Back-Assignments
API pour l'application gestion de devoir 

### Fonctionnement:
Lancez les commandes suivantes afin de tester localement les apis : </br>

    npm install
    node server.js
    
les apis sont consultables avec l'uri commançant par : localhost:8010/api/
#### Liste des url:
#### 1-<ins>Assignment</ins>
GET : /assignments => Liste des devoirs </br>
GET : /assignments/:id => Detail du devoir ayant l'id [id] </br>
POST : /assignments => Créer un devoir</br>
PUT : /assignments => modifier le devoir ayant l'id [id] </br>
DELETE : /assignments/:id => supprimer le devoir ayant l'id [id]

#### 2-<ins>Matieres</ins>
GET : /matieres => Liste des matieres</br>

#### 3-<ins>Users</ins>
GET : /users => Liste des utilisateurs</br>

Vous pouvez aussi consulter les apis à partir de l'url : https//back-assignments.herokuapp.com/api et complémenter la suite avec la liste des urls
