import * as FirebaseFirestore from 'firebase/firestore';
import { VisitObj } from './visit';


export const visitConverter = {
    // toFirestore: (visit) => {
    //     return {
    //         visiter_id: visit.visiterId,
    //         start: visit.start,
    //         end: visit.end,
    //         check_type: visit.checkType,
    //         check_sum: visit.checkSum,
    //     };
    // },
    fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot, options: FirebaseFirestore.SnapshotOptions) => {
        const data = snapshot.data(options);
        return new VisitObj(data.visiter_id, data.start.toDate(), data.end.toDate(), data.check_type, data.check_sum);
    }
};