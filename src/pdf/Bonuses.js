import moment from "moment/moment";

export default function Bonuses(data, date) {
  const documentDefinition = {
    content: [
      {
        text: "Reporte de bonificaciones",
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
        //name, cargo, description, value, date
        table: {
          widths: ["auto", "auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "Nombre", style: "tableHeader" },
              { text: "Cargo", style: "tableHeader" },
              { text: "Descripción", style: "tableHeader" },
              { text: "Monto", style: "tableHeader" },
              { text: "Fecha de registro", style: "tableHeader" },
            ],
            ...data.map((bonus) => [
              { text: bonus.name, style: "tableBody" },
              { text: bonus.cargo, style: "tableBody" },
              { text: bonus.description, style: "tableBody" },
              { text: "$" + bonus.value, style: "tableBody" },
              {
                text: moment(bonus.date).format("D MMMM YYYY"),
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
        fontSize: 12,
        color: "black",
      },
      tableBody: {
        fontSize: 12,
        color: "black",
      },
    },
  };

  return documentDefinition;
}
