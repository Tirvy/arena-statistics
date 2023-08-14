import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../lib/firebase";
import { visitConverter } from '@/utils/visit.d.ts';

export default defineEventHandler(async (event) => {
  try {
    const {start} = getQuery(event);
    const q = query(collection(firestoreDb, "visits"), where("start", ">=", new Date(start)), orderBy("start", "asc"), limit(8)).withConverter(visitConverter);
    const querySnapshot = await getDocs(q);

    const docs = Array.from(querySnapshot.docs).map((doc) => {
      return {
        ...doc.data(),
        firebaseId: doc.id,
      };
    });
  
    return docs;
  } catch (error) {
    return { result: [], error: error.message };
  }
});
