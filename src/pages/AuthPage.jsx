import React from "react";
import { login } from "../firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import { set, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../firebase/auth";
import firebaseErrorMessages from "../utils/firebaseErrorMessages";

export default function AuthPage() {
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const history = useHistory();

  const handleResetPassword = () => {
    if (email === "") {
      toast.error("Ingrese un correo electrónico");
    } else {
      resetPassword(email)
        .then(() => {
          // Password reset email sent!
          toast.success(
            "Se ha enviado un correo electrónico para restablecer la contraseña"
          );
          setIsOpen(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          toast.error(firebaseErrorMessages[errorCode]);
        });
    }
  };

  const onSubmit = () => {
    login(email, password)
      .then((userCredential) => {
        // Signed in
        toast.success("Inicio de sesión exitoso");
        localStorage.setItem("email", email);
        // ...

        history.push("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(firebaseErrorMessages[errorCode]);
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
              <button
                type="button"
                className="btn btn-outline-light mt-2"
                onClick={() => handleResetPassword()}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
