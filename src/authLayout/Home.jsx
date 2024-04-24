import {Outlet , Navigate } from 'react-router-dom'
import useAuth from '../Hooks/useAuth';
import Header from '../components/Header';
import Footer from './Footer';

export default function Home({cart}) {
  const { auth,cargando } = useAuth();
  if(cargando) return 'cargando...';
  return (
    <>
    <Header cart={cart}></Header>
    <main className=' main h-[600px]  overflow-auto scrooll mx-auto'>
    {auth.respuesta?.id ? <Outlet></Outlet> : <Navigate to="/"></Navigate>}
    </main>
    <Footer></Footer>
    </>
  );
};
