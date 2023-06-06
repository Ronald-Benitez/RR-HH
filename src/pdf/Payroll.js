import moment from "moment/moment";
import deductions from "../config/deductions.json";
import NumeroALetras from "../utils/NumberToText";

const daysD = deductions.incapacidad.dias;

export default function PaymentSlip(data) {
  const docDefinition = {
    content: [],
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: "left",
      },
      subheader: {
        fontSize: 10,
        bold: true,
        margin: [0, 5, 0, 5],
        border: "1px solid black",
      },
      subsection: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      headerLeft: {
        fontSize: 14,
        bold: true,
        margin: [0, 0, 0, 5],
        alignment: "left",
      },
      headerRight: {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 5],
        alignment: "right",
      },
      block: {
        margin: [0, 10, 0, 5],
        border: "1px solid black",
        padding: 10,
        border: true,
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black",
        alignment: "center",
        magin: [0, 5, 0, 5],
      },
      tableBody: {
        bold: false,
        fontSize: 10,
        color: "black",
        alignment: "center",
        padding: 1,
      },
      concept: {
        bold: false,
        fontSize: 10,
        color: "black",
        alignment: "left",
        padding: 1,
      },
      text: {
        fontSize: 11,
        color: "black",
        alignment: "left",
        margin: [0, 5, 0, 5],
        padding: 1,
      },
      bottom: {
        fontSize: 10,
        color: "black",
        alignment: "left",
        margin: [0, 50, 0, 5],
        padding: 1,
      },
    },
  };

  data.forEach((employee) => {
    docDefinition.content.push({
      columns: [
        {
          width: "50%",
          text: "Boleta de pago",
          style: "headerLeft",
        },
        {
          width: "50%",
          text: "Emisión: " + moment().format("DD/MM/YYYY"),
          style: "headerRight",
        },
      ],
    });

    docDefinition.content.push({
      text: "Empleado: " + employee.name,
      style: "subheader",
    });

    docDefinition.content.push({
      text: "Planilla: " + moment(employee.date).format("MMMM YYYY"),
      style: "subsection",
    });

    docDefinition.content.push({
      columns: [
        {
          width: "50%",
          text: "Salario base: $" + employee.base,
          style: "text",
        },
        {
          width: "50%",
          text: "Cargo: " + employee.cargo,
          style: "text",
          alignment: "right",
        },
      ],
    });

    let total = employee.base;
    let totalDeductions = 0;

    const salarioContent = () => {
      const result = [];
      if (employee.base) {
        result.push([
          { text: "Salario base", style: "concept" },
          { text: "$" + employee.base, style: "tableBody" },
          { text: "", style: "tableBody" },
        ]);
      }

      if (employee.extras?.overtime) {
        total += employee.extras.overtime;
        result.push([
          { text: "Horas extras", style: "concept" },
          { text: "$" + employee.extras.overtime, style: "tableBody" },
          { text: "", style: "tableBody" },
        ]);
      }

      if (employee.extras?.vacation) {
        total += employee.extras.vacation;
        result.push([
          { text: "Vacaciones", style: "concept" },
          { text: "$" + employee.extras.vacation, style: "tableBody" },
          { text: "", style: "tableBody" },
        ]);
      }

      if (employee.extras?.bonuses) {
        total += employee.extras.bonuses;
        result.push([
          { text: "Bonos", style: "concept" },
          { text: "$" + employee.extras.bonuses, style: "tableBody" },
          { text: "", style: "tableBody" },
        ]);
      }

      if (employee.disabilities) {
        totalDeductions += employee.disabilities;
        result.push([
          {
            text: `Incapacidad, ${employee.daysDisability} días (ISSS, ${
              employee.daysDisability - daysD
            } días)`,
            style: "concept",
          },
          { text: "", style: "tableBody" },
          { text: "$" + employee.disabilities, style: "tableBody" },
        ]);
      }

      if (employee.absences) {
        totalDeductions += employee.absences;
        result.push([
          {
            text: `Faltas injustificadas, ${employee.daysAbsence} días`,
            style: "concept",
          },
          { text: "", style: "tableBody" },
          { text: "$" + employee.absences, style: "tableBody" },
        ]);
      }

      return result;
    };

    const discountsContent = () => {
      const res = [];

      if (employee.afp?.employee) {
        totalDeductions += employee.afp.employee;
        res.push([
          { text: "AFP", style: "concept" },
          { text: "", style: "tableBody" },
          { text: "$" + employee.afp.employee, style: "tableBody" },
        ]);
      }

      if (employee.isss?.employee) {
        totalDeductions += employee.isss.employee;
        res.push([
          { text: "ISSS", style: "concept" },
          { text: "", style: "tableBody" },
          { text: "$" + employee.isss.employee, style: "tableBody" },
        ]);
      }

      if (employee.renta) {
        totalDeductions += employee.renta;
        res.push([
          { text: "Renta", style: "concept" },
          { text: "", style: "tableBody" },
          { text: "$" + employee.renta, style: "tableBody" },
        ]);
      }

      return res;
    };

    const aguinaldoContent = () => {
      const res = [];
      if (employee.aguinaldo) {
        total += employee.aguinaldo;
        res.push([
          { text: "Aguinaldo", style: "concept" },
          { text: "$" + employee.aguinaldo, style: "tableBody" },
          { text: "", style: "tableBody" },
        ]);
      }
      return res;
    };

    docDefinition.content.push({
      table: {
        widths: ["60%", "20%", "20%"],
        body: [
          [
            {
              text: "Concepto",
              style: "tableHeader",
            },
            {
              text: "Haberes",
              style: "tableHeader",
            },
            {
              text: "Descuentos",
              style: "tableHeader",
            },
          ],
          ...salarioContent(),
          ...discountsContent(),
          ...aguinaldoContent(),
          [
            {
              text: "Total",
              style: "tableHeader",
            },
            {
              text: "$" + total.toFixed(2),
              style: "tableHeader",
            },
            {
              text: "$" + totalDeductions.toFixed(2),
              style: "tableHeader",
            },
          ],
          [
            {
              text: "Neto",
              style: "tableHeader",
            },
            {
              text: "$" + employee.neto,
              style: "tableHeader",
            },
            {
              text: "",
              style: "tableHeader",
            },
          ],
          [
            {
              text: NumeroALetras(employee.neto),
              style: "tableBody",
            },
            {
              text: "",
              style: "tableBody",
            },
            {
              text: "",
              style: "tableBody",
            },
          ],
        ],
      },
    });

    docDefinition.content.push({
      text: "Firma: ____________________________",
      style: "bottom",
      alignment: "right",
      pageBreak: "after",
    });
  });

  docDefinition.content.pop();

  return docDefinition;
}
