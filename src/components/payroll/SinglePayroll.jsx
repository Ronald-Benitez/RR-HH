import Modal from "react-modal";
import ModalStyle from "../../utils/ModalStyle";

export default function SinglePayroll({ see, setSee, data }) {
  Modal.setAppElement("#root");
  return (
    <Modal isOpen={see} onRequestClose={() => setSee(false)} style={ModalStyle}>
      <div className="container overflow-auto">
        <h2>Información del empleado </h2>
        <p>
          {data.name} {"("}
          <small>{data.cargo}</small>, <small>{data.month}</small>
          {")"}
        </p>

        <div className="row mt-2">
          <div className="col-12 col-md-6">
            <h5>Salario</h5>
            {data.base ? (
              <p>
                Salario base: <small>${data.base}</small>
              </p>
            ):null}
            {data.extras?.overtime ? (
              <p>
                Horas extras: <small>${data.extras.overtime}</small>
              </p>
            ):null}
            {data.extras?.vacation ? (
              <p>
                Vacaciones: <small>${data.extras.vacation}</small>
              </p>
            ):null}
            {data.extras?.bonuses ? (
              <p>
                Bonos: <small>${data.extras.bonuses}</small>
              </p>
            ):null}
            {data?.disabilities ? (
              <>
                <p className="text-danger" >
                  Incapacidad (pagada por ISSS):{" "}
                  <small>${data.disabilities}</small>
                </p>
                <p >
                  Días de incapacidad: <small>{data.daysDisability}</small>
                </p>
              </>
            ):null}
            {data?.absences ? (
              <>
                <p className="text-danger">
                  Faltas: <small>${data.absences}</small>
                </p>
                <p >
                  Días de faltas: <small>{data.daysAbsence}</small>
                </p>
              </>
            ):null}
            <strong>
              Salario bruto:{" "}
              <small>${data.totalLaboral}</small>
            </strong>
          </div>
          <div className="col-12 col-md-6">
            <h5>Descuentos a empleado</h5>
            {data.afp?.employee ? (
              <p>
                AFP: <small>${data.afp.employee}</small>
              </p>
            ):null}
            {data.isss?.employee ? (
              <p>
                ISSS: <small>${data.isss.employee}</small>
              </p>
            ):null}
            {data?.renta ? (
              <p>
                Renta: <small>${data.renta}</small>
              </p>
            ):null}
            <strong>
              Total descuentos: <small>${data.totalDeductionsEmployee}</small>
            </strong>
          </div>
        </div>
        <div className="row mt-3">
          <h5>Patronal</h5>
          <div className="col-12 col-md-6">
            {data.afp?.employer ? (
              <p>
                AFP: <small>${data.afp.employer}</small>
              </p>
            ):null}
            {data.isss?.employer ? (
              <p>
                ISSS: <small>${data.isss.employer}</small>
              </p>
            ):null}
          </div>
          <div className="col-12 col-md-6">
            {data?.insaforp ? (
              <p>
                Insaforp: <small>${data.insaforp}</small>
              </p>
            ):null}
            {data?.aguinaldo ? (
              <p>
                Aguinaldo: <small>${data.aguinaldo}</small>
              </p>
            ):null}
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
