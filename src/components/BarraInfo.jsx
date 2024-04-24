export default function BarraInfo() {
  return (
    <div className=" grid grid-cols-3 bg-[#741d51] py-1">
      <div className="md:flex md:justify-center items-center gap-1 md:gap-4 mx-5">
        <div className="mx-auto w-8 h-10">
          <img className=" w-full h-full" src="/img/icono1.png" alt="imagen" />
        </div>
        <p className=" text-white text-center m-0 font-sans text-[0.7rem] md:font-bold md:text-sm">
          Estilos personalizados , hecho a tu medida
        </p>
      </div>

      <div className="md:flex md:justify-center items-center gap-1 md:gap-4 mx-5">
        <div className="mx-auto w-10 h-10">
          <img className=" w-full h-full" src="/img/icono2.png" alt="imagen" />
        </div>
        <p className=" text-white text-center m-0 font-sans text-[0.7rem] md:font-bold md:text-sm">
          Encontra lo que buscas al mejor precio y calidad
        </p>
      </div>

      <div className="md:flex md:justify-center items-center gap-1 md:gap-4 mx-5">
        <div className="mx-auto w-10 h-10">
          <img className=" w-full h-full" src="/img/icono3.png" alt="imagen" />
        </div>
        <p className=" text-white text-center m-0 font-sans text-[0.7rem] md:font-bold md:text-sm">
          Nosotros te llevamos tus pedidos
        </p>
      </div>
    </div>
  );
}
