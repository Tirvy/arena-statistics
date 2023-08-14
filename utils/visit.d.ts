export class Visit {
    constructor (visiterId, start, end, check_type, check_sum ) {
        this.visiterId = visiterId;
        this.start = start;
        this.end = end;
        this.checkType = check_type;
        this.checkSum = check_sum;
    }
    toString() {
        return this.visiterId;
    }
}

const fromFirebaseDate = (date) => {
    return new Date(date.seconds * 1000).toLocaleString();
}

export const visitConverter = {
    toFirestore: (visit) => {
        return {
            visiter_id: visit.visiterId,
            start: visit.start,
            end: visit.end,
            check_type: checkType,
            check_sum: checkSum,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Visit(data.visiter_id, fromFirebaseDate(data.start), fromFirebaseDate(data.end), data.check_type, data.check_sum);
    }
};