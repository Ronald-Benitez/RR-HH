import Modal from "react-modal";
import DataTable from "react-data-table-component";

import ModalStyle from "../../utils/ModalStyle";
import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";

export default function SeeTemplate({ data, see, setSee }) {
  const criteria = data?.criteriaList;
  const weights = data?.weightList;

  const criteriaWithWeights = criteria?.map((criterio, index) => {
    return {
      name: criterio,
      weight: weights[index],
    };
  });

  const columns = [
    {
      name: "Critrerio",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Peso",
      selector: (row) => row.weight,
      sortable: true,
    },
  ];

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
              <p>Objetivo:{data.objetive}</p>
            </div>

            <div className="col-12">
              <DataTable
                title="Criterios"
                columns={columns}
                data={criteriaWithWeights}
                pagination
                paginationPerPage={5}
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
