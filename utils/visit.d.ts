
console.log(2);
export class Visit {
    constructor (visiterId, start, end ) {
        this.visiterId = visiterId;
        this.start = start;
        this.end = end;
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
            end: visit.end
            };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Visit(data.visiterId, fromFirebaseDate(data.start), fromFirebaseDate(data.end));
    }
};


console.log(1);