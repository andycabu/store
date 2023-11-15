import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../../db/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [user, setUser] = useState();

  // Función para registrar un nuevo usuario
  const registerUser = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Usuario registrado con éxito, userCredential.user contiene la información del usuario
      setUser(userCredential);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const registeredUser = await signInWithPopup(auth, provider);
    setUser(registeredUser);
  };

  // Función para iniciar sesión
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Usuario inició sesión con éxito, userCredential.user contiene la información del usuario
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <UsersContext.Provider
      value={{ registerUser, loginUser, signInWithGoogle }}
    >
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
