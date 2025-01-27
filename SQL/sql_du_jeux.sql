

DROP TABLE IF EXISTS Pouvoirs;
DROP TABLE IF EXISTS Themes;
DROP TABLE IF EXISTS Avatars;
DROP TABLE IF EXISTS Carte;
DROP TABLE IF EXISTS Difficulté;
DROP TABLE IF EXISTS Contient;
DROP TABLE IF EXISTS influe;

CREATE TABLE Difficulté (
    ID_Difficulté INT AUTO_INCREMENT NOT NULL,
    Nom_Difficulté VARCHAR(20) NOT NULL,
    NombreCartes INT NOT NULL CHECK (NombreCartes IN (15, 20, 27)),
    PRIMARY KEY (ID_Difficulté)
) ENGINE=InnoDB;

INSERT INTO Difficulté (Nom_Difficulté, NombreCartes)
VALUES 
    ('Facile', 15),
    ('Moyen', 20),
    ('Difficile', 27);



CREATE TABLE Pouvoirs (
    ID_Pouvoir INT AUTO_INCREMENT NOT NULL,
    Nom_Pouvoir VARCHAR(25),
    Description_Pouvoir VARCHAR(255),
    Images_Pouvoirs VARCHAR(255),
    FlushTiles_Pouvoir BOOL,
    TilesToFlush_Pouvoir INT,
    Bomb_Pouvoir BOOL,
    BombNumber_Pouvoir INT,
    Retourne_Pouvoir BOOL,
    RetourneNumber_Pouvoir INT,
    VisibilitéJoueur_Pouvoir BOOL,
    VisibilitéJoueurTour_Pouvoir INT,
    CacheAdversaire_Pouvoir BOOL,
    BloqueCartes_Pouvoir BOOL,
    BloqueCarteTour_Pouvoir INT,
    TourSupp_Pouvoir BOOL,
    Joker_Pouvoir BOOL,
    LoosePair_Pouvoir INT,
    LoosePairNumber_Pouvoir INT,
    Ange_Pouvoir BOOL,
    Fireball_Pouvoir BOOL,
    FireballNumber_Pouvoir INT, 
    PRIMARY KEY (ID_Pouvoir)
) ENGINE=InnoDB;



CREATE TABLE Themes (
    ID_Themes INT AUTO_INCREMENT NOT NULL,
    Images_Themes VARCHAR(255),
    PRIMARY KEY (ID_Themes)
) ENGINE=InnoDB;



CREATE TABLE Avatars (
    ID_Avatars INT AUTO_INCREMENT NOT NULL,
    Images VARCHAR(255),
    PRIMARY KEY (ID_Avatars)
) ENGINE=InnoDB;



CREATE TABLE Carte (
    ID_Carte INT AUTO_INCREMENT NOT NULL,
    Retourné_Carte BOOL,
    Retourné_images VARCHAR(255),
    Dos_images VARCHAR(255),
    PRIMARY KEY (ID_Carte)
) ENGINE=InnoDB;



CREATE TABLE Contient (
    ID_Themes INT NOT NULL,
    ID_Avatars INT NOT NULL,
    ID_Carte INT NOT NULL,
    ID_Pouvoir INT NOT NULL,
    PRIMARY KEY (ID_Themes, ID_Avatars, ID_Carte, ID_Pouvoir),
    CONSTRAINT FK_Contient_ID_Themes FOREIGN KEY (ID_Themes) REFERENCES Themes (ID_Themes),
    CONSTRAINT FK_Contient_ID_Avatars FOREIGN KEY (ID_Avatars) REFERENCES Avatars (ID_Avatars),
    CONSTRAINT FK_Contient_ID_Carte FOREIGN KEY (ID_Carte) REFERENCES Carte (ID_Carte),
    CONSTRAINT FK_Contient_ID_Pouvoir FOREIGN KEY (ID_Pouvoir) REFERENCES Pouvoirs (ID_Pouvoir)
) ENGINE=InnoDB;




CREATE TABLE influe (
    ID_Carte INT NOT NULL,
    ID_Pouvoir INT NOT NULL,
    PRIMARY KEY (ID_Carte, ID_Pouvoir),
    CONSTRAINT FK_influe_ID_Carte FOREIGN KEY (ID_Carte) REFERENCES Carte (ID_Carte),
    CONSTRAINT FK_influe_ID_Pouvoir FOREIGN KEY (ID_Pouvoir) REFERENCES Pouvoirs (ID_Pouvoir)
) ENGINE=InnoDB;
