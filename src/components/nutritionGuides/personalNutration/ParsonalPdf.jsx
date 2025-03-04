// import { base_url } from "@/api/baseUrl";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
// import { getFilePlugin } from "@react-pdf-viewer/get-file";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/toolbar/lib/styles/index.css";
// import React from "react";

import { base_url } from "@/api/baseUrl";

// const ParsonalPdf = ({ data }) => {
//   if (!data)
//     return <p className="text-center text-lg font-medium">No Data Available</p>;

//   const pdfUrl = `${base_url}/${data.pdf_link}`;

//   // Initialize Plugins
//   const toolbarPluginInstance = toolbarPlugin();
//   const getFilePluginInstance = getFilePlugin();
//   const { Toolbar } = toolbarPluginInstance;
//   const { Download } = getFilePluginInstance;

//   return (
//     <div className="min-w-5xl mx-auto py-8 px-4 md:px-6">
//       {/* Title & Description */}
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
//         {data.title}
//       </h2>
//       <p className="text-center text-gray-700 mb-4">{data.description}</p>

//       {/* PDF Toolbar */}
//       <div className="flex flex-wrap justify-between items-center mb-4 p-3 bg-gray-100 rounded-lg shadow-md">
//         <Toolbar>
//           {(props) => {
//             const { ZoomIn, ZoomOut } = props;
//             return (
//               <div className="flex gap-4">
//                 <Download />
//               </div>
//             );
//           }}
//         </Toolbar>
//       </div>

//       {/* PDF Viewer (Responsive) */}
//       <div className="relative w-full object-cover min-h-[400px] sm:min-h-[500px] lg:min-h-[700px] border border-gray-300 rounded-lg overflow-hidden">
//         <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
//           <Viewer
//             fileUrl={pdfUrl}
//             plugins={[toolbarPluginInstance, getFilePluginInstance]}
//           />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default ParsonalPdf;

// const ParsonalPdf = ({ data }) => {
//   console.log("pdf data", data);
//   if (!data)
//     return <p className="text-center text-lg font-medium">No Data Available</p>;

//   const pdfUrl = `${base_url}/${data.pdf_link}`;

//   return (
//     <div className="max-w-5xl mx-auto py-8 px-4 md:px-6">
//       <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
//         {data.title}
//       </h2>
//       <p className="text-center text-gray-700 mb-4">{data.description}</p>

//       <div className="relative w-full h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
//         <iframe src={pdfUrl} className="w-full h-full" allowFullScreen></iframe>
//       </div>
//     </div>
//   );
// };

// export default ParsonalPdf;

const ParsonalPdf = ({ data }) => {
  console.log("pdf data", data);
  if (!data)
    return <p className="text-center text-lg font-medium">No Data Available</p>;

  const pdfUrl = `${base_url}/${data?.pdf_link}`;

  return (
    <div className="w-3/4 py-8 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
        {data?.title}
      </h2>
      <p className="text-center text-gray-700 mb-4">{data?.description}</p>

      <div className="relative w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
        <iframe src={pdfUrl} className="w-full h-full" allowFullScreen></iframe>
      </div>
    </div>
  );
};

export default ParsonalPdf;
