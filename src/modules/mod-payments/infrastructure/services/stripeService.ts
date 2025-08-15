import { API_ENDPOINTS } from '@shared/config/api.config';
import { ApiResponse, PaginatedResponse, PaginationOptions } from '@http/types/request.types';
import { handleRequest } from '@http/handleRequest.config';

// Stripe Test Data for Development
export const STRIPE_TEST_DATA = {
  // Test card data
  TEST_CARDS: {
    MASTERCARD_SUCCESS: {
      brand: 'mastercard',
      cvc: '123',
      expiryMonth: 12,
      expiryYear: 2025,
      last4: '4444',
      number: '5555555555554444',
    },
    VISA_DECLINED: {
      brand: 'visa',
      cvc: '123',
      expiryMonth: 12,
      expiryYear: 2025,
      last4: '0002',
      number: '4000000000000002',
    },
    VISA_SUCCESS: {
      brand: 'visa',
      cvc: '123',
      expiryMonth: 12,
      expiryYear: 2025,
      last4: '4242',
      number: '4242424242424242',
    },
  },

  // Test Payment Method ID (Visa card ending in 4242)
  TEST_PAYMENT_METHOD_ID: 'pm_card_visa_test',
} as const;

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'digital_wallet';
  brand?: string;
  last4?: string;
  expiryMonth?: number;
  expiryYear?: number;
  holderName?: string;
  isDefault: boolean;
  createdAt: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status:
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'succeeded'
    | 'canceled';
  clientSecret: string;
  paymentMethodId?: string;
  metadata: Record<string, string>;
  createdAt: string;
}

export interface CreatePaymentIntentData {
  amount: number;
  currency: string;
  paymentMethodId?: string;
  reservationId: string;
  description?: string;
  metadata?: Record<string, string>;
}

export interface CreatePaymentMethodData {
  type: 'card';
  card: {
    number: string;
    expiryMonth: number;
    expiryYear: number;
    cvc: string;
  };
  billingDetails: {
    name: string;
    email?: string;
    address?: {
      line1: string;
      line2?: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
}

export interface ConfirmPaymentData {
  paymentIntentId: string;
  paymentMethodId?: string;
  savePaymentMethod?: boolean;
}

export interface PaymentHistory {
  id: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  reservationId: string;
  venueName: string;
  serviceName: string;
  paymentMethod: {
    type: string;
    brand?: string;
    last4?: string;
  };
  createdAt: string;
}

class StripeService {
  private readonly baseUrl =
    process.env.REACT_APP_API_BASE_URL || 'https://reservapp-web.vercel.app/api';

  // Payment Methods
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const response = await handleRequest<ApiResponse<PaymentMethod[]>>({
      endpoint: API_ENDPOINTS.PAYMENTS.PAYMENT_METHODS,
      method: 'get',
      url: this.baseUrl,
    });

    return response.data;
  }

  async createPaymentMethod(data: CreatePaymentMethodData): Promise<PaymentMethod> {
    const response = await handleRequest<ApiResponse<PaymentMethod>>({
      body: data,
      endpoint: API_ENDPOINTS.PAYMENTS.PAYMENT_METHODS,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  async updatePaymentMethod(
    paymentMethodId: string,
    updates: Partial<PaymentMethod>
  ): Promise<PaymentMethod> {
    const response = await handleRequest<ApiResponse<PaymentMethod>>({
      body: updates,
      endpoint: `${API_ENDPOINTS.PAYMENTS.PAYMENT_METHODS}/${paymentMethodId}`,
      method: 'patch',
      url: this.baseUrl,
    });

    return response.data;
  }

  async deletePaymentMethod(paymentMethodId: string): Promise<void> {
    await handleRequest<ApiResponse<void>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.PAYMENT_METHODS}/${paymentMethodId}`,
      method: 'delete',
      url: this.baseUrl,
    });
  }

  async setDefaultPaymentMethod(paymentMethodId: string): Promise<void> {
    await handleRequest<ApiResponse<void>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.PAYMENT_METHODS}/${paymentMethodId}/default`,
      method: 'patch',
      url: this.baseUrl,
    });
  }

  // Payment Intents
  async createPaymentIntent(data: CreatePaymentIntentData): Promise<PaymentIntent> {
    console.log('🔄 Creating payment intent with data:', data);
    console.log('🌐 Request URL:', `${this.baseUrl}${API_ENDPOINTS.PAYMENTS.CREATE_INTENT}`);
    
    try {
      const response = await handleRequest<ApiResponse<PaymentIntent>>({
        body: data,
        endpoint: API_ENDPOINTS.PAYMENTS.CREATE_INTENT,
        method: 'post',
        url: this.baseUrl,
      });

      console.log('✅ Payment intent response:', response);
      return response.data;
    } catch (error) {
      console.error('❌ Payment intent creation failed:', error);
      throw error;
    }
  }

  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const response = await handleRequest<ApiResponse<PaymentIntent>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.CREATE_INTENT}/${paymentIntentId}`,
      method: 'get',
      url: this.baseUrl,
    });

    return response.data;
  }

  async confirmPayment(data: ConfirmPaymentData): Promise<PaymentIntent> {
    const response = await handleRequest<ApiResponse<PaymentIntent>>({
      body: data,
      endpoint: API_ENDPOINTS.PAYMENTS.CONFIRM_PAYMENT,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<PaymentIntent> {
    const response = await handleRequest<ApiResponse<PaymentIntent>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.CREATE_INTENT}/${paymentIntentId}/cancel`,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  // Payment History
  async getPaymentHistory(
    pagination?: PaginationOptions
  ): Promise<PaginatedResponse<PaymentHistory[]>> {
    const queryParams = new URLSearchParams();

    if (pagination) {
      if (pagination.page) queryParams.append('page', pagination.page.toString());
      if (pagination.limit) queryParams.append('limit', pagination.limit.toString());
      if (pagination.sortBy) queryParams.append('sortBy', pagination.sortBy);
      if (pagination.sortOrder) queryParams.append('sortOrder', pagination.sortOrder);
    }

    const response = await handleRequest<PaginatedResponse<PaymentHistory[]>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.HISTORY}?${queryParams.toString()}`,
      method: 'get',
      url: this.baseUrl,
    });

    return response;
  }

  async getPaymentDetails(paymentId: string): Promise<PaymentHistory> {
    const response = await handleRequest<ApiResponse<PaymentHistory>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.HISTORY}/${paymentId}`,
      method: 'get',
      url: this.baseUrl,
    });

    return response.data;
  }

  // Refunds
  async createRefund(
    paymentId: string,
    amount?: number,
    reason?: string
  ): Promise<{ id: string; status: string; amount: number }> {
    const response = await handleRequest<
      ApiResponse<{ id: string; status: string; amount: number }>
    >({
      body: { amount, reason },
      endpoint: `${API_ENDPOINTS.PAYMENTS.HISTORY}/${paymentId}/refund`,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  // Subscription Management (if needed)
  async getSubscriptions(): Promise<any[]> {
    const response = await handleRequest<ApiResponse<any[]>>({
      endpoint: API_ENDPOINTS.PAYMENTS.SUBSCRIPTIONS,
      method: 'get',
      url: this.baseUrl,
    });

    return response.data;
  }

  async createSubscription(data: any): Promise<any> {
    const response = await handleRequest<ApiResponse<any>>({
      body: data,
      endpoint: API_ENDPOINTS.PAYMENTS.SUBSCRIPTIONS,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const response = await handleRequest<ApiResponse<any>>({
      endpoint: `${API_ENDPOINTS.PAYMENTS.SUBSCRIPTIONS}/${subscriptionId}/cancel`,
      method: 'post',
      url: this.baseUrl,
    });

    return response.data;
  }

  // Utility methods
  formatAmount(amount: number, currency: string = 'MXN'): string {
    return new Intl.NumberFormat('es-MX', {
      currency,
      style: 'currency',
    }).format(amount / 100); // Stripe amounts are in cents
  }

  validateCardNumber(cardNumber: string): boolean {
    // Basic Luhn algorithm implementation
    const cleanNumber = cardNumber.replace(/\D/g, '');

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  getCardBrand(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\D/g, '');

    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6(?:011|5)/.test(cleanNumber)) return 'discover';
    if (/^(?:2131|1800|35\d{3})/.test(cleanNumber)) return 'jcb';

    return 'unknown';
  }

  formatCardNumber(cardNumber: string): string {
    const cleanNumber = cardNumber.replace(/\D/g, '');
    const brand = this.getCardBrand(cleanNumber);

    if (brand === 'amex') {
      return cleanNumber.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
    }

    return cleanNumber.replace(/(\d{4})/g, '$1 ').trim();
  }

  validateExpiryDate(month: number, year: number): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  }

  validateCVC(cvc: string, cardBrand?: string): boolean {
    const cleanCvc = cvc.replace(/\D/g, '');

    if (cardBrand === 'amex') {
      return cleanCvc.length === 4;
    }

    return cleanCvc.length === 3 || cleanCvc.length === 4;
  }

  // Test Helper Methods for Development
  getTestPaymentMethodId(): string {
    return STRIPE_TEST_DATA.TEST_PAYMENT_METHOD_ID;
  }

  getTestCardData(cardType: keyof typeof STRIPE_TEST_DATA.TEST_CARDS = 'VISA_SUCCESS') {
    return STRIPE_TEST_DATA.TEST_CARDS[cardType];
  }

  createTestPaymentMethod(): CreatePaymentMethodData {
    const testCard = this.getTestCardData();
    return {
      billingDetails: {
        address: {
          city: 'Ciudad de México',
          country: 'MX',
          line1: '123 Test Street',
          postalCode: '01000',
          state: 'CDMX',
        },
        email: 'test@reservapp.com',
        name: 'Test User',
      },
      card: {
        cvc: testCard.cvc,
        expiryMonth: testCard.expiryMonth,
        expiryYear: testCard.expiryYear,
        number: testCard.number,
      },
      type: 'card',
    };
  }

  async createTestPaymentIntent(
    reservationId: string,
    amount: number = 10000
  ): Promise<PaymentIntent> {
    const testData: CreatePaymentIntentData = {
      amount, // $100.00 MXN in cents
      currency: 'mxn',
      description: 'Test payment for ReservApp reservation',
      metadata: {
        environment: 'sandbox',
        test: 'true',
      },
      paymentMethodId: this.getTestPaymentMethodId(),
      reservationId,
    };

    return this.createPaymentIntent(testData);
  }
}

export default new StripeService();
