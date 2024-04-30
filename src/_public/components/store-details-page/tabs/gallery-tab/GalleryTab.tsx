
import Lightbox from "yet-another-react-lightbox";
// import { slides } from "./data";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Thumbnails,
  Zoom,
} from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Images from "./Images";
import { useEffect, useState } from "react";

const GalleryTab = ({ gallery }: { gallery: string[] }) => {
  const [index, setIndex] = useState<number>(-1);
  const [slides, setSlides] = useState<Array<{src: string}>>()

  useEffect(() => {
  
    const formattedSlides = gallery.map((src) => ({ src }));
    setSlides(formattedSlides);
    console.log("Wworking", formattedSlides);
    console.log(slides);
    
  }, [gallery, slides]);

  return (
    <div className="w-full h-full">
      {/* <ul className="grid grid-cols-4 gap-2">
        {gallery.map((image, index) => (
          <li key={index}>
            <img src={image} alt="" className="w-[200px]" />
          </li>
        ))}
      </ul> */}

      <>
        {/* <button onClick={() => setOpen(true)}>Open Lightbox</button> */}

        {slides && <Images
          data={slides}
          onClick={(currentIndex) => setIndex(currentIndex)}
        />}

        <Lightbox
          plugins={[Fullscreen, Zoom, Thumbnails]}
          captions={{
            showToggle: true,
            descriptionTextAlign: "end",
          }}
          // open={open}
          // close={() => setOpen(false)}

          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
        />
      </>
    </div>
  );
};
export default GalleryTab;
