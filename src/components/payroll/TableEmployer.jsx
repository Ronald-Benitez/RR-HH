import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import pdfMake from "pdfmake/build/pdfmake";
import 'pdfmake/build/vfs_fonts';


import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import SinglePayroll from "./SinglePayroll";
import PayrollEmployer from "../../pdf/PayrollEmployer";
import Icon from "../utils/Icon";

export default function TableEmployer({ data}) {
  const [employee, setEmployee] = useState({});
  const [see, setSee] = useState(false);

  const [dataC, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleFinder = (e) => {
    const value = e.target.value.toLowerCase();
    const results = data.filter((employee) => {
      return employee.name.toLowerCase().includes(value);
    });
    setFilteredData(results);
  };

  const handlePDF = (employee) => {
    pdfMake
      .createPdf(
        PayrollEmployer([employee]),
        `Boleta de pago ${employee.name}`
      )
      .open();
  };

  const handlePayroll = () => {
    pdfMake.createPdf(PayrollEmployer(data), `Planilla de pago`).open();
  };

  useEffect(() => {
    setData(filteredData.length > 0 ? filteredData : data);
  }, [data, filteredData]);

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
      selector: (row) => "$" + row.bruteSalary,
      sortable: true,
    },

    {
      name: "AFP",
      selector: (row) => "$" + row.afp.employer,
      sortable: true,
    },
    {
      name: "ISSS",
      selector: (row) => "$" + row.isss.employer,
      sortable: true,
    },
    {
      name: "Insaforp",
      selector: (row) => "$" + row.insaforp,
      sortable: true,
    },
    {
      name: "Aguinaldo",
      selector: (row) => "$" + row.aguinaldo,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row) => "$" + row.totalPatronal,
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <button
            className="btn btn btn-outline-light btn-sm m-1"
            onClick={() => {
              setSee(true);
              setEmployee(row);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn btn-outline-success btn-sm m-1"
            onClick={() => handlePDF(row)}
          >
            <Icon icon="pdf" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-4">
          <div className="input-group mb-3">
            <span className="input-group-text">Filtrar</span>
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={(e) => handleFinder(e)}
            />
          </div>
        </div>
        <div className="col-12 col-md-2">
          <button
            className="btn btn-outline-light"
            onClick={() => handlePayroll()}
          >
            <Icon icon="pdf" />
            Planilla
          </button>
        </div>
      </div>
      <DataTable
        title="Planilla patronal"
        columns={columns}
        data={dataC}
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
