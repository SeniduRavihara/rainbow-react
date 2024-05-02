import { useState } from "react";
import { Document, Page } from "react-pdf";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";

const CompanyProfileTab = ({ companyProfilePdfUrl }: { companyProfilePdfUrl: string }) => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  console.log(companyProfilePdfUrl);
  

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

  if (!companyProfilePdfUrl) return <>Loading...</>
    return (
      <div className="flex items-center justify-center flex-col">
        <Document
          file={companyProfilePdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full h-[600px] overflow-hidden"
        >
          <Page pageNumber={pageNumber} />
        </Document>

        <div className="mt-10 flex flex-col gap-2 items-center justify-center">
          <div className="space-x-4">
            <Button
              onClick={handlePrevPage}
              disabled={pageNumber <= 1}
              variant="outline"
            >
              <IoIosArrowBack />
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={pageNumber >= numPages}
              variant="outline"
            >
              <IoIosArrowForward />
            </Button>
          </div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Button>
            <a
              href={companyProfilePdfUrl}
              download
              className="hover:text-white"
            >
              Download PDF
            </a>
          </Button>
        </div>
      </div>
    );
};

export default CompanyProfileTab;
