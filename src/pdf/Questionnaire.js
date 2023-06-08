import moment from "moment/moment";

export default function Questionnaire(data) {
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
        text: "Preguntas y respuestas:",
        style: "subheader",
      },
      ...generateQuestionsAndAnswers(data),
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

const underscoreGenerator = (length) => {
  let underscore = "";
  for (let i = 0; i < length; i++) {
    underscore += "_";
  }
  return underscore;
};

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

const generateQuestionsAndAnswers = (data) => {
  const answersList = [...(data.answersList || [])];
  const content = [];

  data.questionsList?.forEach((question, index) => {
    content.push({ text: "   ", style: "maginY" }); // Add empty line for spacing
    content.push({ text: `${index + 1} - ${question}`, bold: true });
    content.push({ text: "   ", style: "maginY" }); // Add empty line for spacing
    if (answersList[index]) {
      content.push({ text: `Respuesta: ${answersList[index]}` });
    } else {
      content.push({
        text: `Respuesta:${underscoreGenerator(465)}`,
        style: "responseBlock",
      });
    }
    content.push({ text: "" }); // Add empty line for spacing
  });

  return content;
};

const generateComments = (data) => {
  if (data.answersList && data.answersList.length > 0 && data.comments !== "") {
    return [
      { text: "   ", style: "marginY" }, // Add empty line for spacing,
      { text: "Comentarios:", style: "subheader" },
      data.comments,
      { text: "" }, // Add empty line for spacing
    ];
  }
  return [];
};
