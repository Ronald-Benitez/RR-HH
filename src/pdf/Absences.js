import moment from "moment/moment";

export default function Absences(data, date) {
  const documentDefinition = {
    pageOrientation: "landscape",
    content: [
      {
        text: "Reporte de ausencias",
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
        //name, cargo, end, start, type, date, comment
        table: {
          widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Nombre", style: "tableHeader" },
              { text: "Cargo", style: "tableHeader" },
              { text: "Inicio", style: "tableHeader" },
              { text: "Finalización", style: "tableHeader" },
              { text: "Tipo", style: "tableHeader" },
              { text: "Fecha de registro", style: "tableHeader" },
              { text: "Comentario", style: "tableHeader" },
            ],
            ...data.map((absence) => [
              { text: absence.name, style: "tableBody" },
              { text: absence.cargo, style: "tableBody" },
              {
                text: moment(absence.start).format("D MMMM YYYY"),
                style: "tableBody",
              },
              {
                text: moment(absence.end).format("D MMMM YYYY"),
                style: "tableBody",
              },
              { text: absence.type, style: "tableBody" },
              {
                text: moment(absence.date).format("D MMMM YYYY"),
                style: "tableBody",
              },
              { text: absence.comment, style: "tableBody" },
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
        margin: [0, 0, 0, 10],
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
