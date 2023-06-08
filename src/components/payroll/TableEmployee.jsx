import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import SinglePayroll from "./SinglePayroll";
import Payroll from "../../pdf/Payroll";
import Icon from "../utils/Icon";

export default function TableEmployee({ data }) {
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
      .createPdf(Payroll([employee]), `Boleta de pago ${employee.name}`)
      .open();
  };

  const handlePayroll = () => {
    pdfMake.createPdf(Payroll(data), `Planilla de pago`).open();
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
      name: "Incapacidad",
      selector: (row) => "$" + row?.disabilities,
      sortable: true,
    },
    {
      name: "Faltas",
      selector: (row) => "$" + row?.absences,
      sortable: true,
    },
    {
      name: "Recalculo",
      selector: (row) => "$" + row?.totalLaboral,
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
            className="btn btn btn-outline-light btn-sm m-2"
            onClick={() => {
              setSee(true);
              setEmployee(row);
            }}
          >
            <Icon icon="eye" />
          </button>
          <button
            className="btn btn btn-outline-light btn-sm m-2"
            onClick={() => {
              handlePDF(row);
            }}
          >
            <Icon icon="pdf" />
          </button>
        </div>
      ),
      button: true,
    },
  ];

  return (
    <div className="p-4 m-1">
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
          <button className="btn btn-outline-light" onClick={handlePayroll}>
            <Icon icon="pdf" /> Boletas de pago
          </button>
        </div>
      </div>
      <DataTable
        title="Planilla de empleados"
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
