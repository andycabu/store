import Form from "../components/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

function LoginPage() {
  const { loginUser, signInWithGoogle, user } = useUsers();
  const [newUser, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    // Obtén el nombre y el valor del elemento que cambió
    const name = e.target.name;
    const value = e.target.value;

    // Actualiza el objeto de estado (newUser) utilizando el nombre como clave
    // y el valor del elemento como valor
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    user && navigate("/");
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(newUser);
  };

  const contentForm = [
    {
      labelText: "Email ",
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
      autoComplete: "email",
      textButton: "Login",
    },
    {
      labelText: "Contraseña ",
      name: "password",
      placeholder: "********",
      //   typeInput: "password",
      onChange: handleChange,
      autoComplete: "current-password",
    },
  ];
  return (
    <div className="flex justify-center">
      <div className=" p-8 flex flex-col gap-4 bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <h1 className="font-bold text-2xl">Welcome back</h1>
        <p>
          Start your website in seconds. Don’t have an account?
          <Link
            className=" text-xs pl-2  pt-8 text-blue-500 hover:text-blue-600 hover:border-b border-blue-600"
            to={"/register"}
          >
            Sign up
          </Link>
          .
        </p>
        <Form
          style="flex gap-4 text-[var(--text-color)]"
          contentForm={contentForm}
          onSubmit={handleSubmit}
        />

        <button onClick={signInWithGoogle}>Iniciar sesión con Google</button>
      </div>
    </div>
  );
}

export default LoginPage;
