import { useEffect, useState } from "react";
import Modal from "react-modal";
import moment from "moment/moment";

import ModalStyle from "../../utils/ModalStyle";
import { getPosition } from "../../firebase/positions";
const { getAreas } = require("../../firebase/areas");
import Icon from "../utils/Icon";
import { createEmployee } from "../../firebase/employees";

export default function ConfirmSelectModal({ data, show, setShow, toaster }) {
  const [positionData, setPositionData] = useState({});
  const [names, setNames] = useState("");
  const [lastNames, setLastNames] = useState("");
  const [area, setArea] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dui, setDui] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [address, setAddress] = useState("");
  const [bank, setBank] = useState("");

  const [areas, setAreas] = useState([]);

  useEffect(() => {
    try {
      getPosition(data.position).then((res) => {
        setPositionData(res.data());
      });
    } catch (error) {
      setPosition({});
    }

    try {
      getAreas().then((res) => {
        setAreas(res);
      });
    } catch (error) {
      setAreas([]);
    }
  }, [data]);

  useEffect(() => {
    setNames(data.names);
    setLastNames(data.lastNames);
    setArea(positionData.area);
    setPosition(positionData.name);
    setSalary(positionData.salary);
    setBirthDate(data.birthdate);
    setPhone(data.phone);
    setEmail(data.email);
    setDui(data.dui);
    setAddress(data.address);
    setArea(positionData.area);
    setPosition(positionData.name);
    setSalary(positionData.salary);
    setEntryDate(data.date);
  }, [positionData]);

  const handleSubmit = (e) => {};

  return;
}
