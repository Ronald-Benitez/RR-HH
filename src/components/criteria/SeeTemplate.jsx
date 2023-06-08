import Modal from "react-modal";
import DataTable from "react-data-table-component";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";

export default function SeeTemplate({ data, see, setSee }) {
  const criteria = data?.criteriaList;
  const weights = data?.weightList;

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

  const puntuationList = data?.puntuationList;

  const criteriaWithWeights = criteria?.map((criterio, index) => {
    return {
      name: criterio,
      weight: weights[index],
    };
  });

  const columns = [
    {
      name: "Criterio",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Peso",
      selector: (row) => row.weight + "%",
      sortable: true,
    },
  ];

  if (puntuationList) {
    columns.push({
      name: "Puntuación",
      selector: (row, index) => (puntuationList[index] || "0") + "%",
      sortable: true,
    });
  }

  return (
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
            <div className="row">
              {showEmployeeData()}
              <p>
                <strong>Objetivo: </strong>
                {data.objetive}
              </p>
            </div>

            <div className="col-12">
              <DataTable
                columns={columns}
                data={criteriaWithWeights}
                pagination
                paginationPerPage={10}
                paginationRowsPerPageOptions={[5, 10, 15]}
                paginationComponentOptions={{
                  rowsPerPageText: "Filas por página:",
                  rangeSeparatorText: "de",
                  noRowsPerPage: false,
                  selectAllRowsItem: false,
                  selectAllRowsItemText: "Todos",
                }}
                noDataComponent="No hay datos para mostrar"
                striped
                highlightOnHover
                pointerOnHover
                customStyles={customStyles}
              />
            </div>
          </div>
        </div>
        {puntuationList && (
          <div className="row p-2">
            <h5>Puntuación</h5>
            <p>{data.totalPuntuation}%</p>
          </div>
        )}
        {puntuationList && data.comments != "" && (
          <div className="row p-2">
            <h5>Comentarios</h5>
            <p>{data.comments}</p>
          </div>
        )}
        <div className="row mt-3 justify-content-center">
          <button
            className="btn btn-outline-light m-2 col-12 col-md-6"
            onClick={() => setSee(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}
