const connection = require('./database');  // Connexion MySQL

async function createGameSession(themeId, difficultyId, players) {
    // Insérer une nouvelle session de jeu dans la table 'game_sessions'
    const [result] = await connection.execute(
        'INSERT INTO game_sessions (theme_id, difficulty_id, current_player_turn) VALUES (?, ?, ?)', 
        [themeId, difficultyId, players[0].user_id]  // Premier joueur commence
    );

    const sessionId = result.insertId;  // Récupérer l'ID de la session nouvellement créée

    // Ajouter les joueurs à la session de jeu
    for (let i = 0; i < players.length; i++) {
        await connection.execute(
            'INSERT INTO game_session_players (session_id, player_id, player_order) VALUES (?, ?, ?)',
            [sessionId, players[i].user_id, i + 1]
        );
    }

    return sessionId;
}
