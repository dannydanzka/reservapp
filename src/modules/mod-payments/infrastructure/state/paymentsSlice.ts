import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { PaginationParams } from '@shared/types';

import {
  Payment,
  PaymentsResponse,
  paymentsService,
  PaymentsSummary,
} from '../services/paymentsService';
import {
  Receipt,
  ReceiptsResponse,
  receiptsService,
  ReceiptsSummary,
} from '../services/receiptsService';

export interface PaymentsState {
  // Payments
  payments: Payment[];
  paymentsSummary: PaymentsSummary | null;
  paymentsLoading: boolean;
  paymentsError: string | null;
  paymentsPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };

  // Receipts
  receipts: Receipt[];
  receiptsSummary: ReceiptsSummary | null;
  receiptsLoading: boolean;
  receiptsError: string | null;
  receiptsPagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };

  // UI State
  activeTab: 'payments' | 'receipts';
}

// Async Thunks for Payments
export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async (params: { pagination?: PaginationParams } = {}, { rejectWithValue }) => {
    try {
      const response = await paymentsService.getPayments(params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar pagos';
      return rejectWithValue(message);
    }
  }
);

// Async Thunks for Receipts
export const fetchReceipts = createAsyncThunk(
  'payments/fetchReceipts',
  async (params: { pagination?: PaginationParams } = {}, { rejectWithValue }) => {
    try {
      const response = await receiptsService.getReceipts(params.pagination);
      return response;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al cargar facturas';
      return rejectWithValue(message);
    }
  }
);

// Initial State
const initialState: PaymentsState = {
  // Payments
  payments: [],
  // UI State
activeTab: 'payments',
  
paymentsError: null,

paymentsLoading: false,

  paymentsPagination: {
    hasMore: false,
    limit: 20,
    page: 1,
    total: 0,
    totalPages: 0,
  },
  paymentsSummary: null,

  // Receipts
  receipts: [],

  receiptsError: null,

  receiptsLoading: false,

  receiptsPagination: {
    hasMore: false,
    limit: 20,
    page: 1,
    total: 0,
    totalPages: 0,
  },

  receiptsSummary: null,
};

// Slice
const paymentsSlice = createSlice({
  extraReducers: (builder) => {
    builder
      // Fetch Payments
      .addCase(fetchPayments.pending, (state) => {
        state.paymentsLoading = true;
        state.paymentsError = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.paymentsLoading = false;
        state.payments = action.payload.payments || [];
        state.paymentsSummary = action.payload.summary;
        state.paymentsPagination = {
          hasMore: action.payload.pagination.hasNext,
          limit: action.payload.pagination.limit,
          page: action.payload.pagination.page,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.paymentsLoading = false;
        state.paymentsError = action.payload as string;
      })

      // Fetch Receipts
      .addCase(fetchReceipts.pending, (state) => {
        state.receiptsLoading = true;
        state.receiptsError = null;
      })
      .addCase(fetchReceipts.fulfilled, (state, action) => {
        state.receiptsLoading = false;
        state.receipts = action.payload.receipts || [];
        state.receiptsSummary = action.payload.summary;
        state.receiptsPagination = {
          hasMore: action.payload.pagination.hasNext,
          limit: action.payload.pagination.limit,
          page: action.payload.pagination.page,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(fetchReceipts.rejected, (state, action) => {
        state.receiptsLoading = false;
        state.receiptsError = action.payload as string;
      });
  },
  initialState,
  name: 'payments',
  reducers: {
    clearPaymentsError: (state) => {
      state.paymentsError = null;
    },
    clearReceiptsError: (state) => {
      state.receiptsError = null;
    },
    resetPayments: (state) => {
      state.payments = [];
      state.paymentsPagination = initialState.paymentsPagination;
    },
    resetReceipts: (state) => {
      state.receipts = [];
      state.receiptsPagination = initialState.receiptsPagination;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

// Actions
export const {
  clearPaymentsError,
  clearReceiptsError,
  resetPayments,
  resetReceipts,
  setActiveTab,
} = paymentsSlice.actions;

// Selectors
export const selectPayments = (state: { payments: PaymentsState }) => state.payments.payments;
export const selectPaymentsSummary = (state: { payments: PaymentsState }) =>
  state.payments.paymentsSummary;
export const selectPaymentsLoading = (state: { payments: PaymentsState }) =>
  state.payments.paymentsLoading;
export const selectPaymentsError = (state: { payments: PaymentsState }) =>
  state.payments.paymentsError;
export const selectPaymentsPagination = (state: { payments: PaymentsState }) =>
  state.payments.paymentsPagination;

export const selectReceipts = (state: { payments: PaymentsState }) => state.payments.receipts;
export const selectReceiptsSummary = (state: { payments: PaymentsState }) =>
  state.payments.receiptsSummary;
export const selectReceiptsLoading = (state: { payments: PaymentsState }) =>
  state.payments.receiptsLoading;
export const selectReceiptsError = (state: { payments: PaymentsState }) =>
  state.payments.receiptsError;
export const selectReceiptsPagination = (state: { payments: PaymentsState }) =>
  state.payments.receiptsPagination;

export const selectActiveTab = (state: { payments: PaymentsState }) => state.payments.activeTab;

export { paymentsSlice };
export const paymentsReducer = paymentsSlice.reducer;
