import { Button } from "@/components/ui/button";

const PaginationComp = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  console.log(currentPage, totalPages);

  // Create an array of page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center gap-4 my-4">
      <Button
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        הקודם
      </Button>

      {pageNumbers.map((number) => (
        <Button
          size="sm"
          key={number}
          onClick={() => onPageChange(number)}
          className={`${currentPage === number ? "bg-customBg" : ""}`}
        >
          {number}
        </Button>
      ))}

      <Button
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        הבא
      </Button>
    </div>
  );
};

export default PaginationComp;