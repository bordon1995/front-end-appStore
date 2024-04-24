import {Outlet } from 'react-router-dom'
import Footer from './Footer';
export default function Auth() {
  return (
    <>
    <main className=' md:mt-1 pt-3 px-3'>
    <Outlet></Outlet>
    </main>
    <Footer></Footer>
    </>
  );
};
