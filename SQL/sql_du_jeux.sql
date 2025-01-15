-- Supprimer les tables
DROP TABLE IF EXISTS Cartes;
DROP TABLE IF EXISTS Participe;
DROP TABLE IF EXISTS Partie;
DROP TABLE IF EXISTS Joueur;

-- Création de la table Joueur
CREATE TABLE Joueur (
    ID_Joueur INT AUTO_INCREMENT NOT NULL,
    Nom_Joueur VARCHAR(50) NOT NULL, -- Nom du joueur
    Score_max_Joueur INT DEFAULT 0,
    Monnaie INT DEFAULT 0,
    XP INT DEFAULT 0,
    Photo_Joueur VARCHAR(255) DEFAULT NULL, 
    PRIMARY KEY (ID_Joueur)
) ENGINE=InnoDB;

-- Création de la table Partie
CREATE TABLE Partie (
    ID_score INT AUTO_INCREMENT NOT NULL,
    date_Début_score TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Début de la partie
    date_Fin_score TIMESTAMP NULL DEFAULT NULL, -- Fin de la partie
    Terminé_score BOOLEAN DEFAULT FALSE, -- Partie terminée ou non
    PRIMARY KEY (ID_score)
) ENGINE=InnoDB;

-- Création de la table Cartes
CREATE TABLE Cartes (
    ID_cartes INT AUTO_INCREMENT NOT NULL,
    Image_carte VARCHAR(255) NOT NULL, -- Lien ou description de l'image
    Image_carte_retournée VARCHAR(255) NOT NULL,
    ID_paire INT NOT NULL, -- Identifiant pour retrouver la paire correspondante
    ID_score INT NOT NULL, -- Référence à la partie à laquelle appartient la carte
    retourné_cartes BOOLEAN DEFAULT FALSE, -- Indique si la carte est retournée
    PRIMARY KEY (ID_cartes),
    CONSTRAINT FK_Cartes_ID_score FOREIGN KEY (ID_score) REFERENCES Partie (ID_score)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Création de la table Participe (relation entre joueurs et parties)
CREATE TABLE Participe (
    ID_Joueur INT NOT NULL,
    ID_score INT NOT NULL,
    Paires_trouvées INT DEFAULT 0, -- Nombre de paires trouvées par le joueur dans cette partie
    PRIMARY KEY (ID_Joueur, ID_score),
    CONSTRAINT FK_Participe_ID_Joueur FOREIGN KEY (ID_Joueur) REFERENCES Joueur (ID_Joueur)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Participe_ID_score FOREIGN KEY (ID_score) REFERENCES Partie (ID_score)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
