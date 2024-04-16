import React from "react";
import { useLocation } from "react-router-dom";
import PreviewPDF from "../ViewPrescription/PreviewPdf";

function ViewPrescription() {
  const location = useLocation();
  const { prescription } = location.state;

  return (
    <>
      <PreviewPDF data={prescription} />
    </>
  );
}

export default ViewPrescription;
