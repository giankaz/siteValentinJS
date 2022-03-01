export class Visitors {
    constructor(visitant) {
        this.visitant = visitant
    }
    static counter = 0

    static dataBase = []

    visitantToDb () {
       Visitors.counter++
       Visitors.dataBase.push(this.visitant)
    }
}

