package com.streamversex.backend.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.InvoiceResponseDTO;
import com.streamversex.backend.model.Invoice;

@Component
public class InvoiceMapper {

    public InvoiceResponseDTO toResponseDTO(
            Invoice invoice) {

        return InvoiceResponseDTO.builder()
                .id(invoice.getId())
                .invoiceNumber(invoice.getInvoiceNumber())

                .customerName(invoice.getCustomerName())
                .customerEmail(invoice.getCustomerEmail())

                .plan(invoice.getPlan())
                .amount(invoice.getAmount())
                .currency(invoice.getCurrency())
                .paidAt(invoice.getPaidAt())
                .createdAt(invoice.getCreatedAt())
                .build();
    }
}