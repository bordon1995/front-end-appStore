import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

export default function Productos({ usuarioProducto }) {

    const {auth} = useAuth();

    useEffect(() => {
        usuarioProducto.appInit();
    }, [])

    return (
        <>
            {/* <h2 className=" font-sans font-medium underline m-0 text-3xl md:text-4xl text-center text-black p-2">
                Nuestros Productos
            </h2> */}

            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 m-0.5 md:p-2 md:mx-20 ">
                {usuarioProducto.productos.map(ele => (
                    <>
                        <div className="flex">
                            <div key={ele.id} className=" border md:border-4 border-[#741d51] flex flex-col bg-white justify-center items-center md:w-64 mx-auto md:px-1 md:mb-2  rounded-2xl">
                                <div className=" w-full h-40 md:h-64">
                                    <img
                                        className=" h-full w-full bg-cover rounded-2xl"
                                        src={`/img/${ele.imagen}`}
                                        alt="imagen"
                                    />
                                </div>
                                <div className="w-full">
                                    <h3 className=" m-0 text-center md:text-xl font-semibold text-pretty md:font-black md:p-1">{ele.nombre}</h3>
                                    <p className=" w-[180px] md:text-lg md:w-[250px] text-[11px] ml-1 border-y border-gray-200">{ele.descripcion}</p>
                                    <span className=" mx-1 font-semibold text-xs md:text-lg">Precio: ${ele.precio} x u/s</span>
                                    <p className="mx-1 font-semibold text-xs md:text-lg">Minimo : 10 u/s</p>
                                    <p className="mx-1 font-semibold text-xs md:text-lg">Disponible : {ele.disponibilidad} u/s</p>
                                    {ele.cantidad >= 10 && <p className="mx-1 text-xs md:text-lg font-bold">Agregado : {ele.cantidad} u/s</p>}
                                </div>

                                <div className=" w-full text-center mt-1  mb-2 text-white rounded-md bg-[#741d51] flex justify-center md:justify-evenly items-center mx-auto">
                                    {ele.cantidad < 10 ? (
                                        <button onClick={() => usuarioProducto.addCart(ele)} className="md:py-2 rounded-md w-full text-center bg-[#741d51]">
                                            <p className="font-semibold text-base md:text-lg">Agregar</p>
                                        </button>
                                    ) : (
                                        <>
                                            <button className=" mx-2 my-0.5 px-2 md:py-1 border border-pink-300 rounded-full" onClick={() => usuarioProducto.addCart(ele)} >
                                                +
                                            </button>
                                            <p className="font-semibold text-xs md:text-lg" >Agregado</p>
                                            <button className="mx-2 my-0.5 px-2 md:py-1 border border-pink-300 rounded-full" onClick={() => usuarioProducto.addCart(ele, 'left')} >
                                                -
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                            {auth.administrador === "1" &&
                            <div className="flex flex-col items-center justify-end md:mb-10 mr-2">
                                <button className="my-2 md:my-5 h-6 w-6 md:h-11 md:w-10 bg-gray-900 bg-opacity-50 rounded-xl p-1">
                                    <img src="/img/file-pen-solid.svg" alt="imagen" />
                                </button>
                                <button className="my-2 md:my-5 h-6 w-6 md:h-11 md:w-10 bg-gray-900 bg-opacity-50 rounded-xl p-1">
                                    <img src="/img/trash-solid.svg" alt="imagen" />
                                </button>
                            </div>
                            }
                        </div>
                    </>
                ))}
            </div>

        </>
    )
}