// app/success/page.tsx o pages/success.tsx
import React from 'react';

const SuccessPage = () => {
  return (
    <div className="container">
      <h1>¡Pago Exitoso!</h1>
      <p>Gracias por tu compra. Tu pago ha sido procesado correctamente.</p>
      <a href="/" className="cta-button">
        Volver al inicio
      </a>
    </div>
  );
};

export default SuccessPage;
