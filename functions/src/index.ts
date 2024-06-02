import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import algoliasearch from "algoliasearch";

const env = functions.config();
const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex("stores");
const categoryindex = client.initIndex("categories");

admin.initializeApp();

// -----------------------------------------------

export const onStoreCreated = functions.firestore
  .document("store/{storeId}")
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: ctx.params.storeId,
      ...snap.data(),
    });
  });

// -----------------------------------------------

export const onStoreDelete = functions.firestore
  .document(`store/{storeId}`)
  .onDelete((snap, ctx) => {
    return index.deleteObject(ctx.params.storeId);
  });

// -----------------------------------------------

export const onStoreUpdate = functions.firestore
  .document("store/{storeId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data(); // Get the updated data
    const objectID = context.params.storeId; // Get the ID of the updated document

    return await index.partialUpdateObject({
      objectID,
      ...newData,
    });
  });

// -----------------------------------------------

// export const onStoreUpdateSyncWithLatestStore = functions.firestore
//   .document("store/{storeId}")
//   .onUpdate(async (change, context) => {
//     const newData = change.after.data(); // Get the updated data
//     const storeId = context.params.storeId; // Get the ID of the updated document

//     // Update specific fields in latestStore document without overwriting its entire content
//     const latestStoreRef = admin.firestore().doc(`latestStore/${storeId}`);
//     await latestStoreRef.set(
//       {
//         ...newData,
//       },
//       { merge: true }
//     );

//     // You can also update other fields in latestStore document
//     // based on the newData or other logic

//     return null; // This is necessary if you're using async functions
//   });

// -----------------------------------------------

export const onStoreDeleteLatestStoreDelete = functions.firestore
  .document("store/{storeId}")
  .onDelete(async (snapshot, context) => {
    const storeId = context.params.storeId; // Get the ID of the deleted document

    // Delete corresponding document in latestStore collection
    const latestStoreRef = admin.firestore().doc(`latestStore/${storeId}`);
    await latestStoreRef.delete();

    return null; // This is necessary if you're using async functions
  });

// -----------------------------------------------

export const onStoreCreateLatestStoreCreate = functions.firestore
  .document("store/{storeId}")
  .onCreate(async (snapshot, context) => {
    const newData = snapshot.data(); // Get the newly created data
    const storeId = context.params.storeId; // Get the ID of the newly created document

    // Create corresponding document in latestStore collection
    const latestStoreRef = admin.firestore().doc(`latestStore/${storeId}`);
    await latestStoreRef.set(newData);

    return null; // This is necessary if you're using async functions
  });

// -----------------------------------------------
// -----------------------------------------------

export const onCategoryCreated = functions.firestore
  .document("categories/{categoryId}")
  .onCreate((snap, ctx) => {
    return categoryindex.saveObject({
      objectID: ctx.params.categoryId,
      ...snap.data(),
    });
  });

// -----------------------------------------------

export const onCategoryDelete = functions.firestore
  .document(`categories/{categoryId}`)
  .onDelete((snap, ctx) => {
    return categoryindex.deleteObject(ctx.params.categoryId);
  });

// -----------------------------------------------
