import React from "react";
import { resetPassword } from "../../firebase/auth";
import ModalConfirm from "./ModalConfirm";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const [show, setShow] = React.useState(false);

  const errorResponseMessages = {
    "auth/invalid-email": "El correo electrónico no es válido",
    "auth/wrong-password": "La contraseña es incorrecta",
    "auth/user-not-found": "El usuario no existe",
  };

  const handleReset = () => {
    setShow(false);
    resetPassword(localStorage.getItem("email"))
      .then(() => {
        toast.success(
          "Se ha enviado un correo electrónico para restablecer la contraseña"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        toast.error(errorResponseMessages[errorCode]);
      });
  };

  return (
    <>
      <button
        className="btn btn-outline-light d-flex align-items-center btn-sm m-1"
        onClick={() => setShow(true)}
        title="Cambiar contraseña"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-key"
          viewBox="0 0 16 16"
        >
          <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
          <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </button>

      <ModalConfirm
        show={show}
        setShow={setShow}
        title="Cambiar contraseña"
        message="¿Estás seguro de que quieres cambiar tu contraseña?"
        onConfirm={handleReset}
      />
      <Toaster />
    </>
  );
}
