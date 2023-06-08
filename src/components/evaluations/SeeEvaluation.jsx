import React from "react";

import SeeTemplateQuestions from "../questions/SeeTemplate";
import SeeTemplateCriteria from "../criteria/SeeTemplate";

export default function SeeEvaluation({ data, see, setSee }) {
  return (
    <div>
      {data.type === "Preguntas" ? (
        <SeeTemplateQuestions data={data} see={see} setSee={setSee} />
      ) : (
        <SeeTemplateCriteria data={data} see={see} setSee={setSee} />
      )}
    </div>
  );
}
