import React from 'react';
import CardActivos from './CardActivos';
import CardOrdenes from './CardOrdenes';
import CardMantenimiento from './CardMantenimiento';
import CardGafrica from './CardGafrica';
import CardCategorias from './CardCategorias';
import CardActividadReciente from './CardActividadReciente';
import CardAlertas from './CardAlertas';

export default function DashboardContent() {
  return (
    <section className="contenido-mafis">
      <CardActivos />
      <CardOrdenes />
      <CardMantenimiento />
      <CardGafrica />
      <CardCategorias />
      <CardActividadReciente />
      <CardAlertas />
    </section>
  );
}