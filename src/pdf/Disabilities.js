import moment from "moment/moment";

export default function Disabilities(data, date) {
  const documentDefinition = {
    content: [
      {
        text: "Reporte de incapacidades",
        style: "header",
      },
      {
        text: "Fecha de creación: " + moment().format("LL"),
        style: "subheader",
      },
      {
        text: "Fecha de registros: " + date,
        style: "subheader",
      },
      {
        //name, cargo, start, end, date
        table: {
          widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Nombre", style: "tableHeader" },
              { text: "Cargo", style: "tableHeader" },
              { text: "Inicio", style: "tableHeader" },
              { text: "Finalización", style: "tableHeader" },
              { text: "Días", style: "tableHeader" },
              { text: "Fecha de registro", style: "tableHeader" },
            ],
            ...data.map((disability) => [
              { text: disability.name, style: "tableBody" },
              { text: disability.cargo, style: "tableBody" },
              {
                text: moment(disability.start).format("D MMMM YYYY"),
                style: "tableBody",
              },
              {
                text: moment(disability.end).format("D MMMM YYYY"),
                style: "tableBody",
              },
              {
                text: moment(disability.end).diff(disability.start, "days") + 1,
                style: "tableBody",
              },
              {
                text: moment(disability.date).format("D MMMM YYYY"),
                style: "tableBody",
              },
            ]),
          ],
        },
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
        margin: [0, 10, 0, 10],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
        alignment: "center",
        margin: [0, 5, 0, 5],
      },
      tableBody: {
        margin: [0, 5, 0, 5],
      },
    },
  };

  return documentDefinition;
}
