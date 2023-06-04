import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import AddPositionModal from "../components/positions/AddPositionModal";
import Table from "../components/positions/Table";

export default function Positions() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center m-5">
        <h2>Gestión de puestos</h2>

        <AddPositionModal
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
