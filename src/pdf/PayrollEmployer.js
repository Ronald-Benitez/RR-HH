import moment from "moment/moment";

export default function PaymentSlip(data) {
  const totals = {
    totalSalaries: 0,
    totalAfpEmployee: 0,
    totalIsssEmployee: 0,
    totalRenta: 0,
    totalAfpEmployer: 0,
    totalIsssEmployer: 0,
    totalExtraHours: 0,
    totalBonuses: 0,
    totalVacations: 0,
    totalAguinaldo: 0,
    totalInsaforp: 0,
    totalAbsences: 0,
    totalDisabilities: 0,
    totalBrute: 0,
    totalPatronal: 0,
  };

  data.forEach((employee) => {
    totals.totalSalaries += employee.base;
    totals.totalAfpEmployee += employee.afp.employee;
    totals.totalIsssEmployee += employee.isss.employee;
    totals.totalRenta += employee.renta;
    totals.totalAfpEmployer += employee.afp.employer;
    totals.totalIsssEmployer += employee.isss.employer;
    totals.totalExtraHours += employee.extras.overtime;
    totals.totalBonuses += employee.extras.bonuses;
    totals.totalVacations += employee.extras.vacation;
    totals.totalAguinaldo += employee.aguinaldo;
    totals.totalInsaforp += employee.insaforp;
    totals.totalAbsences += employee.absences;
    totals.totalDisabilities += employee.disabilities;
    totals.totalBrute += employee.bruteSalary;
    totals.totalPatronal += employee.totalPatronal;
  });

  Object.keys(totals).forEach((key) => {
    if (typeof totals[key] === "number") {
      totals[key] = parseFloat(totals[key].toFixed(2));
    }
  });

  const docDefinition = {
    content: [],
    pageOrientation: "landscape",
    styles: {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 50],
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
        margin: [0, 0, 0, 50],
        alignment: "left",
      },
      headerRight: {
        fontSize: 10,
        bold: true,
        margin: [0, 0, 0, 50],
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
        alignment: "left",
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
  docDefinition.content.push({
    columns: [
      {
        width: "50%",
        text: "Boleta de pago patronal",
        style: "headerLeft",
      },
      {
        width: "50%",
        text: "Emisión: " + moment().format("DD/MM/YYYY"),
        style: "headerRight",
      },
    ],
  });

  const rows = [];

  data.forEach((employee) => {
    rows.push([
      { text: employee.name || "", style: "tableBody" },
      { text: employee.cargo || "", style: "tableBody" },
      { text: "$" + employee.bruteSalary || 0, style: "tableBody" },
      { text: "$" + employee.afp.employer || 0, style: "tableBody" },
      { text: "$" + employee.isss.employer || 0, style: "tableBody" },
      { text: "$" + employee.insaforp || 0, style: "tableBody" },
      { text: "$" + employee.aguinaldo || 0, style: "tableBody" },
      { text: "$" + employee.totalPatronal || 0, style: "tableBody" },
      { text: "$" + employee.afp.employee || 0, style: "tableBody" },
      { text: "$" + employee.isss.employee || 0, style: "tableBody" },
    ]);
  });

  docDefinition.content.push({
    table: {
      widths: ["20%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%", "8%"],
      body: [
        [
          { text: "Nombre", style: "tableHeader" },
          { text: "Cargo", style: "tableHeader" },
          { text: "Salario", style: "tableHeader" },
          { text: "AFP", style: "tableHeader" },
          { text: "ISSS", style: "tableHeader" },
          { text: "INSAFORP", style: "tableHeader" },
          { text: "Aguinaldo", style: "tableHeader" },
          { text: "Total", style: "tableHeader" },
          { text: "AFP empleado", style: "tableHeader" },
          { text: "ISSS empleado", style: "tableHeader" },
        ],
        ...rows,
        [
          { text: "Totales", style: "tableHeader" },
          { text: "", style: "tableHeader" },
          { text: "$" + totals?.totalBrute, style: "tableHeader" },
          { text: "$" + totals?.totalAfpEmployer, style: "tableHeader" },
          { text: "$" + totals?.totalIsssEmployer, style: "tableHeader" },
          { text: "$" + totals?.totalInsaforp, style: "tableHeader" },
          { text: "$" + totals?.totalAguinaldo, style: "tableHeader" },
          { text: "$" + totals?.totalPatronal, style: "tableHeader" },
          { text: "$" + totals?.totalAfpEmployee, style: "tableHeader" },
          { text: "$" + totals?.totalIsssEmployee, style: "tableHeader" },
        ],
      ],
    },
  });

  docDefinition.content.push({
    text: "Firma: ____________________________",
    style: "bottom",
    alignment: "right",
  });

  return docDefinition;
}
