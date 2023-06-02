import Modal from "react-modal";
import { useEffect, useState } from "react";

import ModalStyle from "../../utils/ModalStyle";
import { confirmPasswordReset } from "firebase/auth";

export default function Totals({ see, setSee, data }) {
  Modal.setAppElement("#root");
  const [totals, setTotals] = useState(data);
  const [totalPayroll, setTotalPayroll] = useState(0);

  useEffect(() => {
    setTotals(data);
    setTotalPayroll(
      data.totalSalaries +
        data.totalAfpEmployer +
        data.totalIsssEmployer +
        data.totalExtraHours +
        data.totalBonuses +
        data.totalVacations +
        data.totalAguinaldo
    );
  }, [data]);

  return (
    <Modal
      isOpen={see}
      onRequestClose={() => setSee(false)}
      style={ModalStyle}
      contentLabel="Totales"
    >
      <div className="container">
        <div className="text-center">
          <h2>Totales</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Salarios</h3>
              <p className="mb-0">Total: ${totals.totalSalaries}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Descuentos</h3>
              <p className="mb-0">AFP: ${totals.totalAfpEmployee}</p>
              <p className="mb-0">ISSS: ${totals.totalIsssEmployee}</p>
              <p className="mb-0">Renta: ${totals.totalRenta}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Patronales</h3>
              <p className="mb-0">AFP: ${totals.totalAfpEmployer}</p>
              <p className="mb-0">ISSS: ${totals.totalIsssEmployer}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Extras</h3>
              <p className="mb-0">Horas extras: ${totals.totalExtraHours}</p>
              <p className="mb-0">Bonos: ${totals.totalBonuses}</p>
              <p className="mb-0">Vacaciones: ${totals.totalVacations}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Aguinaldo</h3>
              <p className="mb-0">Aguinaldo: ${totals.totalAguinaldo}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-center p-3">
              <h3 className="h5 font-weight-bold">Total planilla</h3>
              <p className="mb-0">Total: ${totalPayroll}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
