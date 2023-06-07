import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/navbar/Navbar";
import Table from "../components/evaluation/Table";
import AddModal from "../components/evaluation/AddModal";
import { createEvaluationTemplate } from "../firebase/evaluationTemplate";

export default function EvaluationTemplate() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center mx-5 mb-2 mt-3">
        <h2>Gestión de empleados</h2>

        <AddModal
          toaster={toast}
          reload={reload}
          setReload={setReload.bind()}
        />
      </div>
      <Table toaster={toast} reload={reload} setReload={setReload.bind()} />
      <Toaster />
    </div>
  );
}
