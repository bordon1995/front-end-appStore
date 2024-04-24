import { Link } from "react-router-dom";
import { useEffect } from "react";
import {useParams} from "react-router-dom"
import Msg from "../authLayout/Msg";
import { useConfirmarCuenta } from "../Hooks/useHook";

export default function ConfirmarCuenta() {

  const {request,cargando,msg} = useConfirmarCuenta();

  const params = useParams();
    useEffect(()=>{
      request(params);
    },[]);

  return (
    <>
    {cargando &&
    <div className="text-[#741d51] font-black text-6xl md:px-5 md:p-5">
      {msg.typo === true ? <h1>Hubo un error</h1> : <h1>Cuenta Verificada</h1>}
      <div className="">
        {msg.typo === false ? <img src="/img/3-img.png" alt="imagen" /> : <img src="/img/4-img.png" alt="imagen" />}
      </div>
    </div>}
    <div className="md:p-5 flex flex-col justify-center">
    <div className=" md:shadow-lg md:px-5 rounded-xl md:bg-white flex flex-col justify-center">
        {!cargando && <Msg msg={msg}></Msg>}
      {msg.typo === false && <h2 className=" pt-5 font-black uppercase">Felicitaciones tu cuenta fue verificada correctamente , ya puedes iniciar sesion </h2>}
      {msg.typo === false && <form action="" className="md:w-4/5 p-10 text-center mx-auto">
      <Link className=" bg-[#741d51] text-center mb-5 w-full p-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-48" to="/">Inicia Sesion</Link>
      </form>}
    </div>
    </div>
    </>
  );
}
