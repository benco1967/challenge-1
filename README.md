Challenge leocare 
=================

Ce challenge que nous vous soumettons est de créer un petit site web responsive 
qui détermine continuellement la localisation et qui propose les points 
d'intérêt à proximité (cf [doc](https://developer.foursquare.com/docs/venues/search))
en vous basant sur l'[API Foursquare](https://developer.foursquare.com/).

Pour chaque point d'intérêt afficher sa note attribuée 
(définition d'un [POI](https://developer.foursquare.com/docs/venues/venues))

Livrable :
* Une archive que nous pouvons exécuter (ou un GIT éventuellement)
* Une explication de votre solution :  ce que qui a été essayé, ce qui a 
  marché, ce qui n'a pas marché, le choix des technos.

API Foursquare
--------------
L'api permet de récupérer les information sur les POI. L'API de search ne
retourne pas un POI complet. Il faut une requête sur le POI pour avoir
l'objet complet. Néanmoins l'accès à la donnée demandée (le rating) n'est
accessible qu'en souscrivant à un abonnement mensuel. Décision est prise 
d'utiliser les likes à la place.

Pour se connecter à l'API il faut enregistrer une application pour pouvoir
récupérer des identifiants de connexion `client_id` et `client_secret`. 
Ces données sont bien sur personnelles et ne peuvent être mises dans un 
code ou un fichier de configuration public (par exemple sur github).
En conséquence, ces données seront stockées dans un fichier de configuration 
exclu de git. De même il est hors de question de mettre ces infos côté client
en accédant directement à l'API Foursquare depuis le navigateur. Il faut donc
définir une API qui servira de proxy pour l'accès à l'API de Foursquare.
 
API Proxy
---------
L'API est constituée de deux entrées :
+ aroundme : donnant les POI autour d'un point équivalent de l'API 
`venues/search` 
+ POI : donnant les détails de POI, équivalent de l'API `venues/:id`

Comme seul les éléments suivants utiles on filtrera les autres :
+ id
+ name
+ likes (en pratique `likes.count`)

Cela limitera la charge aux données utiles.

La recherche de POI ne pourra pas retourner le nombre de likes car l'API de 
Foursquare ne le fait pas. Il faudra donc pour le client faire des requêtes
pour chaque POI.

Client
------
Il devra utiliser la géolocalisation de HTML5. On choisira Angular puisque
c'est le framework utiliser par *leocare*.

L'idée est de créer un service de localisation, celui-ci récupèrera de 
manière régulière la localisation et si elle à suffisamment changer (genre 
100m), on appelera dans un premier temps l'API `aroundme` pour rafraîchir 
la liste des POI, puis pour chaque POI on mettra à jour le nombre de likes
en appelant l'API `poi` pour chaque POI de la liste.

Implémntation
-------------

Un simple serveur *nodejs*, un sous projet *client* pour l'ihm. On mettra
le secret dans un fichier de configuration ou via variables d'environnement,
ainsi il sera facile de lancer cela dans un container *docker*.

### Serveur API
Du classique implémenté grâce à *expressjs*.

### Client
On part de l'application de base.