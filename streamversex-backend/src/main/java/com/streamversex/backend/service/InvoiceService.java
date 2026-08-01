package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.response.InvoiceResponseDTO;
import com.streamversex.backend.model.Invoice;
import com.streamversex.backend.model.Payment;

public interface InvoiceService {

    // ==================== CREATE INVOICE ====================

    // Create invoice after successful payment
    Invoice createInvoice(
            Payment payment
    );


    // ==================== GET MY INVOICES ====================

    // Get all invoices belonging to logged-in user
    List<InvoiceResponseDTO> getMyInvoices(
            String userId
    );


    // ==================== GET ONE INVOICE ====================

    // Get one invoice belonging to logged-in user
    InvoiceResponseDTO getInvoice(
            String userId,
            String invoiceId
    );


    // ==================== GENERATE PDF ====================

    // Generate PDF for an invoice belonging to logged-in user
    byte[] generateInvoicePdf(
            String userId,
            String invoiceId
    );
}