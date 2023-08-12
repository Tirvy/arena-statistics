import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../lib/firebase";
import { visitConverter } from '@/utils/visit.d.ts';

export default defineEventHandler(async (event) => {
  try {
    const q = query(collection(firestoreDb, "visits"), limit(10)).withConverter(visitConverter);
    const querySnapshot = await getDocs(q);

    const docs = Array.from(querySnapshot.docs).map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  
    return docs;
    return { result: Array.from(querySnapshot.docs).map(item => item.data()) };
  } catch (error) {
    return { result: [], error: error.message };
  }
});
