package com.streamversex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.Payment;
import com.streamversex.backend.payment.PaymentStatus;

@Repository
public interface PaymentRepository
        extends MongoRepository<Payment, String> {

    Optional<Payment> findByRazorpayOrderId(
            String razorpayOrderId
    );

    List<Payment> findByUserIdOrderByCreatedAtDesc(
            String userId
    );
    
    
    // ==================== ADMIN ====================

    long countByStatus(PaymentStatus status);

    List<Payment> findByStatus(PaymentStatus status);

    List<Payment> findAllByOrderByCreatedAtDesc();
    
    List<Payment> findByStatusOrderByCreatedAtDesc(
            PaymentStatus status
    );
    
    
    List<Payment> findByRazorpayOrderIdContainingIgnoreCaseOrRazorpayPaymentIdContainingIgnoreCaseOrderByCreatedAtDesc(
            String orderId,
            String paymentId
    );
    

  
}