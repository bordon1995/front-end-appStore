import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

export default function BarraInfoUI() {

  const {auth} = useAuth();
  console.log(auth)

  return (
    <div className=" grid grid-cols-3 bg-[#741d51] p-1">
      <div className="mx-auto w-10 h-10">
        <button>
          <Link to={"/"}>
            <img
              className=" w-full h-full"
              src="/img/door-open-solid.svg"
              alt="imagen"
            />
          </Link>
        </button>
      </div>

      <div className="mx-auto w-10 h-10">
        <button>
          <Link to={"/home"}>
            <img
              className=" w-full h-full"
              src="/img/house-solid.svg"
              alt="imagen"
            />
          </Link>
        </button>
      </div>

      <div className="mx-auto w-8 h-8">
        <button>
          <Link to={auth.respuesta?.administrador === "0" ? "/home/mis-pedidos" : "/home/mis-clientes"}>
          <img
            className=" w-full h-full"
            src="/img/user-solid.svg"
            alt="imagen"
          />
          </Link>
        </button>
      </div>
    </div>
  );
}
