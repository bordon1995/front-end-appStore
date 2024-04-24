export default function Msg({ msg }) {
  return (
    <>
    <div className={`${msg.typo
        ? "from-red-400 to-red-600"
        : "from-indigo-400 to-indigo-600"} bg-gradient-to-t p-3 rounded-xl text-center font-black mb-3 text-white mt-3`}>
      {msg.mensaje}
    </div>
    </>
  );
}
