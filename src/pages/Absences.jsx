import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getAbsences } from "../firebase/absences";
import Table from "../components/absences/Table";
import AddAbsencesModal from "../components/absences/AddAbsencesModal";

export default function Absences() {
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    getAbsences(moment(date).format("YYYY")).then((absences) => {
      const data = absences.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setAbsences(data || []);
    });
  }, [date, reload]);

  return (
    <div>
      <Navbar />
      <div className="">
        <p className="mt-5 text-center fs-2">
          Faltas <small className="fs-5">{moment(date).format("YYYY")}</small>
        </p>
      </div>

      <div className="d-flex justify-content-center align-items-center">
        <div className="row w-75 justify-content-center">
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
              <AddAbsencesModal
                toaster={toast}
                reload={reload}
                setReload={setReload.bind(this)}
                dateSelected={moment(date).format("YYYY-MM-DD")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="m-5">
        <Table
          toaster={toast}
          absences={absences}
          reload={reload}
          setReload={setReload.bind(this)}
          date={date}
        />
      </div>
      <Toaster />
    </div>
  );
}
