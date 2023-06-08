import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/navbar/Navbar";
import Table from "../components/evaluations/Table";

export default function EvaluationsList() {
  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center mx-5 mb-2 mt-3">
        <h2>Gestión de evaluaciones</h2>
      </div>
      <Table toaster={toast} />
      <Toaster />
    </div>
  );
}
