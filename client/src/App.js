import './App.css';
import Home from './Components/Home/Home.jsx';
import { Route, Routes } from 'react-router-dom';
import Habitacion1 from './Components/Habitaciones/Habitacion1/Habitacion1.jsx';
import Habitacion2 from './Components/Habitaciones/Habitacion2/Habitacion2.jsx';
import Habitacion3 from './Components/Habitaciones/Habitacion3/Habitacion3.jsx'
import Habitacion4 from './Components/Habitaciones/Habitacion4/Habitacion4.jsx'
import Habitacion5 from './Components/Habitaciones/Habitacion5/Habitacion5.jsx'
import VillaArce from './Components/Habitaciones/Habitacion6/VillaArce.jsx'
import VillaTilo from './Components/Habitaciones/Habitacion7/VillaTilo.jsx' 
import VillaCedra from './Components/Habitaciones/Habitacion8/VillaCedra';
import VillaMadrid from './Components/Habitaciones/Habitacion9/VillaMadrid';
import Habitacion10 from './Components/Habitaciones/Habitacion10/Habitacion10.jsx'
import Habitacion11 from './Components/Habitaciones/Habitacion11/Habitacion11.jsx'
import Habitacion12 from './Components/Habitaciones/Habitacion12/Habitacion12.jsx'
import Habitacion13 from './Components/Habitaciones/Habitacion13/Habitacion13.jsx'
import Habitacion14 from './Components/Habitaciones/Habitacion14/Habitacion14.jsx'
import Reserva from './Components/Reserva/Reserva';
import Paquetes from './Components/Paquetes/Paquetes';
import Historia from './Components/Historia/Historia';
import InfoHotel from './Components/InfoHotel/Infohotel';
import Filosofia from './Components/Filosofia/Filosofia';
import Bienestar from './Components/Bienestar/Bienestar';
import DetailPaquete from './Components/DetailPaquete/DetailPaquete';
import Contacto from './Components/Contacto/Contacto';
import Login from './Components/Login/Login';
import ContenedorLogin from './Components/ContenedorLogin/ContenedorLogin';
import Login2 from './Components/Login2/Login2'
import Trekking from './Components/Servicios/Trekking/Trekking';
import Piscinatermal from './Components/Servicios/Piscinatermal/Piscinatermal';
import Yoga from './Components/Yoga/Yoga'
import DetalleReserva from './Components/DetalleReserva/DetalleReserva'
import Natacion from './Components/Servicios/Natacion/Natacion'
import Contenido2 from './Components/Contenido2/Contenido2'
import ExitoReserva from './Components/ExitoReserva/ExitoReserva'
import AdminHabitaciones from './Components/AdminHabitaciones/AdminHabitaciones';
import AdminPaquetes from './Components/AdminPaquetes/AdminPaquetes';
import AdminServicios from './Components/AdminServicios/AdminServicios';
import AdminUsuarios from './Components/AdminUsuarios/AdminUsuarios';
import IndicadorReservas from './Components/IndicadorReservas/IndicadorReservas';
import IndicadorReclamos from './Components/IndicadorReclamos/IndicadorReclamos';
import IndicadorUsuarios from './Components/IndicadorUsuarios/IndicadorUsuarios';
import PerfilUsuario from './Components/PerfilUsuario/PerfilUsuario.jsx'
import Error from './Components/Error/Error.jsx'
import axios from 'axios'
import './App.css';
import HabitacionCreada from './Components/HabitacionCreada/HabitacionCreada';
axios.defaults.baseURL ="https://hotelreservation-production.up.railway.app" ;

function App() {
  return (
    <div className='zoom-in fade-in'>

        <Routes>
          <Route path="/habitacion/:id" element={<HabitacionCreada />} />
          <Route path="/habitacion1" element={<Habitacion1 />} />
          <Route path="/habitacion2" element={<Habitacion2 />} />
          <Route path="/habitacion3" element={<Habitacion3 />} />
          <Route path="/habitacion4" element={<Habitacion4 />} />
          <Route path="/habitacion5" element={<Habitacion5 />} />
          <Route path="/habitacion6" element={<VillaArce />} />
          <Route path="/habitacion7" element={<VillaTilo />} />
          <Route path="/habitacion8" element={<VillaCedra />} />
          <Route path="/habitacion9" element={<VillaMadrid />} />
          <Route path="/habitacion10" element={<Habitacion10 />} />
          <Route path="/habitacion11" element={<Habitacion11 />} />
          <Route path="/habitacion12" element={<Habitacion12 />} />
          <Route path="/habitacion13" element={<Habitacion13 />} />
           <Route path="/habitacion14" element={<Habitacion14 />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/paquetes" element={<Paquetes/>} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/contenedor" element={<ContenedorLogin/>} />
          <Route path="/registrarse" element={<Login/>} />
          <Route path="/ingresar" element={<Login2/>} />
          <Route path="/piscina" element={<Piscinatermal/>} />
          <Route path="/trekking" element={ <Trekking/>} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/infoHotel" element={<InfoHotel />} />
          <Route path="/filosofia" element={<Filosofia />} />
          <Route path="/bienestar" element={<Bienestar />} />
          <Route path="/detail/:id" element={<DetailPaquete />} />
          <Route path="/yoga" element={<Yoga />} />
          <Route path="/detalleReserva" element={<DetalleReserva />} />
          <Route path="/natacion" element={<Natacion />} />
          <Route path="/chat" element={<Contenido2 />} />
          <Route path="/exitoreserva" element={<ExitoReserva />} />
          <Route path="/adminHabitaciones" element={<AdminHabitaciones />} />
          <Route path="/adminPaquetes" element={<AdminPaquetes />} />
          <Route path="/adminServicios" element={<AdminServicios />} />
          <Route path="/adminUsuarios" element={<AdminUsuarios />} />
          <Route path="/indicadorReservas" element={<IndicadorReservas />} />
          <Route path="/indicadorReclamos" element={<IndicadorReclamos />} />
          <Route path="/indicadorUsuarios" element={<IndicadorUsuarios />} />        
          <Route path="/perfilUsuario" element={<PerfilUsuario />} />
          <Route path='*' element={<Error />} />

          <Route path="/" element={<Home />} />
        </Routes>
       
    
    </div>
  );
}

export default App;

