import React from "react";
import { login } from "../firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { set, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

export default function AuthPage() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  const errorResponseMessages = {
    "auth/invalid-email": "El correo electrónico no es válido",
    "auth/wrong-password": "La contraseña es incorrecta",
    "auth/user-not-found": "El usuario no existe",
  };

  const onSubmit = () => {
    login(email, password)
      .then((userCredential) => {
        // Signed in
        toast.success("Inicio de sesión exitoso");
        // ...
        setTimeout(() => {
          history.push("/");
        }
        , 500);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorResponseMessages[errorCode]);
      });
  };

  return (
    <div className="container bg-black text-white mt-5">
      <div className="row justify-content-center align-items-center bg-black text-white">
        <div className="col-12 col-md-5 bg-black text-white">
          <div className="card text-center bg-black text-white border border-light">
            <div className="card-header">
              <h3 className="card-title">Iniciar sesión</h3>
            </div>
            <div className="card-body mt-3 p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control bg-black text-white"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control bg-black text-white"
                    placeholder="Password"
                    {...register("password", { required: true })}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-outline-light">
                  Iniciar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
