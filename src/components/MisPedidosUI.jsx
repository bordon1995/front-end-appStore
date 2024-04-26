import { useEffect } from "react";
import { usePedidos } from "../Hooks/useHook";

export default function MisPedidosUI() {
  const usuarioPedidos = usePedidos();
  useEffect(() => {
    usuarioPedidos.getPedidos();
  }, [])

  return (
    <>
      {usuarioPedidos.pedido.length !== 0 && usuarioPedidos.pedido.map(ele =>
      <div key={ele.id}>
        <div className="my-2 mx-1 border-2 rounded-xl border-pink-800 bg-gray-900 bg-opacity-50 text-center">
          <div className="flex justify-around items-center p-1 space-x-3">
            <img className=" w-14 h-[60px] bg-center rounded-xl" src={`/img/${ele.imagen}`} alt="imagen de maya" />

            <div className="flex flex-col items-center">
              <h2 className="text-white dancing-script font-bold text-[16px] border-b-2 border-slate-200 md:text-lg">Modelo</h2>
              <p className="text-white mx-1 text-[9px] md:text-xs font-bold">{ele.nombre}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-white dancing-script font-bold text-[16px] border-b-2 md:text-lg border-slate-200">Fecha</h2>
              <p className="text-white w-full mx-auto text-[9px] md:text-xs font-bold">{ele.fecha}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-white dancing-script font-bold text-[16px] border-b-2 md:text-lg border-slate-200">Cantidad</h2>
              <div className="flex justify-start items-center">
                {usuarioPedidos.change.includes(ele.id) &&
                  <button onClick={() => usuarioPedidos.upCantidad(ele)} className="mx-1 px-1 rounded-lg bg-slate-200">+</button>
                }
                <p className="text-white w-full mx-auto text-[9px] md:text-xs font-bold">total : {ele.cantidad_total} U/s</p>
                {usuarioPedidos.change.includes(ele.id) &&
                  <button onClick={() => usuarioPedidos.upCantidad(ele, 'left')} className="mx-1 px-1.5 rounded-lg bg-slate-200">-</button>
                }
              </div>
            </div>
          </div>

          <div className="flex justify-around mx-1 pb-1 space-x-1">

            <div className="flex flex-col items-center">
              <h2 className="text-white dancing-script font-bold text-[16px] border-b-2 border-slate-200 md:text-lg">Total a Pagar</h2>
              <p className="text-white w-full mx-auto text-[9px] md:text-xs font-bold">total : $ {ele.precio_total}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-white mb-1 dancing-script font-bold text-[16px] md:text-lg border-b-2 border-slate-200">Estado</h2>
              <p className={`inline-block align-middle md:w-32 mx-auto mb-1 p-1 text-[9px] md:text-xs font-bold rounded-xl ${ele.id_estado === "1" && "bg-slate-200" || ele.id_estado === "2" && "bg-yellow-200" || ele.id_estado === "3" && "bg-yellow-200" || ele.id_estado === "4" && "bg-green-200"}`}>{ele.estado}</p>
            </div>

            <div className="flex flex-col items-center">
              <h2 className="text-white dancing-script font-bold text-[16px] md:text-lg border-b-2 border-slate-200">Precio</h2>
              <p className="text-white w-full mx-auto text-[9px] md:text-xs font-bold">{ele.precio} x u/s</p>
            </div>

          </div>

          <div className="flex justify-around items-center mx-1 pb-1 space-x-3">
            <div>
              <button
                disabled={ele.id_estado !== "1"}
                onClick={() => usuarioPedidos.setData(ele.id)} className=" h-5 w-5 md:h-7 md:w-7">
                {ele.id_estado === "1" ?
                  <img className="h-full w-full" src="../public/img/file-pen-solid.svg" alt="imagen" />
                  :
                  <img className="h-full w-full" src="../public/img/file-pen-solid2.svg" alt="imagen" />
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
        {
          usuarioPedidos.change.includes(ele.id) &&
            <div className="text-center">
              <button onClick={() => usuarioPedidos.fetchUpPedido(ele)} className="w-40 bg-[#741d51] rounded-xl text-white text-[11px] py-1">Guardar Cambios</button>
            </div>
          }
        </div>
      )}
    </>
  );
}
