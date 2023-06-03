import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getBonuses } from "../firebase/bonuses";
import AddBonusesModal from "../components/bonuses/AddBonusesModal";
import Table from "../components/bonuses/Table";

export default function Bonuses() {
  const [bonuses, setBonuses] = useState([]);
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getBonuses(moment(date).format("MMMM-YYYY")).then((bonuses) => {
      const data = bonuses.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setBonuses(data || []);
    });
  }, [date, reload]);

  return (
    <div>
      <Navbar />
      <div className="">
        <p className="mt-5 text-center fs-2">
          Bonos{" "}
          <small className="fs-5">{moment(date).format("MMMM YYYY")}</small>
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
              <AddBonusesModal
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
          bonuses={bonuses}
          reload={reload}
          setReload={setReload.bind(this)}
          date={date}
        />
      </div>
      <Toaster />
    </div>
  );
}
