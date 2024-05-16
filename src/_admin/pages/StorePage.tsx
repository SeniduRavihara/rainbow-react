import { db, storage } from "@/firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
// import { Tag } from "@chakra-ui/react";
import { Button } from "../../components/ui/button";
import { StoreListType, StoreObj } from "@/types";
import Loader from "../../components/Loader";
import { cn } from "@/lib/utils";
import { CircularProgress } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { IoIosSearch } from "react-icons/io";
import algoliasearch from "algoliasearch/lite";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@/components/ui/input";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { syncLatestStoreWithStore } from "@/firebase/api";

const searchClient = algoliasearch(
  "6K67WTIHLT",
  "0cb3cddf578f097566b65642564992dc"
);

const searchIndex = searchClient.initIndex("stores");

const StorePage = () => {
  const [storeList, setStoreList] = useState<StoreListType | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingActive, setLoadingActive] = useState({ id: "", state: false });
  const [loadingVerify, setLoadingVerify] = useState({ id: "", state: false });
  const [loadingShowProfile, setLoadingShowProfile] = useState({
    id: "",
    state: false,
  });
  const [loadingUpdate, setLoadingShowUpdate] = useState({
    id: "",
    state: false,
  });
  const [lastDocument, setLastDocument] = useState<StoreObj | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuiery, setSearchQuiery] = useState("");
  // const [haveLatestUpdate, setHaveLatestUpdate] = useState(false);

  const [openRviewWindow, setOpenRviewWindow] = useState({
    open: false,
    storeId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const fetchData = async () => {
    setLoading(true);

    const collectionRef = collection(db, "store");
    const q = query(
      collectionRef,
      orderBy("createdAt", "desc"),
      startAfter(lastDocument?.createdAt ?? ""),
      limit(6)
    );

    const queryStoresSnapshot = await getDocs(q);

    const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as StoreListType;

    setLastDocument(storeListArr[storeListArr.length - 1]);
    // console.log(storeListArr);

    if (storeListArr.length > 0) {
      setStoreList((prev) => {
        if (prev && prev[0].id === storeListArr[0].id) return prev;
        return [...(prev || []), ...storeListArr];
      });
    } else {
      console.log("All Store are Fetched!");
    }

    setLoading(false);
  };

  const toggleActive = async (id: string, active: boolean) => {
    setLoadingActive((pre) => ({ ...pre, state: true, id }));
    const documentRef = doc(db, "store", id);
    try {
      await updateDoc(documentRef, {
        active: !active,
      });

      setStoreList((prev) => {
        if (!prev) return prev;

        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              active: !active,
            };
          }
          return item;
        });

        return updatedList;
      });

      try {
        const documentRef = doc(db, "store", id);
        const querySnapshot = await getDoc(documentRef);

        // const storeData = querySnapshot.data() as StoreObj

        const latestDocumentRef = doc(db, "latestStore", id);
        await updateDoc(latestDocumentRef, {
          active: querySnapshot.data()?.active,
        });
      } catch (error) {
        console.error("Error writing document:", error);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    setLoadingActive((pre) => ({ ...pre, state: false, id }));
  };

  const toggleVerify = async (id: string, verified: boolean) => {
    setLoadingVerify((pre) => ({ ...pre, state: true, id }));
    const documentRef = doc(db, "store", id);
    try {
      await updateDoc(documentRef, {
        verified: !verified,
      });

      setStoreList((prev) => {
        if (!prev) return prev;

        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              verified: !verified,
            };
          }
          return item;
        });

        return updatedList;
      });

      try {
        const documentRef = doc(db, "store", id);
        const querySnapshot = await getDoc(documentRef);

        // const storeData = querySnapshot.data() as StoreObj

        const latestDocumentRef = doc(db, "latestStore", id);
        await updateDoc(latestDocumentRef, {
          verified: querySnapshot.data()?.verified,
        });
      } catch (error) {
        console.error("Error writing document:", error);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    setLoadingVerify((pre) => ({ ...pre, state: false, id }));
  };

  const toggleShowProfile = async (id: string, showProfile: boolean) => {
    setLoadingShowProfile((pre) => ({ ...pre, state: true, id }));
    const documentRef = doc(db, "store", id);
    try {
      await updateDoc(documentRef, {
        showProfile: !showProfile,
      });

      setStoreList((prev) => {
        if (!prev) return prev;

        const updatedList = prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              showProfile: !showProfile,
            };
          }
          return item;
        });

        return updatedList;
      });

      try {
        const documentRef = doc(db, "store", id);
        const querySnapshot = await getDoc(documentRef);

        // const storeData = querySnapshot.data() as StoreObj

        const latestDocumentRef = doc(db, "latestStore", id);
        await updateDoc(latestDocumentRef, {
          showProfile: querySnapshot.data()?.showProfile,
        });
      } catch (error) {
        console.error("Error writing document:", error);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
    setLoadingShowProfile((pre) => ({ ...pre, state: false, id }));
  };

  const handleAllowUpdate = async (storeId: string) => {
    setLoadingShowUpdate((pre) => ({ ...pre, state: true, id: storeId }));

    const documentRef = doc(db, "store", storeId);
    const storeDataSnapshot = await getDoc(documentRef);
    const storeObj = storeDataSnapshot.data() as StoreObj; // old data in store collection

    const documentReflatest = doc(db, "latestStore", storeId);
    const snapshot = await getDoc(documentReflatest);
    const storeData = snapshot.data() as StoreObj; //new data in latestStore collection

    const exists = snapshot.exists();

    if (exists) {
      const dataToUpdate = {
        id: snapshot.id || storeObj.id,
        title: storeData.title || storeObj.title,
        active: storeData.active || storeObj.active,
        address: storeData.address || storeObj.address,
        email: storeData.email || storeObj.email,
        tags: storeData.tags || storeObj.tags,
        createdAt: storeData.createdAt || storeObj.createdAt,
        phoneNumber: storeData.phoneNumber || storeObj.phoneNumber,
        whatsappNumber: storeData.whatsappNumber || storeObj.whatsappNumber,
        storeIcon: storeData.storeIcon || storeObj.storeIcon,
        storeImages: storeData.storeImages || storeObj.storeImages,
        userId: storeData.userId || storeObj.userId,
        info1: storeData.info1 || storeObj.info1,
        info2: storeData.info2 || storeObj.info2,
        published: storeData.published || storeObj.published,
        schedulArr: storeData.schedulArr || storeObj.schedulArr,
        fasebook: storeData.fasebook || storeObj.fasebook,
        instagram: storeData.instagram || storeObj.instagram,
        linkedin: storeData.linkedin || storeObj.linkedin,
        twitter: storeData.twitter || storeObj.twitter,
        youtube: storeData.youtube || storeObj.youtube,
        tiktok: storeData.tiktok || storeObj.tiktok,
        website: storeData.website || storeObj.website,
        rating: storeData.rating || storeObj.rating,
        reviewCount: storeData.reviewCount || storeObj.reviewCount,
        category: storeData.category || storeObj.category,
        visitCount: storeData.visitCount || storeObj.visitCount,
        verified: storeData.verified || storeObj.verified,
        gallery: storeData.gallery || storeObj.gallery || "",
        location: storeData.location || storeObj.location || "",
        companyProfilePdfUrl:
          storeData.companyProfilePdfUrl || storeObj.companyProfilePdfUrl || "",
        youtubeVideos: storeData.youtubeVideos || storeObj.youtubeVideos || "",
        showProfile: storeData.showProfile || storeObj.showProfile,
        haveUpdate: storeData.haveUpdate || storeObj.haveUpdate,
      };

      console.log(dataToUpdate);

      await updateDoc(doc(db, "store", storeId), {
        ...dataToUpdate,
      });
      await syncLatestStoreWithStore(storeId);

      // ------------- contacts -----------
      const contactCollectionRefLatest = collection(
        db,
        "latestStore",
        storeId,
        "contacts"
      );
      const contactCollectionSnapshot = await getDocs(
        contactCollectionRefLatest
      );
      const contactExists = !contactCollectionSnapshot.empty;
      // console.log("FIRST SEN", topSliderExists);

      if (contactExists && storeData.haveUpdate.includes("contacts")) {
        const contactsCollectioRef = collection(
          db,
          "store",
          storeId,
          "contacts"
        );
        const querySnapshot = await getDocs(contactsCollectioRef);
        for (const doc of querySnapshot.docs) {
          await deleteDoc(doc.ref);
        }

        for (const docObj of contactCollectionSnapshot.docs) {
          // console.log(docObj.data());

          const contactsDocumentRef = doc(
            db,
            "store",
            storeId,
            "contacts",
            docObj.id // Assuming doc is the DocumentSnapshot object
          );
          await setDoc(contactsDocumentRef, { ...docObj.data() });
        }
        console.log("CONTACTS MOVED");
      }

      // ------------Storage Cleaning And Update with New Links---------------
      // ---------------- gallery ------------------

      if (storeData?.gallery && storeData.haveUpdate.includes("gallery")) {
        try {
          // Get a reference to the latest store images location
          const oldImagesRef = ref(
            storage,
            `/store_data/${storeId}/latest/store-gallery`
          );

          // List all the images in the latest store images location
          const oldImagesList = await listAll(oldImagesRef);

          const galleryUrlsArr: string[] = [];

          // Iterate over each image and move it to the new location
          await Promise.all(
            oldImagesList.items.map(async (oldImageRef) => {
              // Get the image's download URL
              const downloadURL = await getDownloadURL(oldImageRef);

              // Calculate the new image path
              const newImagePath = `/store_data/${storeId}/store-gallery/${oldImageRef.name}`;

              // Fetch the image's data
              const imageData = await fetch(downloadURL);

              // Convert the image data to a Blob
              const imageBlob = await imageData.blob();

              // Upload the image to the new location
              const newImageRef = ref(storage, newImagePath);
              await uploadBytes(newImageRef, imageBlob);

              galleryUrlsArr.push(await getDownloadURL(newImageRef));

              await deleteObject(oldImageRef);
            })
          );

          await updateDoc(doc(db, "store", storeId), {
            gallery: galleryUrlsArr,
          });
          await updateDoc(doc(db, "latestStore", storeId), {
            gallery: galleryUrlsArr,
          });

          // clean previous images from storage
          const newImagesRef = ref(
            storage,
            `/store_data/${storeId}/store-gallery`
          );
          const newImagesList = await listAll(newImagesRef);
          for (const oldImageRef of newImagesList.items) {

            if (storeData.gallery.length-1 < Number(oldImageRef.name)) {
              try {
                await deleteObject(oldImageRef);
              } catch (error) {
                console.error("Error processing image:", error);
              }
            }
          }

          console.log("GALLERY MOVED", galleryUrlsArr);
        } catch (error) {
          console.error("Error handling allow update:", error);
        }
      }

      // -------------- storeImages ---------------

      if (
        storeData?.storeImages &&
        storeData.haveUpdate.includes("storeImages")
      ) {
        // console.log(docObj.data());
        // const documentRef = doc(db, "store", storeId);
        // await updateDoc(documentRef, { storeImages: storeData?.storeImages });

        try {
          const documentRef = doc(db, "store", storeId);
          const storeDataSnapshot = await getDoc(documentRef);
          const storeObj = storeDataSnapshot.data() as StoreObj;

          const storeImages = storeObj.storeImages;

          // Get a reference to the latest store images location
          let index = 1;
          const storeImageUrlsArr: string[] = [];

          for (const url of storeImages) {
            // console.log(url);
            // Fetch the image's data
            const imageData = await fetch(url);

            //     // Convert the image data to a Blob
            const imageBlob = await imageData.blob();

            const newImagePath = `/store_data/${storeId}/store-images/${index}`;
            const newImageRef = ref(storage, newImagePath);
            await uploadBytes(newImageRef, imageBlob);

            // Store the new image's download URL
            storeImageUrlsArr.push(await getDownloadURL(newImageRef));

            // console.log(
            //   `Image '${index}' successfully moved to new location: ${newImagePath}`
            // );

            index++;
          }
          await updateDoc(documentRef, {
            storeImages: storeImageUrlsArr,
          });
          await updateDoc(doc(db, "latestStore", storeId), {
            storeImages: storeImageUrlsArr,
          });

          console.log("STORE_IMAGES MOVED", storeImageUrlsArr);

          const oldImagesRef = ref(
            storage,
            `/store_data/${storeId}/latest/store-images`
          );

          // List all the images in the latest store images location
          const oldImagesList = await listAll(oldImagesRef);

          for (const oldImageRef of oldImagesList.items) {
            try {
              // Delete the old image from the old location in Firebase Storage
              await deleteObject(oldImageRef);
              // console.log(
              //   "Image successfully deleted from old location in Storage!"
              // );
            } catch (error) {
              console.error("Error processing image:", error);
            }
          }
        } catch (error) {
          console.error("Error handling allow update:", error);
        }
      }

      // ------------- companyProfile -------------

      if (
        storeData?.companyProfilePdfUrl &&
        storeData.haveUpdate.includes("companyProfile")
      ) {
        try {
          // Get a reference to the latest store images location
          const oldPdfRef = ref(
            storage,
            `/store_data/${storeId}/latest/store-company-profile-pdfs/${storeId}.pdf`
          );

          const downloadURL = await getDownloadURL(oldPdfRef);

          const newPdfPath = `/store_data/${storeId}/store-company-profile-pdfs/${storeId}.pdf`;

          // Fetch the image's data
          const pdfData = await fetch(downloadURL);

          // Convert the image data to a Blob
          const imageBlob = await pdfData.blob();

          // Upload the image to the new location
          const newImageRef = ref(storage, newPdfPath);
          await uploadBytes(newImageRef, imageBlob);

          const newPdfUrl = await getDownloadURL(newImageRef);

          await deleteObject(oldPdfRef);

          await updateDoc(doc(db, "store", storeId), {
            companyProfilePdfUrl: newPdfUrl,
          });
          await updateDoc(doc(db, "latestStore", storeId), {
            companyProfilePdfUrl: newPdfUrl,
          });

          console.log("PROFILE_PDF MOVED", newPdfUrl);

        } catch (error) {
          console.error("Error handling allow update:", error);
        }
      }

      // -------------- storeIcon ----------------

      if (storeData?.storeIcon && storeData.haveUpdate.includes("storeIcon")) {
        try {
          // Get a reference to the latest store images location
          const oldStoreIconRef = ref(
            storage,
            `/store_data/${storeId}/latest/store_icons/${storeId}`
          );

          const downloadURL = await getDownloadURL(oldStoreIconRef);

          const newPdfPath = `/store_data/${storeId}/store_icons/${storeId}`;

          // Fetch the image's data
          const iconData = await fetch(downloadURL);

          // Convert the image data to a Blob
          const imageBlob = await iconData.blob();

          // Upload the image to the new location
          const newImageRef = ref(storage, newPdfPath);
          await uploadBytes(newImageRef, imageBlob);

          const newIconUrl = await getDownloadURL(newImageRef);

          // console.log(
          //   `ICON '${oldStoreIconRef.name}' successfully moved to new location: ${newPdfPath}`
          // );

          await deleteObject(oldStoreIconRef);
          // console.log(
          //   "ICON successfully deleted from old location in Storage!"
          // );

          // console.log(newIconUrl);
          await updateDoc(doc(db, "store", storeId), {
            storeIcon: newIconUrl,
          });
          await updateDoc(doc(db, "latestStore", storeId), {
            storeIcon: newIconUrl,
          });

          console.log("STORE_ICON MOVED", newIconUrl);

          // console.log("All images successfully moved to new location!");

          // console.log("Latest store document successfully deleted!");
        } catch (error) {
          console.error("Error handling allow update:", error);
        }
      }
    }

    // ---------------- topSlider -------------------

    const topSliderCollectioReflatest = collection(
      db,
      "latestStore",
      storeId,
      "top-slider"
    );
    const topSliderSnapshot = await getDocs(topSliderCollectioReflatest);
    const topSliderExists = !topSliderSnapshot.empty;
    // console.log("FIRST SEN", topSliderExists);

    if (topSliderExists && storeData.haveUpdate.includes("topSlider")) {
      for (const docObj of topSliderSnapshot.docs) {
        // console.log(docObj.data());
        const topSliderDocumentRef = doc(
          db,
          "store",
          storeId,
          "top-slider",
          docObj.id // Assuming doc is the DocumentSnapshot object
        );
        await setDoc(topSliderDocumentRef, { ...docObj.data() });
      }

      try {
        const oldTopSliderRef = ref(
          storage,
          `/store_data/${storeId}/latest/top-slider`
        );

        const oldImagesList = await listAll(oldTopSliderRef);

        let i = 0;

        for (const oldImageRef of oldImagesList.items) {
          try {
            const downloadURL = await getDownloadURL(oldImageRef);
            console.log(i, downloadURL);
            i++;

            const imageData = await fetch(downloadURL);

            const imageBlob = await imageData.blob();

            const newImagePath = `/store_data/${storeId}/top-slider/${oldImageRef.name}`;
            const newImageRef = ref(storage, newImagePath);
            await uploadBytes(newImageRef, imageBlob);

            const newImageDownloadUrl = await getDownloadURL(newImageRef);

            await updateDoc(
              doc(db, "store", storeId, "top-slider", oldImageRef.name),
              {
                imageUrl: newImageDownloadUrl,
              }
            );
            await updateDoc(
              doc(db, "latestStore", storeId, "top-slider", oldImageRef.name),
              {
                imageUrl: newImageDownloadUrl,
              }
            );
            // Delete the old image from the old location in Firebase Storage
            await deleteObject(oldImageRef);

            // Delete the corresponding document from Firestore
            // const oldTopSliderDocumentRef = doc(
            //   db,
            //   "latestStore",
            //   storeId,
            //   "top-slider",
            //   oldImageRef.name
            // );
            // await deleteDoc(oldTopSliderDocumentRef);
          } catch (error) {
            console.error("Error processing image:", error);
          }
        }

        // await Promise.all(
        //   oldImagesList.items.map(async (oldImageRef) => {
        //     console.log("NOT RUN YET");

        //     try {
        //       await deleteObject(oldImageRef);
        //       // console.log(
        //       //   "Image successfully deleted from old location in Storage!"
        //       // );
        //     } catch (error) {
        //       console.error("Error deleting image from old location:", error);
        //     }
        //   })
        // );

        // console.log("All images successfully moved to new location!");

        // console.log("Latest store document successfully deleted!");
      } catch (error) {
        console.error("Error handling allow update:", error);
      }
    }

    // -------------- products -----------------
    const productsCollectioReflatest = collection(
      db,
      "latestStore",
      storeId,
      "products"
    );
    const productsSnapshot = await getDocs(productsCollectioReflatest);
    const productsExists = !productsSnapshot.empty;

    if (productsExists && storeData.haveUpdate.includes("products")) {
      const productsCollectioRef = collection(db, "store", storeId, "products");
      const querySnapshot = await getDocs(productsCollectioRef);
      for (const doc of querySnapshot.docs) {
        await deleteDoc(doc.ref);
      }

      const productNameArr = [];

      for (const docObj of productsSnapshot.docs) {
        // console.log("SENIDU", docObj.data());
        productNameArr.push(docObj.data().name);

        const productsDocumentRef = doc(
          db,
          "store",
          storeId,
          "products",
          docObj.data().name // Assuming doc is the DocumentSnapshot object
        );
        await setDoc(productsDocumentRef, { ...docObj.data() });
      }

      const newProductsRef = ref(storage, `/store_data/${storeId}/products`);
      const newImagesList = await listAll(newProductsRef);

      for (const oldImageRef of newImagesList.items) {

        if (!productNameArr.includes(oldImageRef.name)) {
          await deleteObject(oldImageRef);
        }
      }

      try {
        // Get a reference to the latest store images location
        const oldTopSliderRef = ref(
          storage,
          `/store_data/${storeId}/latest/products`
        );

        // List all the images in the latest store images location
        const oldImagesList = await listAll(oldTopSliderRef);

        let i = 0;

        // Iterate over each image and move it to the new location
        for (const oldImageRef of oldImagesList.items) {
          try {
            // Get the image's download URL
            const downloadURL = await getDownloadURL(oldImageRef);
            console.log(i, downloadURL);
            i++;

            // Fetch the image's data
            const imageData = await fetch(downloadURL);

            // Convert the image data to a Blob
            const imageBlob = await imageData.blob();

            // Upload the image to the new location
            const newImagePath = `/store_data/${storeId}/products/${oldImageRef.name}`;
            const newImageRef = ref(storage, newImagePath);
            await uploadBytes(newImageRef, imageBlob);

            // Get the download URL of the uploaded image
            const newImageDownloadUrl = await getDownloadURL(newImageRef);

            // Update the document in Firestore with the new image URL
            await updateDoc(
              doc(db, "store", storeId, "products", oldImageRef.name),
              {
                imageUrl: newImageDownloadUrl,
              }
            );
            await updateDoc(
              doc(db, "latestStore", storeId, "products", oldImageRef.name),
              {
                imageUrl: newImageDownloadUrl,
              }
            );

            // Log success message
            // console.log(
            //   `Image '${oldImageRef.name}' successfully moved to new location: ${newImagePath}`
            // );

            // Delete the old image from the old location in Firebase Storage
            // await deleteObject(oldImageRef);
            // console.log(
            //   "Image successfully deleted from old location in Storage!"
            // );

            // Delete the corresponding document from Firestore
            // const oldTopSliderDocumentRef = doc(
            //   db,
            //   "latestStore",
            //   storeId,
            //   "top-slider",
            //   oldImageRef.name
            // );
            // await deleteDoc(oldTopSliderDocumentRef);
          } catch (error) {
            console.error("Error processing image:", error);
          }
        }

        await Promise.all(
          oldImagesList.items.map(async (oldImageRef) => {
            try {
              await deleteObject(oldImageRef);
            } catch (error) {
              console.error("Error deleting image from old location:", error);
            }
          })
        );

        console.log("PRODUCTS MOVED");

      } catch (error) {
        console.error("Error handling allow update:", error);
      }
    }

    // ---------------=========----------------

    // await deleteDoc(documentReflatest);
    await updateDoc(documentReflatest, {
      haveUpdate: [],
    });
    await updateDoc(documentRef, {
      haveUpdate: [],
    });

    setLoadingShowUpdate((pre) => ({ ...pre, state: false, storeId }));
  };

  const handlesearch = async (searchQuery: string) => {
    try {
      setLoadingSearch(true);
      const result = await searchIndex.search(searchQuery);
      console.log(result);

      const storeList: StoreListType = result.hits.map((hit: any) => ({
        id: hit.objectID,
        title: hit.title,
        active: hit.active,
        address: hit.address,
        email: hit.email,
        tags: hit.tags,
        createdAt: hit.createdAt,
        phoneNumber: hit.phoneNumber,
        whatsappNumber: hit.whatsappNumber,
        storeIcon: hit.storeIcon,
        storeImages: hit.storeImages,
        userId: hit.userId,
        info1: hit.info1,
        info2: hit.info2,
        published: hit.published,
        schedulArr: hit.schedulArr,
        fasebook: hit.fasebook,
        instagram: hit.instagram,
        linkedin: hit.linkedin,
        twitter: hit.twitter,
        youtube: hit.youtube,
        tiktok: hit.tiktok,
        website: hit.website,
        rating: hit.rating,
        reviewCount: hit.reviewCount,
        category: hit.category || "",
        visitCount: hit.visitCount,
        verified: hit.verified || false,
        gallery: hit.gallery,
        location: hit.location,
        companyProfilePdfUrl: hit.companyProfilePdfUrl,
        youtubeVideos: hit.youtubeVideos,
        showProfile: hit.showProfile,
        haveUpdate: hit.haveUpdate,
      }));
      setLastDocument(null);
      setStoreList(storeList);

      setLoadingSearch(false);
    } catch (error) {
      toast.error("Network Problem");
      console.log("Error");
    }
  };

  const openStoreReview = (storeId: string) => {
    navigate(`/admin/profile-review/${storeId}`);
    // setOpenRviewWindow((pre) => ({ ...pre, storeId, open: true }));
  };

  // console.log(storeList && new Date(storeList[0].createdAt._seconds * 1000).toDateString());

  return (
    <div className="pb-10 flex flex-col items-center justify-center ml-[200px] w-[1000px]">
      {openRviewWindow.open && (
        <div className="w-screen h-screen absolute top-0 left-0 flex flex-col items-center justify-center">
          <div
            className="bg-green-500 hover:bg-green-600 duration-300 w-full flex items-center justify-center"
            onClick={() =>
              setOpenRviewWindow((pre) => ({ ...pre, open: false }))
            }
          >
            <IoArrowBack className="text-5xl text-white" />
          </div>

          <iframe
            className="w-full h-full"
            src={`/business-profile/${openRviewWindow.storeId}`}
            frameBorder="1"
          ></iframe>
        </div>
      )}

      <div className="flex w-full items-center gap-2 h-10 mb-10">
        <Input
          type="text"
          placeholder="Search Business"
          className="outline-none w-[70%] px-2 font-md bg-green-50"
          value={searchQuiery}
          onChange={(e) => setSearchQuiery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handlesearch(searchQuiery);
          }}
        />

        {searchQuiery && (
          <RxCross2
            onClick={() => {
              setSearchQuiery("");
              setLoading(false);
            }}
            className="hover:bg-gray-100 duration-200 text-2xl rounded-md w-8 h-8 p-1"
          />
        )}
        {loadingSearch ? (
          <CircularProgress size="30px" isIndeterminate color="green.300" />
        ) : (
          <IoIosSearch
            onClick={() => handlesearch(searchQuiery)}
            className="bg-orange-500 text-white text-2xl cursor-pointer rounded-md w-9 h-9 p-1"
          />
        )}
      </div>

      <Table striped bordered hover className="">
        <thead>
          <tr>
            <th>#</th>
            <th>Business Name</th>
            <th>Business Category</th>
            <th className="w-[10px]">Address</th>
            <th>Email</th>
            <th>Telephone</th>
            <th>Registered/Requested Date</th>
            <th>ACTION</th>
            <th>VERIFY</th>
            <th>ShowProfile</th>
            <th>Allow Update</th>
          </tr>
        </thead>
        <tbody>
          {storeList &&
            storeList.map((storeObj, index) => (
              <tr key={index}>
                <td className="font-medium">{index + 1}</td>
                <td
                  onClick={() => openStoreReview(storeObj.id)}
                  className="cursor-pointer"
                >
                  {storeObj.title}
                </td>
                <td>{storeObj.category}</td>
                <td>{storeObj.address}</td>
                <td className="font-medium">{storeObj.email}</td>
                {/* <td className="text-right">
                  {storeObj.tags.slice(0, 4).map((tag, index) => (
                    <Tag key={index} className="m-2">
                      {tag}
                    </Tag>
                  ))}
                </td> */}
                <td className="font-medium">{storeObj.phoneNumber}</td>
                <td className="font-medium">
                  {/* {storeObj.createdAt.toDate().toDateString()} */}
                  {storeObj.createdAt &&
                  typeof storeObj.createdAt.toDate === "function"
                    ? storeObj.createdAt.toDate().toDateString()
                    : new Date(
                        (storeObj.createdAt as any)?._seconds * 1000
                      ).toDateString()}
                </td>
                {/* above block have some problem ToDo to fix it */}

                <td className="text-right">
                  <Button
                    className={cn(
                      ` flex items-center justify-center gap-2`,
                      storeObj.active ? "bg-blue-500" : "bg-red-500"
                    )}
                    disabled={
                      loadingActive.id === storeObj.id && loadingActive.state
                    }
                    onClick={() => toggleActive(storeObj.id, storeObj.active)}
                  >
                    {loadingActive.id === storeObj.id &&
                      loadingActive.state && <Loader />}
                    {storeObj.active ? "Dective" : "Active"}
                  </Button>
                </td>

                <td className="text-right">
                  <Button
                    className={cn(
                      ` flex items-center justify-center gap-2`,
                      storeObj.verified ? "bg-blue-500" : "bg-red-500"
                    )}
                    disabled={
                      loadingVerify.id === storeObj.id && loadingVerify.state
                    }
                    onClick={() => toggleVerify(storeObj.id, storeObj.verified)}
                  >
                    {loadingVerify.id === storeObj.id &&
                      loadingVerify.state && <Loader />}
                    {storeObj.verified ? "Remove" : "Verify"}
                  </Button>
                </td>

                <td className="text-right">
                  <Button
                    className={cn(
                      ` flex items-center justify-center gap-2`,
                      !storeObj.showProfile ? "bg-blue-500" : "bg-red-500"
                    )}
                    disabled={
                      loadingShowProfile.id === storeObj.id &&
                      loadingShowProfile.state
                    }
                    onClick={() =>
                      toggleShowProfile(storeObj.id, storeObj.showProfile)
                    }
                  >
                    {loadingShowProfile.id === storeObj.id &&
                      loadingShowProfile.state && <Loader />}
                    {storeObj.showProfile ? "Hide" : "Show"}
                  </Button>
                </td>

                <td className="text-right">
                  <Button
                    className={cn(` flex items-center justify-center gap-2`)}
                    onClick={() => handleAllowUpdate(storeObj.id)}
                  >
                    {loadingUpdate.id === storeObj.id && loadingUpdate.state ? (
                      <Loader />
                    ) : (
                      "Allow"
                    )}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <div className="w-full flex items-center justify-center">
        <Button
          className="flex items-center justify-center"
          onClick={fetchData}
          disabled={loading && !storeList}
        >
          {loading ? <Loader /> : "Load More"}
        </Button>
      </div>
    </div>
  );
};
export default StorePage;
