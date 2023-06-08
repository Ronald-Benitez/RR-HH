import moment from "moment/moment";

export default function Candidates(data) {
  const documentDefinition = {
    pageOrientation: "landscape",
    content: [
      {
        text: "Reporte de candidatos",
        style: "header",
      },
      {
        text: "Fecha de creación: " + moment().format("LL"),
        style: "subheader",
      },
      {
        table: {
          //names, lastNames, dui, email, phone, date, state, pdfUrl, address
          widths: [
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              { text: "Nombres", style: "tableHeader" },
              { text: "Apellidos", style: "tableHeader" },
              { text: "DUI", style: "tableHeader" },
              { text: "Edad", style: "tableHeader" },
              { text: "Email", style: "tableHeader" },
              { text: "Teléfono", style: "tableHeader" },
              { text: "Fecha de registro", style: "tableHeader" },
              { text: "Dirección", style: "tableHeader" },
              { text: "Estado", style: "tableHeader" },
              { text: "Curriculum", style: "tableHeader" },
            ],
            ...data.map((candidate) => [
              { text: candidate.names, style: "tableBody" },
              { text: candidate.lastNames, style: "tableBody" },
              { text: candidate.dui, style: "tableBody" },
              {
                text: moment().diff(candidate.birthDate, "years") + " años",
                style: "tableBody",
              },
              { text: candidate.email, style: "tableBody" },
              { text: candidate.phone, style: "tableBody" },
              {
                text: moment(candidate.date).format("D MMMM YYYY"),
                style: "tableBody",
              },
              { text: candidate.address, style: "tableBody" },
              { text: candidate.state, style: "tableBody" },
              {
                text: candidate.pdfName || "No abjuntado",
                link: candidate.pdfUrl || "#",
                style: "link",
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
        bold: false,
        fontSize: 10,
        color: "black",
        alignment: "left",
        padding: 1,
      },
      link: {
        color: "#0000ff",
        decoration: "underline",
        bold: false,
        fontSize: 10,
        color: "black",
        alignment: "left",
        padding: 1,
      },
    },
  };

  return documentDefinition;
}
