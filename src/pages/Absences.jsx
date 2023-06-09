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
  const [year, setYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    getAbsences(year).then((absences) => {
      const data = absences.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setAbsences(data || []);
    });
  }, [date, reload, year]);

  const renderYearSelector = () => {
    const years = [];

    for (let i = 2010; i <= moment().format("YYYY"); i++) {
      years.push(i);
    }
    years.reverse();

    return (
      <select
        className="form-select"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

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
            <h5 className="text-center">Año</h5>
            {renderYearSelector()}
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
          year={year}
          date={date}
        />
      </div>
      <Toaster />
    </div>
  );
}
