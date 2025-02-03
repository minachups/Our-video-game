DROP TABLE IF EXISTS Paire;
DROP TABLE IF EXISTS Cartes;
DROP TABLE IF EXISTS Avatar;
DROP TABLE IF EXISTS Theme;
DROP TABLE IF EXISTS Pouvoir;
DROP TABLE IF EXISTS Possède;
DROP TABLE IF EXISTS Joueur;

CREATE TABLE Theme (
    ID_Theme INT AUTO_INCREMENT NOT NULL,
    Nom_Theme VARCHAR(50) NOT NULL,
    Description_Theme VARCHAR(255),
    Image_Arriere_Plan VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID_Theme)
) ENGINE=InnoDB;

CREATE TABLE Avatar (
    ID_Avatar INT AUTO_INCREMENT NOT NULL,
    Nom_Avatar VARCHAR(50) NOT NULL,
    URL_Avatar VARCHAR(255) NOT NULL,
    ID_Theme INT NOT NULL,
    PRIMARY KEY (ID_Avatar),
    CONSTRAINT FK_Avatar_ID_Theme FOREIGN KEY (ID_Theme) REFERENCES Theme (ID_Theme)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Joueur (
    ID_Joueur INT AUTO_INCREMENT NOT NULL,
    Nom_Joueur VARCHAR(20) NOT NULL,
    ID_Avatar_Actuel INT,
    PRIMARY KEY (ID_Joueur),
    CONSTRAINT FK_Joueur_ID_Avatar_Actuel FOREIGN KEY (ID_Avatar_Actuel) REFERENCES Avatar (ID_Avatar)
        ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE Pouvoir (
    ID_Pouvoir INT AUTO_INCREMENT NOT NULL,
    Nom_Pouvoir VARCHAR(25) NOT NULL,
    Description_Pouvoir VARCHAR(255) DEFAULT NULL,
    Image_Pouvoir VARCHAR(255) DEFAULT NULL,
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
    ID_Theme INT NOT NULL,  
    retourné_cartes BOOLEAN DEFAULT FALSE,
    Pouvoir_Cartes BOOLEAN DEFAULT FALSE,
    URL_Image VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID_cartes),
    CONSTRAINT FK_Cartes_ID_Theme FOREIGN KEY (ID_Theme) REFERENCES Theme (ID_Theme)
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

CREATE TABLE Paire (
    ID_Paire INT AUTO_INCREMENT NOT NULL,
    ID_Joueur INT NOT NULL,
    Carte1_ID INT NOT NULL,
    Carte2_ID INT NOT NULL,
    PRIMARY KEY (ID_Paire),
    CONSTRAINT FK_Paire_ID_Joueur FOREIGN KEY (ID_Joueur) REFERENCES Joueur (ID_Joueur)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Paire_Carte1_ID FOREIGN KEY (Carte1_ID) REFERENCES Cartes (ID_cartes)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FK_Paire_Carte2_ID FOREIGN KEY (Carte2_ID) REFERENCES Cartes (ID_cartes)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


INSERT INTO Theme (ID_Theme, Nom_Theme, Image_Arriere_Plan) VALUES
(1, 'space', 'themes/Space/Fond/Space_wallpaper.png'),
(2, 'beach', 'themes/Beach/Fond/Beach_wallpaper.png'),
(3, 'drink', 'themes/Drinks/Fond/Bar_wallpaper.png'),
(4, 'flower', 'themes/Flower/Fond/Flower_wallpaper.png');

INSERT INTO Cartes (ID_Theme, URL_Image, retourné_cartes) VALUES
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%201.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%202.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%203.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%204.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%205.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%206%205.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%206.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%207.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%208%206.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%208.png', TRUE),
(1, 'themes/Space/Card/astronaut-space-watercolor-clipart-set_622026-1758%2058.png', TRUE),
(1, 'themes/Space/Card/Back_planet.svg', FALSE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%202.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%203.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%204.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%207.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%208.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%209.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%2010.png', TRUE),
(1, 'themes/Space/Card/drawing-planets-stars_1120557-38104%2011.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2011.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2010.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2012.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2013.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2014.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2015.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2016.png', TRUE),
(1, 'themes/Space/Card/watercolor-different-planets-set_23-2148276863%2017.png', TRUE);


INSERT INTO Pouvoir (Nom_Pouvoir, Description_Pouvoir, Image_Pouvoir, FlushTiles_Pouvoir, TilesToFlush_Pouvoir,) VALUES
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 2),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 3),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 4),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 14),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 6),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 8),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 10),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 12),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 17),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 20),
('The mixer', 'Aleatory cards will be mixed', '\themes\Pouvoir\Shuffle.svg',TRUE, 27);


INSERT INTO Pouvoir (Nom_Pouvoir, Description_Pouvoir, Image_Pouvoir, Retourne_Pouvoir, RetourneNumber_Pouvoir) VALUES
('The Fairy', 'Random cards reveal','\themes\Pouvoir\Fairy.svg', TRUE, 1),
('The Fairy', 'Random cards reveal','\themes\Pouvoir\Fairy.svg', TRUE, 2),
('The Fairy', 'Random cards reveal','\themes\Pouvoir\Fairy.svg', TRUE, 3),
('The Fairy', 'Random cards reveal','\themes\Pouvoir\Fairy.svg', TRUE, 4),
('The Fairy', 'Random cards reveal','\themes\Pouvoir\Fairy.svg', TRUE, 5),
