import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLogin } from "../Hooks/useHook";
import { usuario } from "../context/AuthProvaider";
import Msg from "../authLayout/Msg";
import useAuth from "../Hooks/useAuth";

export default function Login() {

  const [view, setView] = useState([]);
  const { handleChange, useUsuario, handleSubmit, msg } = useLogin();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    const produc = async () => {
      await usuario.main();
      setView([...usuario.productos])
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
      <div className="flex flex-col items-center justify-center mb-10">
      <div className="flex md:grid gap-5 grid-cols-3 mx-auto h-80 overflow-x-auto w-[300px] md:overflow-auto md:w-[1000px] my-2 scrooll">
        {view.map(ele =>
          <div key={ele.id} className=" border md:border-4 border-[#741d51] flex flex-col bg-white justify-center items-center md:w-60 md:mx-20 md:px-1 mb-5 mt-5  rounded-2xl">
            <div className=" w-full h-40 md:h-64">
              <img
                className=" h-full w-full bg-cover rounded-2xl"
                src={`/img/${ele.imagen}`}
                alt="imagen"
              />
            </div>
            <div className="w-40">
              <h3 className=" m-0 text-center md:text-xl font-semibold text-pretty md:font-black md:p-1"></h3>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
