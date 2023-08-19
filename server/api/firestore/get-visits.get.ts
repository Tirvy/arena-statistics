import { collection, query, where, orderBy, limit, getDocs, FirestoreDataConverter } from "firebase/firestore";
import { firestoreDb } from "../../lib/firebase";
import { visitConverter } from '@/utils/visitConverter';

export default defineEventHandler(async (event) => {
  try {
    const { start } = getQuery(event);
    const q = query(collection(firestoreDb, "visits"), where("start", ">=", new Date(start as number)), orderBy("start", "asc"), limit(8))
    // @ts-ignore
      .withConverter(visitConverter as FirestoreDataConverter<Visit, DocumentData>);
    const querySnapshot = await getDocs(q);

    const docs = Array.from(querySnapshot.docs).map((doc) => {
      return {
        ...doc.data(),
        firebaseId: doc.id,
      };
    });

    return docs;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { result: [], error: error.message };
    }
    console.log(String(error));
  }
});
