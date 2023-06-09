import { useState, useEffect } from "react";

import { createEvaluation } from "../../firebase/evaluations";
import moment from "moment/moment";
import { set } from "react-hook-form";

export default function QuestionRender({
  data,
  toaster,
  employee,
  setData,
  setEmployee,
}) {
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState("");

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    const answers = data.questionsList.map(() => "");
    setAnswers(answers);
  }, [data.questionsList]);

  const handleCreateEvaluation = () => {
    const sendData = {
      employee: employee.id,
      employeeName: employee.names + " " + employee.lastNames,
      employeePosition: employee.position,
      employeeArea: employee.area,
      questionsList: data.questionsList,
      answersList: answers,
      evaluationTemplate: data.id,
      comments,
      date: moment().format("DD/MM/YYYY"),
      month: moment().format("MMMM"),
      year: moment().format("YYYY"),
      name: data.name,
      objetive: data.objetive,
      type: "Preguntas",
    };

    createEvaluation(moment().format("YYYY"), sendData)
      .then(() => {
        toaster.success("Evaluación registrada exitosamente");
        setData({});
        setEmployee({});
      })
      .catch((error) => {
        toaster.error(error.message);
      });
  };

  return (
    <div>
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
                <strong>Tipo de plantilla: </strong> plantilla de preguntas
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
            <div className="col-12 mt-3">
              <h5 className="text-center">Preguntas</h5>

              <div className="row p-4">
                <div className="border">
                  {data.questionsList.map((question, index) => (
                    <div className="col-12 p-4" key={index}>
                      <div className="row">
                        <div className="col-12">
                          <p>
                            <strong>{index + 1}. </strong>
                            {question}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <textarea
                            className="form-control"
                            placeholder="Respuesta"
                            value={answers[index] || ""}
                            onChange={(e) =>
                              handleAnswerChange(index, e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="row p-4">
                <div className="col-12">
                  <h5 className="text-center">Comentarios</h5>
                  <textarea
                    className="form-control"
                    placeholder="Comentarios"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
              </div>
              <div className="row p-4">
                <button
                  className="btn btn-outline-light"
                  onClick={handleCreateEvaluation}
                >
                  Registrar evaluación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
