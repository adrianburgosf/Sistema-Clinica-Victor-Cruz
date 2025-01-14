import React from "react";
import {
  BrowserRouter,
  //createBrowserRouter,
  Route,
  //RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./Modules/Home/Home";
import Citas from "./Modules/Home/Citas";
import IniciarSesion from "./Modules/Home/IniciarSesion";
import Servicios from "./Modules/Home/Servicios";
import Acercade from "./Modules/Home/Acercade";
import Laboratorio from "./Modules/Home/Laboratorio";
import RegistrarUser from "./Modules/Home/RegistrarUser";
import Expedientes from "./Modules/Expedientes/Expedientes";
import AddExpedientes from "./Modules/Expedientes/AddExpedientes";
import EditExpedientes from "./Modules/Expedientes/EditExpedientes";
import Administrador from "./Modules/usuario_admin/administrador";
import Dashboard from "./Modules/Expedientes/Dashboard";
import Contactanos from "./Modules/Home/Contactanos";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/iniciarsesion" element={<IniciarSesion />} />
          <Route path="/acerca-de" element={<Acercade />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/laboratorio" element={<Laboratorio />} />
          <Route path="/registrar-user" element={<RegistrarUser />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/expedientes" element={<Expedientes />} />
          <Route path="/expedientes/crear" element={<AddExpedientes />} />
          <Route path="/expedientes/:expedienteId" element={<EditExpedientes />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contactanos" element={<Contactanos />} />

          <Route path="/" element={<Home/>}/>
          <Route path="/iniciarsesion" element={<IniciarSesion/>}/>
          <Route path="/acerca-de" element={<Acercade/>}/>
          <Route path="/servicios" element={<Servicios/>}/>
          <Route path="/laboratorio" element={<Laboratorio/>}/>
          <Route path="/registrar-user" element={<RegistrarUser/>}/>
          <Route path="/citas" element={<Citas/>}/>
          <Route path ="/Administrador" element={<Administrador/>}/>
          <Route path="/expedientes" element={<Expedientes/>}/>
          <Route path="/expedientes/crear" element={<AddExpedientes/>}/>
          <Route path="/expedientes/:expedienteId" element={<EditExpedientes/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
