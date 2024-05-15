import { db, storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import toast from "react-hot-toast";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { CircularProgress } from "@chakra-ui/react";

const CreateCompanyProfile = ({
  storeId,
  pdfUrl,
}: {
  storeId: string;
  pdfUrl: string;
}) => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleClickUpdate = async () => {
    if (pdf) {
      setLoading(true);
      try {
        const pdfDownloadUrl = await handleUploadPdf();

        const documentRef = doc(db, "latestStore", storeId);
        const latestData = await getDoc(documentRef);

        await setDoc(documentRef, {
          ...latestData.data(),
          companyProfilePdfUrl: pdfDownloadUrl,
          haveUpdate: [
            ...(latestData?.data()?.haveUpdate ?? []),
            latestData?.data()?.haveUpdate.includes("companyProfile")
              ? undefined
              : "companyProfile",
          ].filter((txt) => txt),
        });
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    // Check if a file is selected and if it's a PDF
    if (selectedFile && selectedFile.type === "application/pdf") {
      setPdf(selectedFile);
    } else {
      // Reset the selected file if it's not a PDF
      setPdf(null);
      // Optionally, you can display an error message to the user
      toast.error("Please select a PDF file.");
    }
  };

  const handleUploadPdf = async () => {
    if (pdf) {
      try {
        const fileRef = ref(
          storage,
          `store_data/${storeId}/latest/store-company-profile-pdfs/${storeId}.pdf`
        );

        await uploadBytes(fileRef, pdf);
        const pdfUrl = await getDownloadURL(fileRef);
        toast.success("Company Profile Updated successfully!");
        return pdfUrl;
      } catch (error) {
        console.error("Error uploading files:", error);
        alert(
          "An error occurred while uploading files. Please try again later."
        );
      }
    } else {
      alert("No images to upload!");
    }
  };

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
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold">
        Browes the PDF Document of your company Profile and update
      </h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <input
          type="file"
          id="pdf-input"
          hidden
          accept=".pdf" // Restrict file selection to only PDF files
          onChange={handleFileChange}
        />

        <div className="flex items-center justify-center gap-5">
          <label
            htmlFor="pdf-input"
            className="btn py-2 btn-primary text-white shadow-none"
          >
            Browse
          </label>

          <div className="flex items-center justify-center gap-5">
            {loading ? (
              <CircularProgress size="30px" isIndeterminate color="green.300" />
            ) : (
              <Button onClick={handleClickUpdate}>Update</Button>
            )}
          </div>
        </div>
        {/* {pdf && <p>Selected PDF: {pdf.name}</p>} */}
      </div>
      (
      <div className="flex items-center justify-center flex-col">
        <Document
          file={pdf || pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full h-[800px] overflow-hidden"
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
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
        </div>
      </div>
      )
    </div>
  );
};

export default CreateCompanyProfile;
