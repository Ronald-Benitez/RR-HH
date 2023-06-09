import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Table from "../components/vacations/Table";
import Navbar from "../components/navbar/Navbar";
import AddVacationModal from "../components/vacations/AddVacationModal";
import { getVacations } from "../firebase/vacations";

export default function Vacations() {
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);
  const [vacations, setVacations] = useState([]);
  const [year, setYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    getVacations(year).then((vacations) => {
      const data = vacations.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setVacations(data || []);
    });
  }, [year, reload]);

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
          Vacaciones <small className="fs-5">{year}</small>
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
              <AddVacationModal
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
          vacations={vacations}
          reload={reload}
          setReload={setReload.bind(this)}
          year={year}
        />
      </div>
      <Toaster />
    </div>
  );
}
