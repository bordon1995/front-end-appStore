import { Link } from "react-router-dom";
import Msg from "../authLayout/Msg";
import { useRegistro } from "../Hooks/useHook";

export default function Registro() {
  
  const {handleChange,useUsuario,handleSubmit,msg} = useRegistro();

  return(
    <>
    <div className="container mx-auto md:grid md:grid-cols-2">
    <div className="md:px-5 md:p-5">
      <h1 className="text-cyan-400 font-black text-6xl">Registrate y Administra tus </h1>
      <span className="text-white text-6xl font-black ">Pedidos</span>
      <div className=" hidden sm:block">
        <img src="/img/1-img.png" alt="imagen" />
      </div>
    </div>
    <div className="md:p-5">
    <div className=" md:shadow-lg md:px-5 rounded-xl md:bg-white flex flex-col justify-center">
        {msg.mensaje && <Msg msg={msg} ></Msg>}
      <form onSubmit={e => handleSubmit(e)} action="" className="md:w-4/5 pt-5">

      <div className="mb-5">
          <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Nombre</label>
          <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="text"
          placeholder="Tu Nombre"
          name="nombre"
          id="nombre"
          value={useUsuario.nombre}
          onChange={(e) => handleChange(e)} />
        </div>

        <div className="mb-5">
          <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Apellido</label>
          <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="text"
          placeholder="Tu Apellido"
          name="apellido"
          id="apellido"
          value={useUsuario.apellido}
          onChange={(e) => handleChange(e)} />
        </div>

        <div className="mb-5">
          <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Email</label>
          <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="email"
          placeholder="Tu Correo"
          name="email"
          id="correo"
          value={useUsuario.correo}
          onChange={(e) => handleChange(e)} />
        </div>

        <div className="mb-5">
          <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Password</label>
          <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="password"
          placeholder="Tu Password"
          name="password"
          id="password"
          value={useUsuario.password}
          onChange={(e) => handleChange(e)} />
        </div>

        <div className="mb-5">
          <label className="uppercase text-gray-400 block text-xl font-bold" htmlFor="">Repetir Password</label>
          <input className="border w-full p-3 mt-3 bg-gray-50 rounded-xl gap-14" type="password"
          placeholder="Repetir Password"
          id="resetPassword"
          value={useUsuario.resetPassword}
          onChange={(e) => handleChange(e)} />
        </div>

        <input type="submit" className=" bg-[#741d51] w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-48" />
      </form>

      <nav className="mt-5 lg:flex lg:justify-between  md:w-4/5 mx-auto">
        <Link className="block text-center my-5 text-gray-500" to="/">¿Ya tienes una cuenta? Inicia Sesion</Link>
        <Link className="block text-center my-5 text-gray-500" to="/registrar">Olvide mi Password</Link>
      </nav>
    </div>
    </div>
    </div>
    </>
  );
}
