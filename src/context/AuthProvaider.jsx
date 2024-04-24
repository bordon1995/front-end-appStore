import { useState, useEffect, createContext } from "react";
import {Usuario} from "../clases/Usuario.js";
import { Pedidos } from "../clases/Pedidos.js";

const AuthContext = createContext();

const usuario = new Usuario();
const pedidos = new Pedidos();

const AuthProvider = ({ children }) => {
  const [cargando,setCargando] = useState(true);
  const [auth, setAuth] = useState({});
  
  useEffect(()=>{
    const isAuth = async () => {
      const token = localStorage.getItem('token');
      if(!token){
        setCargando(false)
        return;
      }
     
      const config = {
        headers:{
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        }
      }

      try {
        const req = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/perfil`,config);
        const res = await req.json();
        console.log(res)
        setAuth(res);
        usuario.setUsuario(res.respuesta);
        pedidos.setUsuario(res.respuesta);
      } catch (error) {
        console.log(error)
        setAuth({});
      }
      setCargando(false);
    } 
    isAuth();
  },[])

  const logoAuth = () => {
    localStorage.removeItem('token');
    setAuth({});
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        logoAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider , usuario , pedidos};

export default AuthContext;
