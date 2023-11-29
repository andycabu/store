import Form from "../components/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";

function RegisterPage() {
  const { isAuthenticated, signUp } = useUsers();
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  console.log(newUser);
  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUser);
    signUp(newUser);
  };

  const contentForm = [
    {
      labelText: t("nombre de usuario"),
      name: "userName",
      placeholder: "Nickname",
      typeInput: "name",
      onChange: handleChange,
      autoComplete: "name",
      textButton: t("login_or_register.register"),
    },
    {
      labelText: t("login_or_register.email"),
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
      autoComplete: "email",
    },
    {
      labelText: t("login_or_register.password"),
      name: "password1",
      placeholder: "********",
      typeInput: "password",
      onChange: handleChange,
      autoComplete: "new-password",
    },
    {
      labelText: "Repite la contraseña",
      name: "password2",
      placeholder: "********",
      typeInput: "password",
      autoComplete: "new-password",
      onChange: handleChange,
    },
  ];

  return (
    <div className="flex justify-center max-sm:p-4">
      <div className=" p-8 flex flex-col gap-4 bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <h1 className="font-bold text-2xl">{t("login_or_register.welcome")}</h1>
        <p>
          {t("login_or_register.account_true")}
          <Link
            className=" text-xs pl-2  pt-8 text-blue-500 hover:text-blue-600 hover:border-b border-blue-600"
            to="/login"
          >
            {t("login_or_register.sign_in")}
          </Link>
        </p>
        <Form
          style="flex flex-col  gap-4 text-[var(--text-color)]"
          contentForm={contentForm}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
