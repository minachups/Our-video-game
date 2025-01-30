import React from 'react';

function Checkbox({ musicOn, handleMusicToggle, textColor }) {
  return (
    <div className="checkbox-container" style={{
      position: 'fixed', // Positionnement fixe
      bottom: '20px', // Espace du bas de l'écran
      right: '20px', // Espace du côté droit de l'écran
      display: 'flex', 
      alignItems: 'center', 
      zIndex: 2000 // Assure que l'élément reste au-dessus des autres éléments
    }}>
      {/* Le label affiche "Music On" ou "Music Off", avec une couleur conditionnelle */}
      <label 
        style={{
          color: textColor, 
          fontSize: '40px',  // Change la taille de la police à 40px
          marginRight: '10px'  // Un petit espacement entre le texte et la checkbox
        }}
      >
        Music {musicOn ? 'On' : 'Off'}
      </label>
      {/* Le checkbox avec des dimensions personnalisées */}
      <input 
        type="checkbox" 
        checked={musicOn} 
        onChange={handleMusicToggle} 
        style={{
          width: '37px', // Taille de la checkbox (largeur)
          height: '32px', // Taille de la checkbox (hauteur)
          cursor: 'pointer' // Change le curseur pour indiquer que c'est cliquable
        }}
      />
    </div>
  );
}

export default Checkbox;
