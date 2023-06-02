import Modal from "react-modal";

import ModalStyle from "../../utils/ModalStyle";

export default function SinglePayroll({ see, setSee, data }) {
  Modal.setAppElement("#root");
  return (
    <Modal isOpen={see} onRequestClose={() => setSee(false)} style={ModalStyle}>
      <div className="container">
        <h2>Información del empleado </h2>
        <p>
          {data.name} {"("}
          <small>{data.cargo}</small>, <small>{data.month}</small>
          {")"}
        </p>

        <div className="row mt-2">
          <div className="col-12 col-md-6">
            <h5>Salario</h5>
            <p>
              Salario base: <small>${data.base}</small>
            </p>
            <p>
              Horas extras: <small>${data.extras?.overtime}</small>
            </p>
            <p>
              Vacaciones: <small>${data.extras?.vacation}</small>
            </p>
            <p>
              Bonos: <small>${data.extras?.bonuses}</small>
            </p>
            <strong>
              Salario bruto: <small>${data.bruteSalary}</small>
            </strong>
          </div>
          <div className="col-12 col-md-6">
            <h5>Descuentos a empleado</h5>
            <p>
              AFP: <small>${data.afp?.employee}</small>
            </p>
            <p>
              ISSS: <small>${data.isss?.employee}</small>
            </p>
            <p>
              Renta: <small>${data?.renta}</small>
            </p>
            <strong>
              Total descuentos: <small>${data.totalDeductions}</small>
            </strong>
          </div>
        </div>
        <div className="row mt-3">
          <h5>Patronal</h5>
          <div className="col-12 col-md-6">
            <p>
              AFP: <small>${data.afp?.employer}</small>
            </p>
            <p>
              ISSS: <small>${data.isss?.employer}</small>
            </p>
          </div>
          <div className="col-12 col-md-6">
            <p>
              Insaforp: <small>${data?.insaforp}</small>
            </p>
            <p>
              Aguinaldo: <small>${data?.aguinaldo}</small>
            </p>
          </div>
          <strong>
            Total: <small>${data.totalDeductionsEmployer}</small>
          </strong>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-md-6">
            <h5>Neto</h5>
            <strong>
              Neto a pagar: <small>${data.neto}</small>
            </strong>
          </div>
          <div className="col-12 col-md-6">
            <h5>Total patronal</h5>
            <strong>
              Total patronal: <small>${data.totalPatronal}</small>
            </strong>
          </div>
        </div>
      </div>
    </Modal>
  );
}
