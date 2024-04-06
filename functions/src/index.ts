import * as functions from "firebase-functions";
import algoliasearch from "algoliasearch";

const env = functions.config();
const client = algoliasearch(env.algolia.app_id, env.algolia.admin_api_key);
const index = client.initIndex("stores");

export const onStoreCreated = functions.firestore
  .document("store/{storeId}")
  .onCreate((snap, ctx) => {
    return index.saveObject({
      objectID: ctx.params.storeId,
      ...snap.data(),
    });
  });

export const onStoreDelete = functions.firestore
  .document(`store/{storeId}`)
  .onDelete((snap, ctx) => {
    return index.deleteObject(ctx.params.storeId);
  });

exports.onStoreUpdate = functions.firestore
  .document("store/{storeId}")
  .onUpdate(async (change, context) => {
    const newData = change.after.data(); // Get the updated data
    const objectID = context.params.storeId; // Get the ID of the updated document

    return await index.partialUpdateObject({
      objectID,
      ...newData,
    });
  });

