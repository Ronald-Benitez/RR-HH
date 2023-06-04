import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment/moment";

import Navbar from "../components/navbar/Navbar";
import { getCandidates } from "../firebase/candidates";
import AddCandidateModal from "../components/candidates/AddCandidateModal";
import Table from "../components/candidates/Table";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [date, setDate] = useState(moment());
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getCandidates().then((candidates) => {
      const data = candidates.docs.map((res) => ({
        id: res.id,
        ...res.data(),
      }));
      setCandidates(data || []);
    });
  }, [reload]);

  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-between align-items-center m-5">
        <h2>Gestión de candidatos</h2>

        <AddCandidateModal
          toaster={toast}
          reload={reload}
          setReload={setReload.bind()}
        />
      </div>
      <Table
        candidates={candidates}
        toaster={toast}
        reload={reload}
        setReload={setReload.bind()}
      />
      <Toaster />
    </div>
  );
}
