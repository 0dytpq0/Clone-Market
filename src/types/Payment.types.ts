export interface Customer {
  customerName: string;
  customerEmail: string;
  customerMobilePhone: string;
  customerId: string;
}
export interface Payment extends Customer {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
  paymentKey: string;
  orderId: string;
}
