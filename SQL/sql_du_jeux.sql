-- Suppression des tables existantes si elles existent déjà
DROP TABLE IF EXISTS game_sessions, game_rounds, users, themes, cards, avatars, difficulties, Pouvoir, player_powers, game_session_powers;

-- Table pour les utilisateurs (sans gestion de connexion)
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,  -- Nom du joueur
    avatar_id INT,  -- Référence à un avatar
    FOREIGN KEY (avatar_id) REFERENCES avatars(avatar_id)
);

-- Table pour les thèmes
CREATE TABLE themes (
    theme_id INT AUTO_INCREMENT PRIMARY KEY,
    theme_name VARCHAR(50) NOT NULL,  -- Nom du thème
    theme_description TEXT,  -- Description du thème
    theme_card_design VARCHAR(255),  -- Chemin d'accès aux images de cartes
    theme_avatar_design VARCHAR(255)  -- Chemin d'accès aux images d'avatars
);

-- Table pour les cartes (ajout de la possibilité de bombes)
CREATE TABLE cards (
    card_id INT AUTO_INCREMENT PRIMARY KEY,
    theme_id INT,
    card_image VARCHAR(255) NOT NULL,
    is_bomb BOOLEAN DEFAULT FALSE,  -- Carte bombe ou non
    UNIQUE (theme_id, card_image),  -- Les images doivent être uniques par thème
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id)
);

-- Table pour les avatars
CREATE TABLE avatars (
    avatar_id INT AUTO_INCREMENT PRIMARY KEY,
    avatar_name VARCHAR(50) NOT NULL,  -- Nom de l'avatar
    avatar_image VARCHAR(255) NOT NULL,  -- Image de l'avatar
    theme_id INT,  -- Thème de l'avatar
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id)
);

-- Table pour les difficultés
CREATE TABLE difficulties (
    difficulty_id INT AUTO_INCREMENT PRIMARY KEY,
    difficulty_name VARCHAR(20) NOT NULL,
    max_time INT,  -- Temps maximal pour une paire
    max_attempts INT  -- Nombre maximal d'essais
);

-- Table pour les pouvoirs
CREATE TABLE Pouvoir (
    ID_Pouvoir INT AUTO_INCREMENT NOT NULL,
    Nom_Pouvoir VARCHAR(25) NOT NULL,  -- Nom du pouvoir
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

-- Table pour associer les pouvoirs aux joueurs
CREATE TABLE player_powers (
    player_id INT,
    pouvoir_id INT,
    is_active BOOLEAN DEFAULT TRUE,  -- Le pouvoir est-il actif ?
    FOREIGN KEY (player_id) REFERENCES users(user_id),
    FOREIGN KEY (pouvoir_id) REFERENCES Pouvoir(ID_Pouvoir),
    PRIMARY KEY (player_id, pouvoir_id)
);

-- Table pour les sessions de jeu (multijoueur local)
CREATE TABLE game_sessions (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    theme_id INT,
    difficulty_id INT,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    current_player_turn INT,  -- ID du joueur dont c'est le tour
    FOREIGN KEY (theme_id) REFERENCES themes(theme_id),
    FOREIGN KEY (difficulty_id) REFERENCES difficulties(difficulty_id)
);

-- Table pour les joueurs d'une session de jeu (multijoueur local)
CREATE TABLE game_session_players (
    session_id INT,
    player_id INT,
    player_order INT,  -- Ordre des joueurs (1 = premier joueur, etc.)
    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    FOREIGN KEY (player_id) REFERENCES users(user_id),
    PRIMARY KEY (session_id, player_id)
);

-- Table pour les tours de jeu (cartes retournées, paires, et bombes)
CREATE TABLE game_rounds (
    round_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id INT,
    round_number INT,
    player_id INT,  -- Identifie quel joueur a joué ce tour
    card_id_1 INT,  -- Première carte retournée
    card_id_2 INT,  -- Deuxième carte retournée
    matched BOOLEAN DEFAULT FALSE,  -- Si les cartes sont une paire
    is_bomb_exploded BOOLEAN DEFAULT FALSE,  -- Si une bombe a explosé
    round_time INT,  -- Temps passé dans le tour (en secondes)
    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    FOREIGN KEY (card_id_1) REFERENCES cards(card_id),
    FOREIGN KEY (card_id_2) REFERENCES cards(card_id),
    FOREIGN KEY (player_id) REFERENCES users(user_id)
);

-- Table pour les pouvoirs utilisés pendant une session de jeu
CREATE TABLE game_session_powers (
    session_id INT,
    player_id INT,
    pouvoir_id INT,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Quand le pouvoir a été utilisé
    effect VARCHAR(255),  -- Effet du pouvoir (ex : "shuffle" pour mélanger les cartes)
    FOREIGN KEY (session_id) REFERENCES game_sessions(session_id),
    FOREIGN KEY (player_id) REFERENCES users(user_id),
    FOREIGN KEY (pouvoir_id) REFERENCES Pouvoir(ID_Pouvoir),
    PRIMARY KEY (session_id, player_id, pouvoir_id)
);
