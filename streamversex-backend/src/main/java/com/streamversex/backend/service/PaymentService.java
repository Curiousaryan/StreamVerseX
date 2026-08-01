package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.request.CreatePaymentOrderRequestDTO;
import com.streamversex.backend.dto.request.PaymentFailedRequestDTO;
import com.streamversex.backend.dto.request.VerifyPaymentRequestDTO;
import com.streamversex.backend.dto.response.PaymentHistoryResponseDTO;
import com.streamversex.backend.dto.response.PaymentOrderResponseDTO;

public interface PaymentService {

    PaymentOrderResponseDTO createOrder(
            String userId,
            CreatePaymentOrderRequestDTO request
    );

    void verifyPayment(
            String userId,
            VerifyPaymentRequestDTO request
    );
    
    List<PaymentHistoryResponseDTO> getPaymentHistory(
            String userId
    );
    
    void paymentFailed(
            String userId,
            PaymentFailedRequestDTO request
    );
}