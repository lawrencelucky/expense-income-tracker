class Transaction {
    type: any;

    amount: any;

    description: any;

    id: number;

    date: number;

    constructor(type, amount, description, date = Date.now()) {
        this.type = type;
        this.amount = amount;
        this.description = description;
        this.id = Math.random();
        this.date = date;
    }
}

export default Transaction;
