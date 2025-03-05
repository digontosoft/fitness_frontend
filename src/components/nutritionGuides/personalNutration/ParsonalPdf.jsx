// import { base_url } from "@/api/baseUrl";
// import { useEffect, useState } from "react";

// const ParsonalPdf = ({ data }) => {
//   const pdfUrl = `${base_url}/${data?.pdf_link}`;

//   return (
//     <div className="w-3/4 py-8 px-4 md:px-6">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
//         {data?.title}
//       </h2>
//       <p className="text-center text-gray-700 mb-4">{data?.description}</p>

//       <div className="relative w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
//         <iframe src={pdfUrl} className="w-full h-full" allowFullScreen></iframe>
//       </div>
//     </div>
//   );
// };

// export default ParsonalPdf;

import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { base_url } from "@/api/baseUrl";
import * as pdfjs from "pdfjs-dist/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const ParsonalPdf = ({ data }) => {
  const pdfUrl = `${base_url}/${data?.pdf_link}`;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
        {data?.title}
      </h2>
      <p className="text-center text-gray-700 mb-4">{data?.description}</p>

      <div className="relative w-full border border-gray-300 rounded-lg overflow-hidden">
        <Worker workerUrl={pdfjs.GlobalWorkerOptions.workerSrc}>
          <div className="w-full h-[80vh] overflow-y-auto">
            <Viewer className="w-full" fileUrl={pdfUrl} />
          </div>
        </Worker>
      </div>
    </div>
  );
};

export default ParsonalPdf;
