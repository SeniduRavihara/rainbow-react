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

// export const createUserSuccessMessage = functions.auth
//   .user()
//   .onCreate((user) => {
//     console.log("New user created:", user.uid);
//     console.log("Welcome, ", user.displayName || "User");
//     return null;
//   });

// export const helloWorld = onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
