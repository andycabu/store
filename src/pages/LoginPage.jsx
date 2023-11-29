import Form from "../components/Form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { isAuthenticated, signIn } = useUsers();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { t } = useTranslation();

  const navigate = useNavigate();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  useEffect(() => {
    isAuthenticated && navigate("/");
  }, [isAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(user);
  };

  const contentForm = [
    {
      labelText: t("login_or_register.email"),
      name: "email",
      placeholder: "prueba@prueba.com",
      typeInput: "email",
      onChange: handleChange,
      autoComplete: "email",
      textButton: t("login_or_register.login"),
    },
    {
      labelText: t("login_or_register.password"),
      name: "password",
      placeholder: "********",
      typeInput: "password",
      onChange: handleChange,
      autoComplete: "current-password",
    },
  ];

  return (
    <div className="flex justify-center max-sm:p-4">
      <div className=" p-8 flex flex-col gap-4 bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <h1 className="font-bold text-2xl">
          {t("login_or_register.welcome")} {t("login_or_register.back")}
        </h1>
        <p>
          {t("login_or_register.account_false")}
          <Link
            className=" text-xs pl-2  pt-8 text-blue-500 hover:text-blue-600 hover:border-b border-blue-600"
            to="/register"
          >
            {t("login_or_register.sign_up")}
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
};

export default LoginPage;
