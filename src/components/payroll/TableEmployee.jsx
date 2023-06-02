import { useState } from "react";
import DataTable from "react-data-table-component";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import SinglePayroll from "./SinglePayroll";

export default function TableEmployee({ data }) {
  const [employee, setEmployee] = useState({});
  const [see, setSee] = useState(false);

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.cargo,
      sortable: true,
    },
    {
      name: "Salario",
      selector: (row) => "$" + row.base,
      sortable: true,
    },
    {
      name: "Horas extra",
      selector: (row) => "$" + row.extras?.overtime,
      sortable: true,
    },
    {
      name: "Bonos",
      selector: (row) => "$" + row.extras?.bonuses,
      sortable: true,
    },
    {
      name: "Vacaciones",
      selector: (row) => "$" + row.extras?.vacation,
      sortable: true,
    },
    {
      name: "Aguinaldo",
      selector: (row) => "$" + row.aguinaldo,
      sortable: true,
    },
    {
      name: "ISSS",
      selector: (row) => "$" + row.isss.employee,
      sortable: true,
    },
    {
      name: "AFP",
      selector: (row) => "$" + row.afp.employee,
      sortable: true,
    },
    {
      name: "Renta",
      selector: (row) => "$" + row.renta,
      sortable: true,
    },
    {
      name: "Salario neto",
      selector: (row) => "$" + row.neto,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn btn-outline-light"
            onClick={() => {
              setSee(true);
              setEmployee(row);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            </svg>
          </button>
        </div>
      ),
      button: true,
    },
  ];

  return (
    <div className="p-4 m-1">
      <DataTable
        title="Planilla de empleados"
        columns={columns}
        data={data}
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
      <SinglePayroll see={see} setSee={setSee} data={employee} />
    </div>
  );
}
