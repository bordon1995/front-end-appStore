import { useEffect } from "react"
import MisPedidosUI from "../components/MisPedidosUI";

export default function MisPedidos({ usuarioPedidos }) {

    useEffect(() => {
        usuarioPedidos.getPedidos();
    }, [])

    return (
        <>
            <div className="md:hidden">
                <MisPedidosUI></MisPedidosUI>
            </div>

            <div className="hidden md:block">
                {usuarioPedidos.pedido.length !== 0 && usuarioPedidos.pedido.map(ele =>

                    <div key={ele.id}>
                        <div className="flex w-3/4 mx-auto border-4 border-pink-800 my-5 rounded-3xl bg-gray-900 bg-opacity-50">

                            <div className="flex flex-col justify-center items-center ml-5">
                                <img className="bg-center rounded-xl w-28 h-28" src={`/img/${ele.imagen}`} alt="imagen de maya" />
                            </div>

                            <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-3 text-center w-full ">

                                <div className="flex flex-col items-center">
                                    <h2 className="text-white dancing-script font-bold border-b-2 border-slate-200 text-2xl">Modelo</h2>
                                    <p className="text-white mx-1 text-sm font-bold">{ele.nombre}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h2 className="text-white dancing-script font-bold border-b-2 border-slate-200 text-2xl">Total a Pagar</h2>
                                    <p className="text-white w-full text-sm font-bold">total : $ {ele.precio_total}</p>
                                </div>

                                <div className="flex flex-col items-center">
                                    <h2 className="text-white dancing-script font-bold border-b-2 text-2xl border-slate-200">Cantidad</h2>
                                    <div className="flex justify-start items-center">
                                        {usuarioPedidos.change.includes(ele.id) &&
                                            <button onClick={() => usuarioPedidos.upCantidad(ele)} className="mx-1 px-2 rounded-lg bg-slate-200">+</button>
                                        }
                                        <p className="text-white w-full text-sm font-bold">total : {ele.cantidad_total} U/s</p>
                                        {usuarioPedidos.change.includes(ele.id) &&
                                            <button onClick={() => usuarioPedidos.upCantidad(ele, 'left')} className="mx-1 px-2.5 rounded-lg bg-slate-200">-</button>
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h2 className="text-white dancing-script font-bold  border-b-2 text-2xl border-slate-200">Fecha</h2>
                                    <p className="text-white w-full text-sm font-bold">{ele.fecha}</p>
                                </div>


                                <div className="flex flex-col items-center">
                                    <h2 className="text-white mb-1 dancing-script font-bold text-2xl border-b-2 border-slate-200">Estado</h2>
                                    <p className={`inline-block align-middle mb-1 p-1 text-sm font-bold rounded-xl ${ele.id_estado === "1" && "bg-slate-200" || ele.id_estado === "2" && "bg-yellow-200" || ele.id_estado === "3" && "bg-yellow-200" || ele.id_estado === "4" && "bg-green-200"}`}>{ele.estado}</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <h2 className="text-white dancing-script font-bold text-2xl border-b-2 border-slate-200">Precio</h2>
                                    <p className="text-white w-full text-sm font-bold">{ele.precio} x u/s</p>
                                </div>

                            </div>
                            <div className="flex flex-col justify-around items-center w-28">
                                <div>
                                    <button
                                        disabled={ele.id_estado !== "1"}
                                        onClick={() => usuarioPedidos.setData(ele.id)} className=" h-5 w-5 md:h-7 md:w-7">
                                        {ele.id_estado === "1" ?
                                            <img className="h-full w-full" src="/img/file-pen-solid.svg" alt="imagen" />
                                            :
                                            <img className="h-full w-full" src="/img/file-pen-solid2.svg" alt="imagen" />
                                        }
                                    </button>
                                </div>
                                <div>
                                    <button onClick={() => usuarioPedidos.deletePedido(ele)} className="h-5 w-5 md:h-7 md:w-7">
                                        <img className="h-full w-full" src="/img/trash-solid.svg" alt="imagen" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {usuarioPedidos.change.includes(ele.id) &&
                            <div className="text-center">
                                <button onClick={() => usuarioPedidos.fetchUpPedido(ele)} className="w-40 bg-[#741d51] rounded-xl text-white py-1">Guardar Cambios</button>
                            </div>
                        }
                    </div>
                )}
            </div>
        </>
    )
}
