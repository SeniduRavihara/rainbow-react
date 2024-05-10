import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";
// import CreateGallery from "./CreateGallery";
import AddGoogleMapLocation from "./AddGoogleMapLocation";
import CreateCompanyProfile from "./CreateCompanyProfile";
import AddVideosTab from "./AddVideosTab";
import AddOurProductsTab from "./AddOurProductsTab";
import AddContactTab from "./AddContactTab";
// import AddBlogTab from "./AddBlogTab";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import AddInfoTab from "./AddInfoTab";
import AddGalleryTab from "./AddGalleryTab";
import UpdateTopSlider from "@/_private/components/UpdateTopSlider";

const AddTabData = () => {
  const params = useParams();
  const navigate = useNavigate();

  const handlePrevClick = () => {
    if (params.storeId) navigate(`/manage-store/${params.storeId}`);
  };

  return (
    <div className="p-10">
      <Button variant="outline" className="mb-10" onClick={handlePrevClick}>
        <FaArrowLeft />
      </Button>

      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Setup Infomation</Accordion.Header>
          <Accordion.Body>
            <AddInfoTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Setup Gallery</Accordion.Header>
          <Accordion.Body>
            <AddGalleryTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Setup Location</Accordion.Header>
          <Accordion.Body>
            <AddGoogleMapLocation storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Setup Company Profile</Accordion.Header>
          <Accordion.Body>
            <CreateCompanyProfile storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        {/* <Accordion.Item eventKey="4">
          <Accordion.Header>Setup Blogs</Accordion.Header>
          <Accordion.Body>
            <AddBlogTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item> */}

        <Accordion.Item eventKey="5">
          <Accordion.Header>Setup Videos</Accordion.Header>
          <Accordion.Body>
            <AddVideosTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="6">
          <Accordion.Header>Setup Products</Accordion.Header>
          <Accordion.Body>
            <AddOurProductsTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="7">
          <Accordion.Header>Setup Contact</Accordion.Header>
          <Accordion.Body>
            <AddContactTab storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>


        <Accordion.Item eventKey="8">
          <Accordion.Header>Setup Top Slider</Accordion.Header>
          <Accordion.Body>
            <UpdateTopSlider storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default AddTabData;
