import * as functions from "firebase-functions";
import {Like} from "./types";
import dbUtils from "./utils/db_utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const admin = require("firebase-admin");
const firestore = admin.firestore();

exports.erickLikesGirl = functions.https.onRequest(async (req, res) => {
  const querySnapshot = await firestore.collection("profiles").get();
  for (const document of querySnapshot.docs) {
    await firestore.collection("profiles").doc(document.id).update({
      likedBy: [],
    });
  }

  const matchesQuerySnapshot = await firestore.collection("matches").get();
  for (const document of matchesQuerySnapshot.docs) {
    await document.ref.delete();
  }

  const possibleMatchesSnapshot = await firestore.collection("possibleMatches").get();
  for (const document of possibleMatchesSnapshot.docs) {
    await document.ref.delete();
  }

  const likesSnapshot = await firestore.collection("likes").get();
  for (const document of likesSnapshot.docs) {
    await document.ref.delete();
  }

  const pairsSnapshot = await firestore.collection("pairs").get();
  for (const document of pairsSnapshot.docs) {
    await document.ref.delete();
  }


  const like: Like = {
    likedProfileID: "hlx1y3vcFAEXmlPNCN1I",
    profileID: "bxLjcxVZzlexU040cKCnh5xROLq1",
    creationDate: Date.now(),
  };

  await firestore.collection("likes").add(like);

  res.sendStatus(200);
});

exports.testMatches = functions.https.onRequest(async (req, res) => {
  const match = await dbUtils.getMatch("sbBS1MkYwQMExhpFt5he");

  const pms = await dbUtils.getPossibleMatches(match.id);
  for (const possibleMatch of pms) {
    console.log(possibleMatch.id);
  }
});