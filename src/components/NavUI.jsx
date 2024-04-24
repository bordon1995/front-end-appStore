import { Link } from "react-router-dom";
import { pedidos } from "../context/AuthProvaider";

export default function NavUI({cart}) {

  const isEmty = () => cart.cart.length === 0;

  const sendPedidos = async () =>{
    await pedidos.add(cart.cart);
    cart.vaciarCart();
  }

  return (
    <div className="py-1 w-full flex justify-between items-center bg-[#741d51]">
      <div>
        <p className=" mx-1 p-1 text-white">
          Contacto :{" "}
          <span className=" text-cyan-400">ciudadela1995@gmail.com</span>
        </p>
      </div>

      <div className="submenu mx-3 w-10 h-10">
        <img
          className=" w-full h-full"
          src="/img/cart2.png"
          alt="imagen"
        />
        <div
          id="carrito"
          className=" hidden bg-white rounded-xl absolute right-1 top-12"
        >
          <div className=" w-80">
            <ul className="list-none">
              <li>
              {isEmty() ? <h1 className="text-center font-bold">El carrito esta vacio</h1> :
              <>
                <table id="lista-carrito" className=" px-1 w-full">
                  <thead className="w-full text-center">
                    <tr className="">
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody className="w-full text-center">
                    {cart.cart.map(ele =>
                    <tr key={ele.id} className=" border-b border-slate-500">
                    <td>
                      <img
                        className=" h-16 w-16"
                        src={`/img/${ele.imagen}`}
                        alt="imagen"
                      />
                    </td>
                    <td>
                      <p>{ele.nombre} </p>
                    </td>
                    <td>
                      <p>{ele.precio}</p>
                    </td>
                    <td>
                      <div>
                        <p>
                          <button onClick={() => cart.addCart(ele)}
                                  className="m-1 px-1 border">+</button>
                          {ele.cantidad}
                          <button onClick={() => cart.addCart(ele, "left")}
                                  className="m-1 px-1 border">-</button>
                        </p>
                      </div>
                    </td>
                  </tr> 
                    )}
                  </tbody>    
                </table>
                <div className="flex justify-between p-2">
                  <button onClick={() => cart.vaciarCart()} className=" bg-gray-400 p-1 px-5 rounded-xl text-white font-bold">
                    Vaciar Carrito
                  </button>
                  <button onClick={() => sendPedidos(cart)} className=" bg-[#741d51] p-1 px-5 rounded-xl text-white font-bold">
                    Enviar Pedido
                  </button>
                </div>
                </> 
                  }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}