import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import toast, { Toaster } from "react-hot-toast";

import CreateModal from "../components/areas/CreateModal";
import Table from "../components/areas/Table";

export default function Areas() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center m-5">
        <h2>Gestión de areas/departamentos</h2>

        <CreateModal
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
