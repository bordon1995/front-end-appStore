import { useEffect } from "react";
import { useClientes } from "../Hooks/useHook";

export default function Admin() {

  const { init, clientes, handelChange, change, options, remove, removePedido, upDatePedido, id } = useClientes();

  useEffect(() => {
    const getClientes = async () => {
      await init();
    };
    getClientes();
  }, []);

  return (
    <>
    {clientes.length === 0 ? 
    <>
    <h1 className="text-center font-bold text-xl my-5">No hay Pedidos</h1>
    <div className=" mt-2 rounded-md p-1 mx-5 text-center ">
     <table className=" table-auto font-semibold text-white text-center">
     <thead>
       <tr className=" bg-slate-500">
         <th className="px-2 border w-52 border-gray-400 rounded-ss-xl">
           Modelo
         </th>
         <th className="px-2 border w-52 border-gray-400">Cliente</th>
         <th className="px-2 border w-52 border-gray-400">Contacto</th>
         <th className="px-2 border w-52 border-gray-400">Estado</th>
         <th className="px-2 border w-52 border-gray-400">cantidad total</th>
         <th className="px-2 border w-52 border-gray-400">fecha</th>
         <th className="px-2 border w-52 border-gray-400">Monto a cobrar</th>
         <th className="px-2 border w-52 border-gray-400">Cambiar Estado</th>
         <th className="px-2 border w-52 border-gray-400">Notificar</th>
         <th className="px-2 border w-52 border-gray-400 rounded-se-xl">
           Eliminar
         </th>
       </tr>
     </thead>
   </table>
   </div>
   </>
     : 
    <div className=" mt-2 rounded-md p-1 mx-5 text-center overflow-x-auto">
      <table className=" table-auto font-semibold text-white text-center">
        <thead>
          <tr className=" bg-slate-500">
            <th className="px-2 border w-52 border-gray-400 rounded-ss-xl">
              Modelo
            </th>
            <th className="px-2 border w-52 border-gray-400">Cliente</th>
            <th className="px-2 border w-52 border-gray-400">Contacto</th>
            <th className="px-2 border w-52 border-gray-400">Estado</th>
            <th className="px-2 border w-52 border-gray-400">cantidad total</th>
            <th className="px-2 border w-52 border-gray-400">fecha</th>
            <th className="px-2 border w-52 border-gray-400">Monto a cobrar</th>
            <th className="px-2 border w-52 border-gray-400">Cambiar Estado</th>
            <th className="px-2 border w-52 border-gray-400">Notificar</th>
            <th className="px-2 border w-52 border-gray-400 rounded-se-xl">
              Eliminar
            </th>
          </tr>
        </thead>

        <tbody className="rounded-es-xl">
        {clientes.map(ele => 
          <tr key={ele.id} className="bg-gray-900 bg-opacity-50">
            <td className="px-2 border w-52 border-gray-400">
              {ele.nombre}
            </td>
            <td className="px-2 border w-52 border-gray-400">{ele.cliente}</td>
            <td className="px-2 border w-52 border-gray-400">
              {ele.contacto}
            </td>
            <td className="px-2 border w-52 border-gray-400">{ele.estado}</td>
            <td className="px-2 w-52 border border-gray-400">{ele.cantidad_total}</td>
            <td className="w-52 px-2 border border-gray-400">{ele.fecha}</td>
            <td className=" w-52 px-2 border border-gray-400">{ele.precio_total}</td>
            <td className="px-2 w-52 border border-gray-400">
              <select
                onChange={(eve) => handelChange(eve,ele)}
                className=" text-black no-underline"
                id="3"
              ><option value={ele.id_estado}>{ele.estado}</option>
                {options.map(val =>
                val.label !== ele.estado && <option key={val.value} value={val.value}>{val.label} </option>
              )}
              </select>
            </td>
            <td className=" w-52 px-2 border border-gray-400">
              <button
               disabled={!id.includes(ele.id)}
               onClick={() => upDatePedido(ele)}
               id="cata"
               className={`px-2 h-full rounded-full text-white ${change.length > 0 && id.includes(ele.id) ? "bg-[#82d4f7]" : "bg-slate-200" }`}>
                Enviar
              </button>
            </td>
            <td className=" w-52 px-2 border border-gray-400">
              <button
              onClick={() => removePedido(ele)} 
              disabled={!remove.includes(ele.id)}
              className={`px-2 h-full rounded-full text-white ${remove.includes(ele.id) ? "bg-red-400" : "bg-slate-200"}`}>
                Eliminar
              </button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
     }
    </>
  );
}
