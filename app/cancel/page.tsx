// app/cancel/page.tsx o pages/cancel.tsx
import React from 'react';

const CancelPage = () => {
  return (
    <div className="container">
      <h1>Pago Cancelado</h1>
      <p>Tu pago ha sido cancelado. Si tienes alguna pregunta, por favor contáctanos.</p>
      <a href="/" className="cta-button">
        Volver al inicio
      </a>
    </div>
  );
};

export default CancelPage;
