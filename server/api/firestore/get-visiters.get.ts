import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../lib/firebase";

export default defineEventHandler(async (event) => {
  try {
    const q = query(collection(firestoreDb, "customers"), orderBy("date", "desc"), limit(1));
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
