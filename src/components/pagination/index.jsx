// import { Button } from "@/components/ui/button";

// const PaginationComp = ({
//   currentPage,
//   totalPages,
//   onPageChange,
 
// }) => {
//   const pageNumbers = [];

//   // Create an array of page numbers
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
//       {/* Pagination Buttons */}
//       <div className="flex justify-center gap-2">
//         <Button
//           size="sm"
//           variant="outline"
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           הקודם
//         </Button>

//         {pageNumbers.map((number) => (
//           <Button
//             size="sm"
//             key={number}
//             onClick={() => onPageChange(number)}
//             className={`${
//               currentPage === number
//                 ? "bg-customBg text-white"
//                 : "bg-white text-black border hover:text-white"
//             }`}
//           >
//             {number}
//           </Button>
//         ))}

//         <Button
//           size="sm"
//           variant="outline"
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           הבא
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default PaginationComp;



import { Button } from "@/components/ui/button";

const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 10;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 5) {
        // Show first 8, then dots, then last
        pages.push(...Array.from({ length: 8 }, (_, i) => i + 1));
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage > totalPages - 5) {
        // Show first, dots, then last 8
        pages.push(1);
        pages.push("...");
        pages.push(
          ...Array.from({ length: 8 }, (_, i) => totalPages - 8 + i + 1)
        );
      } else {
        // Show first, dots, few around current, dots, last
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 2);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(currentPage + 2);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 my-4">
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          הקודם
        </Button>

        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Button
              size="sm"
              key={number}
              onClick={() => onPageChange(number)}
              className={`${
                currentPage === number
                  ? "bg-customBg text-white"
                  : "bg-white text-black border hover:text-white"
              }`}
            >
              {number}
            </Button>
          )
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          הבא
        </Button>
      </div>
    </div>
  );
};

export default PaginationComp;
