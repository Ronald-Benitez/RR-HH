import moment from "moment/moment";

export default function Vacations(data,date ) {
  const documentDefinition = {
    // pageOrientation: "landscape",
    content: [
      {
        text: "Reporte de vacaciones",
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
        //name, start, end, date, value
        table: {
          widths: ["auto", "auto","auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Nombre", style: "tableHeader" },
              { text: "Cargo", style: "tableHeader" },
              { text: "Inicio", style: "tableHeader" },
              { text: "Finalización", style: "tableHeader" },
              { text: "Fecha de registro", style: "tableHeader" },
              { text: "Monto", style: "tableHeader" },
            ],
            ...data.map((vacation) => [
              { text: vacation.name, style: "tableBody" },
              { text: vacation.cargo, style: "tableBody" },
              { text: moment(vacation.start).format("D MMMM YYYY"), style: "tableBody" },
              { text: moment(vacation.end).format("D MMMM YYYY"), style: "tableBody" },
              { text: moment(vacation.date).format("D MMMM YYYY"), style: "tableBody" },
              { text: "$" + vacation.value, style: "tableBody" },
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
