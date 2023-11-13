import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";

const Pruebas = () => {
  const prueba = () => {
    toast.warn("🦄 Wow so easy!", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Button onClick={prueba} text={"prueba"} />
    </div>
  );
};

export default Pruebas;
