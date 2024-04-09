import { useEffect, useState } from "react";

const DetailsPageAdds = ({
  detailsPageAdds,
}: {
  detailsPageAdds: Array<{ imageUrl: string; id: string }> | null;
}) => {
  const [randomAdd, setRandomAdd] = useState<{
    imageUrl: string;
    id: string;
  } | null>(null);

  useEffect(() => {
    if (detailsPageAdds && detailsPageAdds.length > 0) {
      const randomIndex = Math.floor(Math.random() * detailsPageAdds.length);
      setRandomAdd(detailsPageAdds[randomIndex]);
    }
  }, [detailsPageAdds]);

  console.log(randomAdd);

  return (
    <div>
      <h2 className="text-center">Advertise</h2>
      {randomAdd && <img src={randomAdd.imageUrl} alt={`Ad ${randomAdd.id}`} />}
    </div>
  );
};

export default DetailsPageAdds;
