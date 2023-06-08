import { useEffect, useState, Fragment } from "react";
import moment from "moment/moment";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/navbar/Navbar";
import { getQuestionsTemplates } from "../firebase/questions";
import { getEmployees } from "../firebase/employees";
import { getEvaluationTemplates } from "../firebase/evaluationTemplate";
import CriteriaRender from "../components/evaluations/CriteriaRender";
import QuestionRender from "../components/evaluations/QuestionRender";
import { set } from "react-hook-form";

export default function Evaluations() {
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [templateType, setTemplateType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState({});

  useEffect(() => {
    if (templateType == "questions") {
      getQuestionsTemplates()
        .then((questionsTemplates) => {
          const data = questionsTemplates.docs.map((questionsTemplate) => ({
            id: questionsTemplate.id,
            ...questionsTemplate.data(),
          }));
          setData(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else if (templateType == "criteria") {
      getEvaluationTemplates()
        .then((evaluationTemplates) => {
          const data = evaluationTemplates.docs.map((evaluationTemplate) => ({
            id: evaluationTemplate.id,
            ...evaluationTemplate.data(),
          }));
          setData(data);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [templateType]);

  useEffect(() => {
    getEmployees()
      .then((employees) => {
        const data = employees.docs.map((employee) => ({
          id: employee.id,
          ...employee.data(),
        }));
        setEmployees(data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <h2 className="text-center">Creación de evaluación</h2>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-4">
            <label htmlFor="templateType">Tipo de plantilla</label>
            <select
              className="form-select"
              id="templateType"
              onChange={(e) => {
                setTemplateType(e.target.value);
                setSelectedTemplate({});
              }}
            >
              <option key="1" value="">
                Seleccione una opción
              </option>
              <option key="2" value="questions">
                Plantilla de preguntas
              </option>
              <option key="3" value="criteria">
                Plantilla de criterios
              </option>
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="selectedTemplate">Plantilla</label>
            <select
              className="form-select"
              id="selectedTemplate"
              onChange={(e) => {
                setSelectedTemplate(
                  data.find((template) => template.id == e.target.value)
                );
              }}
            >
              <option value="">Seleccione una opción</option>
              {data.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-md-4">
            <label htmlFor="selectedEmployee">Empleado</label>
            <select
              className="form-select"
              id="selectedEmployee"
              onChange={(e) => {
                setSelectedEmployee(
                  employees.find((employee) => employee.id == e.target.value)
                );
              }}
            >
              <option value="">Seleccione una opción</option>
              {employees.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.names +
                    " " +
                    employee.lastNames +
                    " (" +
                    employee.position +
                    ")"}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt 5">
          {templateType == "questions" && selectedTemplate?.id
            ? selectedEmployee?.id && (
                <QuestionRender
                  key={selectedTemplate.id}
                  data={selectedTemplate}
                  employee={selectedEmployee}
                  toaster={toast}
                />
              )
            : null}
          {templateType == "criteria" && selectedTemplate?.id
            ? selectedEmployee?.id && (
                <CriteriaRender
                  key={selectedTemplate.id}
                  data={selectedTemplate}
                  employee={selectedEmployee}
                  toaster={toast}
                />
              )
            : null}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
