# Razorpay Payment Integration - Implementation Summary

## ✅ What Has Been Implemented

### 1. **Razorpay Script Integration**
   - Added Razorpay checkout script to `index.html`
   - Script URL: `https://checkout.razorpay.com/v1/checkout.js`

### 2. **TypeScript Types Created**
   - `src/types/razorpay.d.ts` - Razorpay window declarations
   - `src/types/payment-api.ts` - API request/response types for all 3 payment steps

### 3. **3-Step Payment Flow Implementation**

#### **Step 1: Create Razorpay Order** (`/payments/orders`)
   - Creates order with backend API
   - Gets `razorpayOrderId` from response
   - Base URL: `https://omg-order-and-payment-service-993414851442.asia-south1.run.app`

#### **Step 2: Initialize Razorpay Checkout**
   - Opens Razorpay payment modal
   - Handles payment success callback
   - Handles payment failure/cancellation

#### **Step 3: Verify Payment** (`/payments/verify`)
   - Verifies payment with Razorpay signature
   - Sends payment details to backend

#### **Step 4: Create Final Order** (`/orders`)
   - Creates final order record after successful payment verification
   - Marks payment as completed

### 4. **Updated Components**
   - `RudrakshaPaymentStep.tsx` - Full payment flow implementation
   - `RudrakshaBooking.tsx` - Updated to pass required data and handle payment callbacks

## ⚠️ Configuration Required

### 1. **Razorpay Key** (CRITICAL)
   The Razorpay publishable key needs to be configured. Two options:

   **Option A: Environment Variable (Recommended)**
   - Create a `.env` file in the project root
   - Add: `VITE_RAZORPAY_KEY=rzp_test_xxxxxxxxxxxxx` (or `rzp_live_xxxxxxxxxxxxx` for production)
   - The key should start with `rzp_`

   **Option B: Backend Response**
   - If your backend returns `razorpayKey` in the order creation response, it will be used automatically
   - Update `CreateOrderResponse` type if the field name is different

### 2. **Temple ID** (Required)
   Currently using placeholder UUID: `00000000-0000-0000-0000-000000000000`
   
   **Options:**
   - Get from booking API response (if returned)
   - Add to environment variable: `VITE_TEMPLE_ID`
   - Hardcode if it's a constant value

### 3. **Address ID** (Required)
   Currently using placeholder UUID: `00000000-0000-0000-0000-000000000000`
   
   **Options:**
   - Should be returned from `/launch-event/rudraksha-booking` API response
   - Code is already set up to extract it from `bookingResponse.addressId`
   - If not returned, backend team needs to include it in the booking response

### 4. **Customer Email** (Optional but Recommended)
   Currently generating email from phone number: `${phoneNumber}@rudraksha.omg`
   
   **Recommendation:**
   - Add email field to booking form for better UX
   - Or get from user profile if available

## 📋 API Endpoints Used

1. **Create Order**: `POST /payments/orders`
   - Base URL: `https://omg-order-and-payment-service-993414851442.asia-south1.run.app`
   - Returns: `razorpayOrderId`

2. **Verify Payment**: `POST /payments/verify`
   - Base URL: `https://omg-order-and-payment-service-993414851442.asia-south1.run.app`
   - Verifies Razorpay payment signature

3. **Create Final Order**: `POST /orders`
   - Base URL: `https://omg-order-and-payment-service-993414851442.asia-south1.run.app`
   - Creates final order record

## 🔍 Questions for Backend Team

1. **Razorpay Key**: 
   - Should the Razorpay publishable key be provided via environment variable or returned in the order creation response?

2. **Temple ID**: 
   - What is the actual temple ID for this event?
   - Should it be returned from the booking API or is it a constant?

3. **Address ID**: 
   - Does `/launch-event/rudraksha-booking` return an `addressId` in the response?
   - If yes, what is the field name in the response?

4. **Booking Response Structure**: 
   - What is the exact structure of the response from `/launch-event/rudraksha-booking`?
   - Does it include `addressId`, `templeId`, or any other IDs we need?

5. **Email Field**: 
   - Should we add an email field to the booking form, or is there another way to get customer email?

## 🧪 Testing Checklist

- [ ] Test payment flow with test Razorpay key
- [ ] Verify order creation API works
- [ ] Test payment success flow
- [ ] Test payment failure handling
- [ ] Test payment cancellation
- [ ] Verify all 3 API calls complete successfully
- [ ] Test with different quantities
- [ ] Test with/without event participation

## 📝 Notes

- All required fields in the API payloads are included (even if some seem unnecessary for this use case)
- Error handling is implemented for all API calls
- Loading states are shown during payment processing
- Payment modal can be cancelled by user
- Success step is shown after successful payment

