import Nav from "./Nav";
import NavUI from "./NavUI";
import BarraInfo from "./BarraInfo";
import BarraInfoUI from "./BarraInfoUI";

export default function Header({usuarioPedidos}) {
  return (
    <>
      <header className=" imagen h-[25rem] flex flex-col justify-between">

        <div className="hidden md:flex">
          <Nav usuarioPedidos={usuarioPedidos}></Nav>
        </div>
        <div className="block md:hidden">
          <NavUI usuarioPedidos={usuarioPedidos}></NavUI>
        </div>

        <div className="text-center">
          <h1 className=" text-white dancing-script font-black text-5xl md:text-8xl">
            Last-Collection
          </h1>
        </div>

        <div className=" hidden md:block">
          <BarraInfo></BarraInfo>
        </div>
        <div className="block md:hidden">
          <BarraInfoUI></BarraInfoUI>
        </div>

      </header>
    </>
  );
}
