import React from 'react';
import './Error.css';

const Error = () => {
  return (
    <div className="error_container">
      <h4>Résultat de la reherche: Pas de résultat.</h4>
      <p>
        Ce streamer n'éxiste pas. Veuillez vérifier l'orthographe de votre
        saisie.
      </p>
    </div>
  );
};

export default Error;
