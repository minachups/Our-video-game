DROP TABLE IF EXISTS Cartes;
DROP TABLE IF EXISTS Participe;
DROP TABLE IF EXISTS Partie;
DROP TABLE IF EXISTS Joueur;
DROP TABLE IF EXISTS Pouvoir;
DROP TABLE IF EXISTS Possède;

CREATE TABLE Joueur (
    ID_Joueur INT AUTO_INCREMENT NOT NULL,
    Nom_Joueur VARCHAR(20) NOT NULL,
    Avatar_Joueur VARCHAR(255) NOT NULL,
    Score_max_Joueur INT DEFAULT 0,
    PairNumber_Joueur INT DEFAULT 0,
    PRIMARY KEY (ID_Joueur)
) ENGINE=InnoDB;

CREATE TABLE Partie (
    ID_score INT AUTO_INCREMENT NOT NULL,
    Valeur_score INT DEFAULT 0,
    date_Début_score TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_Fin_score TIMESTAMP NULL DEFAULT NULL,
    Terminé_score BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (ID_score)
) ENGINE=InnoDB;

CREATE TABLE Pouvoir (
    ID_Pouvoir INT AUTO_INCREMENT NOT NULL,
    Nom_Pouvoir VARCHAR(25) NOT NULL,
    Description_Pouvoir VARCHAR(255) DEFAULT NULL,
    FlushTiles_Pouvoir BOOLEAN DEFAULT FALSE,
    TilesToFlush_Pouvoir INT DEFAULT 0,
    Bomb_Pouvoir BOOLEAN DEFAULT FALSE,
    BombNumber_Pouvoir INT DEFAULT 0,
    Retourne_Pouvoir BOOLEAN DEFAULT FALSE,
    RetourneNumber_Pouvoir INT DEFAULT 0,
    VisibilitéJoueur_Pouvoir BOOLEAN DEFAULT FALSE,
    VisibilitéJoueurTour_Pouvoir INT DEFAULT 0,
    CacheAdversaire_Pouvoir BOOLEAN DEFAULT FALSE,
    BloqueCartes_Pouvoir BOOLEAN DEFAULT FALSE,
    BloqueCarteTour_Pouvoir INT DEFAULT 0,
    TourSupp_Pouvoir BOOLEAN DEFAULT FALSE,
    Joker_Pouvoir BOOLEAN DEFAULT FALSE,
    LoosePair_Pouvoir BOOLEAN DEFAULT FALSE,
    LoosePairNumber_Pouvoir INT DEFAULT 0,
    WinPair_Pouvoir BOOLEAN DEFAULT FALSE,
    WinPairNumber_Pouvoir INT DEFAULT 0,
    Ange_Pouvoir BOOLEAN DEFAULT FALSE,
    Fireball_Pouvoir BOOLEAN DEFAULT FALSE,
    FireballNumber_Pouvoir INT DEFAULT 0,
    PRIMARY KEY (ID_Pouvoir)
) ENGINE=InnoDB;

CREATE TABLE Cartes (
    ID_cartes INT AUTO_INCREMENT NOT NULL,
    retourné_cartes BOOLEAN DEFAULT FALSE,
    Pouvoir_Cartes BOOLEAN DEFAULT FALSE,
    ID_score INT NOT NULL,
    pouvoir_id_pouvoir INT DEFAULT NULL,
    PRIMARY KEY (ID_cartes),
    CONSTRAINT FK_Cartes_ID_score FOREIGN KEY (ID_score) REFERENCES Partie (ID_score)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Cartes_pouvoir_id_pouvoir FOREIGN KEY (pouvoir_id_pouvoir) REFERENCES Pouvoir (ID_Pouvoir)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Participe (
    ID_Joueur INT NOT NULL,
    ID_score INT NOT NULL,
    PRIMARY KEY (ID_Joueur, ID_score),
    CONSTRAINT FK_Participe_ID_Joueur FOREIGN KEY (ID_Joueur) REFERENCES Joueur (ID_Joueur)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Participe_ID_score FOREIGN KEY (ID_score) REFERENCES Partie (ID_score)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Possède (
    ID_Pouvoir INT NOT NULL,
    ID_Joueur INT NOT NULL,
    PRIMARY KEY (ID_Pouvoir, ID_Joueur),
    CONSTRAINT FK_Possède_ID_Pouvoir FOREIGN KEY (ID_Pouvoir) REFERENCES Pouvoir (ID_Pouvoir)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Possède_ID_Joueur FOREIGN KEY (ID_Joueur) REFERENCES Joueur (ID_Joueur)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
