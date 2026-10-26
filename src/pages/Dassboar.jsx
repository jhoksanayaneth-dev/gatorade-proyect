import "../estilos/dassboar.css"
import SidebarDashboard from '../component/SidebarDashboard'
import HeaderDashboard from '../component/HeaderDashboard'
import { Outlet } from 'react-router-dom';
export default function Dassboar() {

  return (
  <div className='cuerpo'>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
    <header className="encabezado-mafis">
      <HeaderDashboard />
      <section >
        <Outlet />
      </section>
    </header>
      <section className="panel-control">
        <SidebarDashboard />
      </section>
  </div>

  )
}
