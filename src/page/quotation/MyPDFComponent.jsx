import React, { useState } from "react";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";

export default function MyPDFComponent() {
  const exportPDF = () => {
    let element = (
      <div style={{ display: "flex", flexWrap: "wrap" }}>Sample Text</div>
    );
    const doc = new jsPDF("p", "pt", "letter");
    doc.html(ReactDOMServer.renderToString(element), {
      callback: function (doc) {
        doc.save("sample.pdf");
      },
    });
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={exportPDF}>export</button>
    </div>
  );
}
