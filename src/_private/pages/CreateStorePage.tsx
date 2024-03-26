import ImageSwiper from "../components/ImageSwiper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./register.css";

const CreateStorePage = () => {
  const swiperSlides = [
    /**
     * Container element for the create store page.
     */
    <div className="">
      <div className="img-area">
        <div className="">
          <div>
            <img
              src="/assets/img/image-gallery.png"
              className="w-10 h-10"
              alt=""
            />
          </div>
          <p>
            Select your store images <span>Brower</span>
          </p>
        </div>
      </div>
    </div>,
    <div className="">
      <div className="img-area">
        <div className="upload-img">
          <div id="createstoreimg1">
            <img
              src="/assets/img/image-gallery.png"
              className="w-10 h-10"
              alt=""
            />
          </div>
          <p>
            Select your store images <span id="storebuttonimages1">Brower</span>
          </p>
        </div>
      </div>
    </div>,
    <div className="">
      <div className="img-area">
        <div className="">
          <div>
            <img
              src="/assets/img/image-gallery.png"
              className="w-10 h-10"
              alt=""
            />
          </div>
          <p>
            Select your store images <span id="storebuttonimages1">Brower</span>
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="create-store w-full h-screen flex items-center justify-center bg-[#aec5e8]">
      <Card className="w-[80%] h-[85%] p-10 flex flex-col gap-10">
        <CardHeader>
          <CardTitle className="-mt-10">
            <h1 className="text-center text-4xl font-bold text-[#005eff]">
              Create Store
            </h1>
          </CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex -mt-10 gap-20">
            <div className="-mt-10">
              <ImageSwiper swiperSlides={swiperSlides} />
            </div>

            <div className="form-conten flex flex-col">
              <div
                className="logo"
                id="logo-content"
                style={{ display: "flex" }}
              >
                <button
                  className="photo-add-button"
                  id="logo-button"
                  type="button"
                >
                  <IonIcon icon={addOutline}></IonIcon>
                </button>
                <div id="previewImagelogo"></div>
                <p className=" text-center">
                  Select your logo <span id="storebuttonlogo">Brower</span>
                </p>
              </div>

              <form>
                <div className="input-form grid grid-cols-2">
                  <input
                    type="text"
                    name="title"
                    required
                    placeholder=" title"
                  />

                  <input
                    type="text"
                    name="address"
                    required
                    placeholder=" address"
                  />

                  <input
                    type="text"
                    name="mobile"
                    required
                    placeholder="Phone number"
                  />

                  <input
                    type="text"
                    name="whats_number"
                    required
                    placeholder="Whatsapp number"
                  />

                  <input type="text" name="tag" required placeholder="Tag" />

                  <input
                    type="submit"
                    value="Submit"
                    id="subbtn"
                    className=" flex items-center justify-center p-3 font-xl text-white bg-[#0c86ac]"
                  />
                </div>
              </form>
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
      </Card>
      {/* <h1 className="text-center">Create Store</h1> */}
    </div>
  );
};
export default CreateStorePage;
