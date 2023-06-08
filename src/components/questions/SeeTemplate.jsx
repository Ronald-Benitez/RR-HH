import Modal from "react-modal";
import ModalStyle from "../../utils/ModalStyle";
import "../../utils/tableStyles.css";
import moment from "moment/moment";

export default function SeeTemplate({ data, see, setSee }) {
  const showEmployeeData = () => {
    if (data.employeeName === undefined) return <></>;
    return (
      <>
        <p>
          <strong>Empleado: </strong>
          {data.employeeName}
        </p>
        <p>
          <strong>Cargo: </strong>
          {data.employeePosition}
        </p>
        <p>
          <strong>Fecha de evaluación: </strong>
          {moment(data.date).format("LL")}
        </p>
      </>
    );
  };

  const answersList = [...(data.answersList || [])];

  return (
    <div>
      <Modal
        isOpen={see}
        onRequestClose={() => setSee(false)}
        style={ModalStyle}
        contentLabel="Example Modal"
      >
        <div className="container overflow-auto">
          <div className="flex justify-between items-center">
            <h3 className="text-center mt-3">{data.name}</h3>
          </div>
          <div className="modal-body mt-2">
            <div className="row justify-content-center align-items-center">
              <div className="row mt-3">
                {showEmployeeData()}
                <p>
                  <strong>Objetivo: </strong>
                  {data.objetive}
                </p>
              </div>
              <div className="col-12 mt-3">
                <ul className="list-group">
                  {data.questionsList?.map((question, index) => (
                    <li
                      className="list-group-item my-1 bg-black text-light"
                      key={index}
                    >
                      <p>{question}</p>
                      {answersList[index] && (
                        <p>Respuesta: {data.answersList[index]}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {answersList.length > 0 && data.comments != "" && (
            <div className="row p-2">
              <h4>Comentarios</h4>
              <p>{data.comments}</p>
            </div>
          )}
          <div className="row p-2">
            <button
              className="btn btn-outline-light "
              onClick={() => setSee(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
