package com.streamversex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.Invoice;

@Repository
public interface InvoiceRepository
        extends MongoRepository<Invoice, String> {

    Optional<Invoice> findByInvoiceNumber(
            String invoiceNumber
    );

    Optional<Invoice> findByPaymentId(
            String paymentId
    );

    List<Invoice> findByUserIdOrderByCreatedAtDesc(
            String userId
    );

    // Fetch invoice only if it belongs to logged-in user
    Optional<Invoice> findByIdAndUserId(
            String id,
            String userId
    );
}