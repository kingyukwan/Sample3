export class Order {
    constructor(
        public orderNumber: string,
        public orderDate: string,
        public requiredDate: string,
        public shippedDate: string,
        public itemQty: string,
        public status: string,
        public remarks: string
      ) { }
}
