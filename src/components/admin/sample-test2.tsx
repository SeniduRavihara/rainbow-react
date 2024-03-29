import { uploadAdd } from "@/firebase/api";
import { db } from "@/firebase/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const SampleTest2 = () => {
  const [sectionAdds, setSectionAdds] = useState<Array<{
    imageUrl: string;
    id: string;
    imageFile?: File;
  }> | null>(null);

  useEffect(() => {
    console.log(sectionAdds);
  }, [sectionAdds]);

  useEffect(() => {
    const collectionRef = collection(db, "sectionAdds");
    const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
      const sliderAddsArr = QuerySnapshot.docs.map((doc) => {
        const sliderAddsList = doc.data() as { imageUrl: string };
        return {
          ...sliderAddsList,
          id: doc.id,
        };
      });
      // console.log(sliderAddsArr);
      setSectionAdds(sliderAddsArr);
    });

    return unsubscribe;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.files) {
      const file = e.target.files[0];

      setSectionAdds((prev) => {
        if (!prev) return prev; // Handle null case
        const updatedAdds = prev.map((add) => {
          if (add.id === id) {
            return {
              ...add,
              imageFile: file,
            };
          }
          return add;
        });
        return updatedAdds;
      });
    }
  };

  const handleClickUpdate = async (idToUpdate: string) => {
    if (!sectionAdds) return;
    const addToUpdate = sectionAdds.find(({ id }) => id === idToUpdate);
    if (!addToUpdate?.imageFile) {
      console.error("Add not found");
      return;
    }

    try {
      const imageUrl = await uploadAdd(addToUpdate.imageFile, "section_adds");
      try {
        const documentRef = doc(db, "sectionAdds", idToUpdate);
        await updateDoc(documentRef, {
          imageUrl,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error uploading add:", error);
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="home"
      role="tabpanel"
      aria-labelledby="home-tab"
    >
      <div className="">
        <h2 className="text-primary fw-bold">Index 1</h2>
        <div className="flex flex-col w-full gap-5">
          {sectionAdds &&
            sectionAdds.map((add) => (
              <div key={add.id} className="w-full">
                <input
                  type="file"
                  id={add.id}
                  hidden
                  onChange={(e) => handleChange(e, add.id)}
                />
                <input type="text" hidden />
                <div className="card">
                  <div>
                    <img
                      className="card-img-top"
                      src={add.imageUrl}
                      alt="Card image cap"
                    />
                  </div>
                  <div className="card-body">
                    <div className="flex items-center justify-center gap-10">
                      <label
                        htmlFor={add.id}
                        className="btn btn-primary text-white shadow-none"
                      >
                        Brower
                      </label>
                      <button
                        onClick={() => handleClickUpdate(add.id)}
                        className="index1img1update btn btn-warning text-white shadow-none"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SampleTest2;
