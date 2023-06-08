import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";

import "../../utils/tableStyles.css";
import customStyles from "../../utils/tableCustomStyles";
import { createEvaluation } from "../../firebase/evaluations";
import moment from "moment/moment";

export default function CriteriaRender({
  data,
  toaster,
  employee,
  setData,
  setEmployee,
}) {
  const [weightList, setWeightList] = useState([]);
  const [puntuationList, setPuntuationList] = useState([]);
  const [comments, setComments] = useState("");

  useEffect(() => {
    const puntuations = data?.weightList?.map((weight) => {
      return 0;
    });
    setPuntuationList(puntuations);
  }, [data]);

  const inRange = (value) => {
    return value >= 0 && value <= 10;
  };

  const criteria = data?.criteriaList;
  const weights = data?.weightList;

  const criteriaWithWeights = criteria?.map((criterio, index) => {
    return {
      name: criterio,
      weight: weights[index],
    };
  });

  const verifyNotVoid = () => {
    const notVoid = weightList?.every((weight) => weight !== "");
    return notVoid;
  };

  const handleWeightChange = (index, value) => {
    if (inRange(value)) {
      const updatedWeights = [...weightList];
      updatedWeights[index] = value;
      setWeightList(updatedWeights);

      const updatedPuntuationList = [...puntuationList];
      const weight = weights[index] || 0;
      const score = (weight / 10) * value || 0;
      updatedPuntuationList[index] = score;
      setPuntuationList(updatedPuntuationList);
    } else {
      toaster.error("El valor debe estar entre 0 y 10");
    }
  };

  const totalWeight = data.weightList?.reduce(
    (a, b) => Number(a) + Number(b),
    0
  );

  const totals = () => {
    const totalPuntuation = puntuationList.reduce(
      (a, b) => Number(a) + Number(b),
      0
    );

    return totalPuntuation;
  };

  const handleCreateEvaluation = () => {
    if (!verifyNotVoid()) {
      toaster.error("Debe llenar todos los campos");
      return;
    }
    const sendData = {
      employee: employee.id,
      employeeName: employee.names + " " + employee.lastNames,
      employeePosition: employee.position,
      employeeArea: employee.area,
      criteriaList: criteria,
      weightList: weights,
      puntuationList,
      totalPuntuation: totals(),
      comments,
      date: moment().format("DD/MM/YYYY"),
      month: moment().format("MMMM"),
      year: moment().format("YYYY"),
      name: data.name,
      objetive: data.objetive,
      type: "Criterios",
    };

    createEvaluation(moment().format("YYYY"), sendData)
      .then(() => {
        toaster.success("Evaluación creada exitosamente");
        setData({});
        setEmployee({});
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  const columns = [
    {
      name: "Criterio",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Puntuación",
      cell: (row, index) => {
        return (
          <input
            type="number"
            className="form-control bg-black text-white"
            placeholder="0 - 10"
            value={weightList[index] || ""}
            onChange={(e) => handleWeightChange(index, e.target.value)}
          />
        );
      },
    },
    {
      name: "Peso",
      selector: (row) => row.weight + "%",
      sortable: true,
    },
    {
      name: "Valoración",
      selector: (row, index) => (puntuationList[index] || 0) + "%",
    },
  ];

  return (
    <div className="container overflow-auto mt-4 border">
      <div className="flex justify-between items-center">
        <h3 className="text-center mt-3">Evalucion de personal</h3>
      </div>
      <div className="modal-body mt-2">
        <div className="row justify-content-center align-items-center">
          <div className="row">
            <p>
              <strong>Empleado: </strong>{" "}
              {employee.names + " " + employee.lastNames}
            </p>
            <p>
              <strong>Cargo: </strong>
              {employee.position}
            </p>
            <p>
              <strong>Tipo de plantilla: </strong> plantilla de criterios
            </p>
            <p>
              <strong>Plantilla utilizada: </strong> {data.name}
            </p>
            <p>
              <strong>Fecha: </strong> {moment().format("LL")}
            </p>
            <p>
              <strong>Objetivo: </strong>
              {data.objetive}
            </p>
          </div>

          <div className="col-12 border col-md-11">
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
          <div className="row mt-4">
            <p>
              <strong>Valoración final: </strong>
              {"("} {totals()}
              {" / "}
              {totalWeight}
              {" )"}%
            </p>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="comment">Comentarios:</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row p-4">
            <button
              className="btn btn-outline-light"
              onClick={() => handleCreateEvaluation()}
            >
              Guardar evaluación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
