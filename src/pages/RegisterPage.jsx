import Form from "../components/Form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

function RegisterPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  //   const navigate = useNavigate();
  const { registerUser, signInWithGoogle } = useUsers();

  //   useEffect(() => {
  //     isAuthenticated && navigate("/login");
  //   }, [isAuthenticated]);

  const createUser = async ({ email, password }) => {
    console.log(email, password);
    registerUser(email, password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(newUser);
  };

  const handleChange = (e) => {
    // Obtén el nombre y el valor del elemento que cambió
    const name = e.target.name;
    const value = e.target.value;

    // Actualiza el objeto de estado (newUser) utilizando el nombre como clave
    // y el valor del elemento como valor
    setNewUser((prevNewUser) => ({
      ...prevNewUser,
      [name]: value,
    }));
  };
  const contentForm = [
    {
      labelText: "Email ",
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      autoComplete: "email",
      textButton: "signin",
      onChange: handleChange,
    },
    {
      labelText: "Escribe tu contraseña ",
      name: "password",
      placeholder: "********",
      autoComplete: "new-password",
      //   typeInput: "password",
      onChange: handleChange,
    },
  ];
  return (
    <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  mt-20">
      <Form
        title="Register"
        style="flex flex-col gap-4 text-[var(--text-color)]"
        contentForm={contentForm}
        onSubmit={handleSubmit}
      />
      <div className="flex text-xs justify-end items-center gap-4 pt-8 text-blue-500 hover:text-blue-600">
        <Link to="/login">Login</Link>
      </div>
      <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
    </div>
  );
}

export default RegisterPage;
