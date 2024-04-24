import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#741d51] grid grid-cols-3 items-center text-center">
      <div className="mx-auto w-24 h-24 pt-1">
        <img className="w-full h-full" src="/img/footer1.png" alt="imagen" />
      </div>
      <div className="">
        <p className="text-white">Visita mi pagina web :</p>
        <p className="text-blue-400">www.sobre.com</p>
      </div>
      <div className="">
        <p className="text-white">Mas informacion sobre mi :</p>
        <div className=" h-11 w-11 mx-auto">
          <Link to={"https://www.linkedin.com/in/bordondaniel1995/"}>
            <img src="/img/linkedin.png" alt="imagen" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
