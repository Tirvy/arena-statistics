export class VisitObj implements Visit {

    visiterId = '';
    start = new Date();
    end = new Date();
    checkType = 'other';
    checkSum = 0;
    constructor(visiterId: string, start: Date, end: Date, check_type: string, check_sum: number) {
        this.visiterId = visiterId;
        this.start = start;
        this.end = end;
        this.checkType = check_type;
        this.checkSum = +check_sum || null;
    }
    toString() {
        return this.visiterId;
    }
}
