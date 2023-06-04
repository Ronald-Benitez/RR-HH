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
      <div className="container overflow-auto">
        <div className="text-center">
          <h2>Totales</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Salarios</h3>
              <p className="mb-1 text-right">Total: ${totals.totalSalaries}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Descuentos</h3>
              <p className="mb-1 text-right">AFP: ${totals.totalAfpEmployee}</p>
              <p className="mb-1 text-right">
                ISSS: ${totals.totalIsssEmployee}
              </p>
              <p className="mb-1 text-right">Renta: ${totals.totalRenta}</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Patronales</h3>
              <p className="mb-1 text-right">AFP: ${totals.totalAfpEmployer}</p>
              <p className="mb-1 text-right">
                ISSS: ${totals.totalIsssEmployer}
              </p>
              <p className="mb-1 text-right">
                Insaforp: ${totals.totalInsaforp}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Extras</h3>
              <p className="mb-1 text-right">
                Horas extras: ${totals.totalExtraHours}
              </p>
              <p className="mb-1 text-right">Bonos: ${totals.totalBonuses}</p>
              <p className="mb-1 text-right">
                Vacaciones: ${totals.totalVacations}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Aguinaldo</h3>
              <p className="mb-1 text-right">
                Aguinaldo: ${totals.totalAguinaldo}
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="text-right p-3">
              <h3 className="h5 font-weight-bold text-right">Total planilla</h3>
              <p className="mb-1 text-right">
                Total: ${totalPayroll.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <button
            className="col-12 col-md-5 btn btn-outline-light"
            onClick={() => setSee(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
