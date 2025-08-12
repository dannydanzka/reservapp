export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'paypal' | 'apple_pay' | 'google_pay' | 'bank_transfer';
  name: string;
  last4?: string;
  brand?: 'visa' | 'mastercard' | 'american_express' | 'discover';
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
  isExpired: boolean;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'fee' | 'credit';
  status: 'completed' | 'pending' | 'failed' | 'cancelled';
  amount: number;
  currency: string;
  description: string;
  service?: {
    id: string;
    name: string;
    venue: string;
  };
  paymentMethod: {
    type: string;
    last4?: string;
    brand?: string;
  };
  date: string;
  receiptUrl?: string;
  refundable: boolean;
  canDownloadInvoice: boolean;
}

export interface WalletBalance {
  available: number;
  pending: number;
  currency: string;
  lastUpdated: string;
}

export interface BillingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  dueDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'cancelled';
  amount: number;
  tax: number;
  total: number;
  currency: string;
  items: InvoiceItem[];
  billingAddress: BillingAddress;
  downloadUrl: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface WalletScreenState {
  balance: WalletBalance;
  paymentMethods: PaymentMethod[];
  transactions: Transaction[];
  invoices: Invoice[];
  selectedTab: 'overview' | 'transactions' | 'methods' | 'invoices';
  isLoading: boolean;
  refreshing: boolean;
  showAddPaymentMethod: boolean;
}

export interface WalletScreenProps {}
