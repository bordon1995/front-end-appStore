import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../Hooks/useHook";
import { usuario } from "../context/AuthProvaider";
import Msg from "../authLayout/Msg";
import useAuth from "../Hooks/useAuth";

export default function Login() {

  const [view, setView] = useState({});
  const { handleChange, useUsuario, handleSubmit, msg } = useLogin();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const produc = async () => {
      await usuario.pruevaget();
      setView(usuario.prueva)
    }
    produc();
  }, [])

  const submit = async (e) => {
    e.preventDefault();

    const respuesta = await handleSubmit();

    if (respuesta) {
      setAuth(respuesta)
      navigate("/home");
    };

  }

  return (
    <>
      <div className="container mx-auto md:grid md:grid-cols-2">
        <div className="md:px-5">
          <h1 className=" text-cyan-400 font-black text-6xl">Inicia Sesion y Administra tus</h1>
          <span className="text-white font-black text-6xl">Pedidos</span>
          <div className=" hidden sm:block">
            <img src="/img/2.img.png" alt="imagen" />
          </div>
        </div>
        <div className="md:pt-5 px-5">
          <div className=" md:shadow-lg md:px-5 rounded-xl md:bg-white">
            {msg.mensaje && <Msg msg={msg} ></Msg>}
            <form action="" className="md:w-4/5 pt-5">
              <div className="mb-5">
                <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Email</label>
                <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="text"
                  placeholder="Tu Correo"
                  id="correo"
                  value={useUsuario.correo}
                  onChange={(e) => handleChange(e)} />
              </div>

              <div className="mb-5">
                <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Password</label>
                <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="text"
                  placeholder="Tu Password"
                  id="password"
                  value={useUsuario.password}
                  onChange={(e) => handleChange(e)} />
              </div>

              <input type="submit"
                onClick={(e) => submit(e)}
                className=" bg-[#741d51] w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-48" />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between  md:w-4/5  m-auto">
              <Link className="block text-center my-5 text-gray-500" to="/registro">¿No tienes una cuenta? Registrate</Link>
              <Link className="block text-center my-5 text-gray-500" to="/registrar">Olvide mi Password</Link>
            </nav>
          </div>
        </div>
      </div>
      <p className="text-white">{view.respuesta}</p>
    </>
  );
}
