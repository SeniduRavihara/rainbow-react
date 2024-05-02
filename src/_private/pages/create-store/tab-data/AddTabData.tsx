import Accordion from "react-bootstrap/Accordion";
import { useParams } from "react-router-dom";
import CreateGallery from "./CreateGallery";
import AddGoogleMapLocation from "./AddGoogleMapLocation";
import CreateCompanyProfile from "./CreateCompanyProfile";

const AddTabData = () => {
  const params = useParams();

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Setup Gallery</Accordion.Header>
          <Accordion.Body>
            <CreateGallery storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Setup Location</Accordion.Header>
          <Accordion.Body>
            <AddGoogleMapLocation storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header>Setup Company Profile</Accordion.Header>
          <Accordion.Body>
            <CreateCompanyProfile storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header>Setup Blogs</Accordion.Header>
          <Accordion.Body>
            <AddGoogleMapLocation storeId={params.storeId || ""} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
export default AddTabData;
