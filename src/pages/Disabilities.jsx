import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getDisabilities } from "../firebase/disabilities";
import Table from "../components/disabilities/Table";
import AddDisabilityModal from "../components/disabilities/AddDisabilityModal";

export default function Disabilities() {
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);
  const [disabilities, setDisabilities] = useState([]);
  const [year, setYear] = useState(moment().format("YYYY"));

  useEffect(() => {
    getDisabilities(year).then((disabilities) => {
      const data = disabilities.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setDisabilities(data || []);
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
          Incapacidades <small className="fs-5">{year}</small>
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
              <AddDisabilityModal
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
          disabilities={disabilities}
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
