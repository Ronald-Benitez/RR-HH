import moment from "moment/moment";

export const calculateOvertime = (data, overtime) => {
  const updatedData = [...data]; // Crear una copia del arreglo original

  //Clear overtime
  updatedData.forEach((employee) => {
    employee.overtime = 0;
  });

  Object.values(overtime).map((row) => {
    const employee = updatedData.find(
      (employee) => employee.id === row.employee
    );

    if (employee) {
      employee.overtime += parseFloat(row.value);
    }
  });
};
