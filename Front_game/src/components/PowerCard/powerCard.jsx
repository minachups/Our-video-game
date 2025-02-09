import React from 'react';
import DeskCard from '../DeskCard/DeskCard';

function PowerCard({ power }) {
  return (
    <DeskCard
      title={power.Nom_Pouvoir}
      image={`http://localhost:5000/public/${power.Image_Pouvoir}`} // Assurez-vous que le chemin est correct
      description={power.Description_Pouvoir}
    />
  );
}

export default PowerCard;