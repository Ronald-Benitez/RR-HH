import moment from "moment/moment";

export default function Criteria(data) {
  const documentDefinition = {
    content: [
      {
        text: data.name,
        style: "header",
      },
      ...showEmployeeData(data),
      {
        text: "Objetivo:",
        style: "subheader",
      },
      {
        text: data.objetive,
        style: "marginBottom",
      },
      {
        text: "Criterios:",
        style: "subheader",
      },
      {
        table: {
          widths: ["5%", "*", "15%", "15%"],
          body: [
            [
              { text: "N°", style: "tableHeader" },
              { text: "Criterio", style: "tableHeader" },
              { text: "Peso", style: "tableHeader" },
              { text: "Puntuación", style: "tableHeader" },
            ],
            ...showCriteria(data),
          ],
        },
      },
      ...generateTotal(data),
      ...generateComments(data),
      {
        text: "Firma: ____________________________",
        style: "bottom",
        alignment: "right",
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      responseBlock: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      borderBottom: {
        margin: [0, 0, 0, 10],
        border: "1px solid black",
      },

      marginBottom: {
        margin: [0, 0, 0, 5],
      },
      marginY: {
        margin: [0, 10, 0, 10],
      },

      maginTop: {
        margin: [0, 10, 0, 0],
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
      text: {
        fontSize: 10,
        color: "black",
        alignment: "left",
        padding: 1,
      },
      bottom: {
        fontSize: 10,
        color: "black",
        alignment: "left",
        margin: [0, 50, 0, 0],
        padding: 1,
      },
    },
  };
  return documentDefinition;
}

const showEmployeeData = (data) => {
  if (data.employeeName === undefined) {
    return [
      { text: `Empleado:${underscoreGenerator(80)}`, style: "marginY" },
      { text: `Cargo:${underscoreGenerator(84)}`, style: "marginY" },
      {
        text: `Fecha de evaluación:${underscoreGenerator(69)}`,
        style: "marginY",
      },
      { text: "" }, // Add empty line for spacing
    ];
  }
  return [
    { text: `Empleado: ${data.employeeName}`, style: "marginY" },
    { text: `Cargo: ${data.employeePosition}`, style: "marginY" },
    {
      text: `Fecha de evaluación: ${moment(data.date).format("LL")}`,
      style: "marginY",
    },
    { text: "" }, // Add empty line for spacing
  ];
};

const underscoreGenerator = (length) => {
  let underscore = "";
  for (let i = 0; i < length; i++) {
    underscore += "_";
  }
  return underscore;
};

const showCriteria = (data) => {
  const content = [];
  const criteria = [...(data.criteriaList || [])];
  const weights = [...(data.weightList || [])];
  const puntuations = [...(data.puntuationList || [])];

  criteria.forEach((criterion, index) => {
    content.push([
      { text: index + 1, style: "tableBody", alignment: "center" },
      { text: criterion, style: "tableBody" },
      { text: `${weights[index]}%`, style: "tableBody", alignment: "center" },
      {
        text: puntuations[index] || "",
        style: "tableBody",
        alignment: "center",
      },
    ]);
  });

  return content;
};

const generateTotal = (data) => {
  if (data.totalPuntuation !== "") {
    return [
      {
        text: `Total: (${
          data.totalPuntuation || underscoreGenerator(5)
        } / 100)%`,
        style: "marginY",
      },
      { text: "" }, // Add empty line for spacing
    ];
  }
  return [
    { text: `Total: (${underscoreGenerator(5)} / 100)%`, style: "marginY" },
    { text: "" }, // Add empty line for spacing
  ];
};

const generateComments = (data) => {
  if (data.puntuationList && data.comments !== "") {
    return [
      { text: "Comentarios:", style: "subheader" },
      data.comments,
      { text: "" }, // Add empty line for spacing
    ];
  }
  return [
    { text: `Comentarios:${underscoreGenerator(462)}`, style: "subheader" },
    { text: "" }, // Add empty line for spacing
  ];
};
