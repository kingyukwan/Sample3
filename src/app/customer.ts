export class Customer {
    constructor(
        public customerNumber: string,
        public customerName: string,
        public contactLastName: string,
        public contactFirstName: string,
        public phone: string,
        public addressLine1: string,
        public addressLine2: string,
        public city: string,
        public title: string,
        public creditLimit: string,
        public createDate: string,
        public updateDate: string
      ) { }
}
