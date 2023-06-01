import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "../firebase/firebaseConfig";

const authMiddleware = (Component) => {
  return () => {
    const history = useHistory();

    useEffect(() => {
      const auth = getAuth(app);
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Redireccionar al inicio de sesión si el usuario no está autenticado
          history.push("/login");
        }
      });

      return () => {
        unsubscribe();
      };
    }, [history]);

    return <Component />;
  };
};

export default authMiddleware;
