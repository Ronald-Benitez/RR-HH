import moment from "moment/moment";

export default function Overtime(data, date) {
  const documentDefinition = {
    content: [
      {
        text: "Reporte de horas extras",
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
        //name, cargo, date, hours, type, value
        table: {
          widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Nombre", style: "tableHeader" },
              { text: "Cargo", style: "tableHeader" },
              { text: "Fecha", style: "tableHeader" },
              { text: "Horas", style: "tableHeader" },
              { text: "Tipo", style: "tableHeader" },
              { text: "Monto", style: "tableHeader" },
            ],
            ...data.map((overtime) => [
              { text: overtime.name, style: "tableBody" },
              { text: overtime.cargo, style: "tableBody" },
              {
                text: moment(overtime.date).format("D MMMM YYYY"),
                style: "tableBody",
              },
              { text: overtime.hours, style: "tableBody" },
              { text: overtime.type, style: "tableBody" },
              { text: "$" + overtime.value, style: "tableBody" },
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
