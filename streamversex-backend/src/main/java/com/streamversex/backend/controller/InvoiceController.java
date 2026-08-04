package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.response.InvoiceResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.InvoiceService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
@Tag(
        name = "Invoices",
        description = "View and download payment invoices."
)
public class InvoiceController {

    private final InvoiceService invoiceService;

    // ==================== MY INVOICES ====================

    @Operation(
            summary = "Get My Invoices",
            description = "Returns all invoices belonging to the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Invoices retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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

    @Operation(
            summary = "Get Invoice",
            description = "Returns details of a specific invoice belonging to the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Invoice retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Invoice not found")
    })
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

    @Operation(
            summary = "Download Invoice PDF",
            description = "Downloads the selected invoice as a PDF document."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Invoice PDF downloaded successfully",
                    content = @Content(mediaType = "application/pdf")
            ),
            @ApiResponse(responseCode = "404", description = "Invoice not found")
    })
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