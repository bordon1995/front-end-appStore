import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvaider";
import { useCart, usePedidos } from "./Hooks/useHook";
import Auth from "./authLayout/Auth";
import Home from "./authLayout/Home";
import Productos from "./paginas/Productos";
import Login from "./paginas/Login";
import Registro from "./paginas/Registro";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import MisPedidos from "./paginas/MisPedidos";
import Admin from "./paginas/Admin";

function App() {
  const usuarioProducto = useCart();
  const usuarioPedidos = usePedidos();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="registro" element={<Registro />} />
            <Route
              path="confirmar-cuenta/:token"
              element={<ConfirmarCuenta />}
            />
          </Route>

          <Route
            path="/home"
            element={<Home usuarioPedidos={usuarioProducto} />}
          >
            <Route
              index
              element={<Productos usuarioProducto={usuarioProducto} />}
            />
            <Route
              path="/home/mis-pedidos"
              element={<MisPedidos usuarioPedidos={usuarioPedidos} />}
            />
            <Route path="/home/mis-clientes" element={<Admin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
