import { useState, useEffect, createContext } from "react";

const AuthContext = createContext();

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
        setAuth(res);
        console.log(res)
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

export { AuthProvider };

export default AuthContext;
