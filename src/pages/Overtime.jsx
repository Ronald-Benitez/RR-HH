import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getEmployees } from "../firebase/employees";
import { getOvertimes, getOvertime } from "../firebase/overtime";
import AddOvertimeModal from "../components/overtime/AddOvertimeModal";
import Table from "../components/overtime/Table";

export default function Overtime() {
  const [overtime, setOvertime] = useState([]);
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getOvertimes(moment(date).format("MMMM-YYYY")).then((overtime) => {
      const data = overtime.docs.map((overtime) => ({
        id: overtime.id,
        ...overtime.data(),
      }));
      setOvertime(data || []);
    });
  }, [date, reload]);

  return (
    <div>
      <Navbar />
      <div className="">
        <p className="mt-5 text-center fs-2">
          Horas extraordinarias{" "}
          <small className="fs-5">{moment(date).format("MMMM YYYY")}</small>
        </p>
      </div>

      <div className="d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-4 mt-2">
          <h5 className="text-center">Fecha</h5>
          <input
            type="date"
            id="date"
            className="form-control"
            value={date.format("YYYY-MM-DD")}
            onChange={(e) => setDate(moment(e.target.value))}
          />
        </div>
        <div className="col-12 col-md-4 mt-2">
          <div className="row">
            <h5 className="text-center"> Registro </h5>
          </div>
          <div className="row mx-1">
            <AddOvertimeModal
              toaster={toast}
              reload={reload}
              setReload={setReload.bind(this)}
            />
          </div>
        </div>
      </div>

      <div className="m-5">
        <Table
          toaster={toast}
          reload={reload}
          setReload={setReload.bind(this)}
          overtimes={overtime}
        />
      </div>
      <Toaster />
    </div>
  );
}
