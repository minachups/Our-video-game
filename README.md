# Castux

Vous en avez marre du jeu de paires (memory) avec votre petit cousin ou avec votre grand-mère ?
On vous propose un tout nouveau gameplay qui rajoutera du piment dans tout ça.

## Règles 

2 Joueurs, le 1er joueur retourne 2 cases si ce sont les mêmes, il gagne 1 point sinon, c'est au tour du 2e joueur. 
Au bout d'un moment, des cartes pouvoirs apparaissent à utiliser pour désavantager l'adversaire ou vous avantager.
(Le jeu est toujours en cours de développement beaucoup de choses à ajuster)
(Le mode solo est en cours de développement)

## Comment jouer ?

* Ouvrez le terminal et allez dans le dossier où vous voulez conserver le jeu.
* Écrivez dans le terminal `git clone https://github.com/minachups/Our-video-game.git`
* Ecrivez dans le terminal `mysql -u root -p`
* Ecrivez votre mot de passe de MYSQL
* Ecrivez `CREATE DATABASE Castux` pour créer la base de données
* Ecrivez `USE Castux`
* Ecrivez `SOURCE /chemin/` a la place de /chemin/ vous devriez mettre le chemin qui mène au fichier SQL (Il se trouve dans SQL\sql_du_jeux.sql dans le dossier que vous aviez cloner)
* Ouvrez une nouvelle fenêtre du terminal
* Écrivez dans le terminal `cd our-video-game`
* Écrivez dans le terminal `cd Back_game`
* Écrivez dans le terminal `npm i` pour installer les dépendances nécessaires 
* Écrivez dans le terminal `nodemon` pour démarrer le back (Il sera sur le port 5000)
* Ouvrez une nouvelle fenêtre du terminal 
* Allez dans le dossier où se trouve le jeu 
* Écrivez dans le terminal `cd our-video-game`
* Écrivez dans le terminal `cd Front_game`
* Écrivez dans le terminal `npm i` pour installer les dépendances nécessaires
* Écrivez dans le terminal `npm run dev` pour démarrer le front (Il sera sur le port 5173)
* Allez sur le port 5173 avec `http://localhost:5173/`
* Et amusez vous avec votre ami
