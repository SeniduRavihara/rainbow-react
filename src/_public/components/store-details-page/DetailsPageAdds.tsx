import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DetailsPageAdds = ({
  detailsPageAdds,
}: {
  detailsPageAdds: Array<{ imageUrl: string; id: string; link: string }> | null;
}) => {
  const [randomAdd, setRandomAdd] = useState<{
    imageUrl: string;
    id: string;
    link: string;
  } | null>(null);

  const navigate = useNavigate();

  const handleImageClick = (link: string) => {
    if (detailsPageAdds && link) {
      if (link.startsWith("http") || link.startsWith("https")) {
        // If the URL is an external link, open it in a new tab
        window.open(link, "_blank");
      } else {
        // If the URL is a relative path within your application, use navigate()
        navigate(link);
      }
    }
  };

  useEffect(() => {
    if (detailsPageAdds && detailsPageAdds.length > 0) {
      const randomIndex = Math.floor(Math.random() * detailsPageAdds.length);
      setRandomAdd(detailsPageAdds[randomIndex]);
    }
  }, [detailsPageAdds]);

  // console.log(randomAdd);

  return (
    <div>
      <h2 className="text-center">Advertise</h2>
      <div className="px-10">
        {randomAdd && (
          <img
            src={randomAdd.imageUrl}
            alt={`Ad ${randomAdd.id}`}
            onClick={() => handleImageClick(randomAdd.link)}
          />
        )}
      </div>
    </div>
  );
};

export default DetailsPageAdds;
