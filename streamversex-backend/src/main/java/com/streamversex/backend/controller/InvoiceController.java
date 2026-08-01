package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.InvoiceResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.InvoiceService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;


    // ==================== MY INVOICES ====================

    @GetMapping
    public ResponseEntity<List<InvoiceResponseDTO>>
            getMyInvoices(
                    @AuthenticationPrincipal
                    CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                invoiceService.getMyInvoices(
                        userDetails.getId()
                )
        );
    }


    // ==================== GET ONE INVOICE ====================

    @GetMapping("/{invoiceId}")
    public ResponseEntity<InvoiceResponseDTO>
            getInvoice(
                    @AuthenticationPrincipal
                    CustomUserDetails userDetails,

                    @PathVariable
                    String invoiceId) {

        return ResponseEntity.ok(
                invoiceService.getInvoice(
                        userDetails.getId(),
                        invoiceId
                )
        );
    }


    // ==================== DOWNLOAD PDF ====================

    @GetMapping(
            value = "/{invoiceId}/pdf",
            produces = MediaType.APPLICATION_PDF_VALUE
    )
    public ResponseEntity<byte[]>
            downloadInvoicePdf(
                    @AuthenticationPrincipal
                    CustomUserDetails userDetails,

                    @PathVariable
                    String invoiceId) {

        byte[] pdf =
                invoiceService.generateInvoicePdf(
                        userDetails.getId(),
                        invoiceId
                );

        String filename =
                "StreamVerseX-Invoice-"
                + invoiceId
                + ".pdf";

        HttpHeaders headers =
                new HttpHeaders();

        headers.setContentType(
                MediaType.APPLICATION_PDF
        );

        headers.setContentDisposition(
                ContentDisposition
                        .attachment()
                        .filename(filename)
                        .build()
        );

        headers.setContentLength(
                pdf.length
        );

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdf);
    }
}