import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdf from "./contane.pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const CompanyProfileTab = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        className="w-[400px] h-[600px] overflow-hidden"
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div>
        <button onClick={handlePrevPage} disabled={pageNumber <= 1}>
          <IoIosArrowBack />
        </button>
        <button onClick={handleNextPage} disabled={pageNumber >= numPages}>
          <IoIosArrowForward />
        </button>
      </div>
      <p>
        Page {pageNumber} of {numPages}
      </p>
      <a href={pdf} download>
        Download PDF
      </a>
    </div>
  );
};

export default CompanyProfileTab;
