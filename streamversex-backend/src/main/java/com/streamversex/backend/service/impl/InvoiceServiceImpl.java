package com.streamversex.backend.service.impl;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

import org.openpdf.text.Document;
import org.openpdf.text.Element;
import org.openpdf.text.Font;
import org.openpdf.text.FontFactory;
import org.openpdf.text.Paragraph;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.response.InvoiceResponseDTO;
import com.streamversex.backend.mapper.InvoiceMapper;
import com.streamversex.backend.model.Invoice;
import com.streamversex.backend.model.Payment;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.InvoiceRepository;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.InvoiceService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;
    private final InvoiceMapper invoiceMapper;
    private final UserRepository userRepository;


    // ==================== CREATE INVOICE ====================

    @Override
    public Invoice createInvoice(Payment payment) {

        /*
         * Idempotency:
         * One payment must have only one invoice.
         */
        return invoiceRepository
                .findByPaymentId(payment.getId())
                .orElseGet(() -> {

                    User user = userRepository
                            .findById(payment.getUserId())
                            .orElseThrow(() ->
                                    new RuntimeException(
                                            "User not found for payment."
                                    )
                            );

                    String invoiceNumber =
                            generateInvoiceNumber();

                    Invoice invoice = Invoice.builder()
                            .invoiceNumber(invoiceNumber)

                            // Customer snapshot
                            .userId(user.getId())
                            .customerName(user.getName())
                            .customerEmail(user.getEmail())

                            // Payment snapshot
                            .paymentId(payment.getId())
                            .plan(payment.getPlan())
                            .amount(payment.getAmount())
                            .currency(payment.getCurrency())
                            .paidAt(payment.getPaidAt())

                            .build();

                    return invoiceRepository.save(invoice);
                });
    }


    // ==================== GET MY INVOICES ====================

    @Override
    public List<InvoiceResponseDTO> getMyInvoices(
            String userId) {

        return invoiceRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(invoiceMapper::toResponseDTO)
                .toList();
    }


    // ==================== GET ONE INVOICE ====================

    @Override
    public InvoiceResponseDTO getInvoice(
            String userId,
            String invoiceId) {

        Invoice invoice = findUserInvoice(
                userId,
                invoiceId
        );

        return invoiceMapper.toResponseDTO(invoice);
    }


    // ==================== GENERATE PDF ====================

    @Override
    public byte[] generateInvoicePdf(
            String userId,
            String invoiceId) {

        /*
         * Important:
         * Never use findById(invoiceId) alone here.
         *
         * We must ensure the invoice belongs
         * to the currently logged-in user.
         */
        Invoice invoice = findUserInvoice(
                userId,
                invoiceId
        );

        try (ByteArrayOutputStream outputStream =
                     new ByteArrayOutputStream()) {

            Document document = new Document();

            PdfWriter.getInstance(
                    document,
                    outputStream
            );

            document.open();


            // ==================== FONTS ====================

            Font brandFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    22
            );

            Font titleFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    18
            );

            Font headingFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    12
            );

            Font normalFont = FontFactory.getFont(
                    FontFactory.HELVETICA,
                    11
            );

            Font boldFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    11
            );


            // ==================== BRAND ====================

            Paragraph brand = new Paragraph(
                    "StreamVerseX",
                    brandFont
            );

            brand.setAlignment(Element.ALIGN_CENTER);

            document.add(brand);


            // ==================== TITLE ====================

            Paragraph title = new Paragraph(
                    "INVOICE",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingBefore(5);
            title.setSpacingAfter(25);

            document.add(title);


            // ==================== INVOICE DETAILS ====================

            PdfPTable detailsTable =
                    new PdfPTable(2);

            detailsTable.setWidthPercentage(100);
            detailsTable.setSpacingAfter(20);

            addDetailRow(
                    detailsTable,
                    "Invoice Number",
                    invoice.getInvoiceNumber(),
                    boldFont,
                    normalFont
            );

            addDetailRow(
                    detailsTable,
                    "Invoice Date",
                    formatDate(invoice.getCreatedAt()),
                    boldFont,
                    normalFont
            );

            addDetailRow(
                    detailsTable,
                    "Payment Date",
                    formatDate(invoice.getPaidAt()),
                    boldFont,
                    normalFont
            );

            document.add(detailsTable);


            // ==================== CUSTOMER ====================

            Paragraph billedTo = new Paragraph(
                    "BILLED TO",
                    headingFont
            );

            billedTo.setSpacingAfter(8);

            document.add(billedTo);

            document.add(
                    new Paragraph(
                            valueOrFallback(
                                    invoice.getCustomerName(),
                                    "Customer"
                            ),
                            normalFont
                    )
            );

            document.add(
                    new Paragraph(
                            valueOrFallback(
                                    invoice.getCustomerEmail(),
                                    "-"
                            ),
                            normalFont
                    )
            );


            // ==================== SPACING ====================

            Paragraph spacer = new Paragraph(" ");
            spacer.setSpacingAfter(10);

            document.add(spacer);


            // ==================== ITEMS TABLE ====================

            PdfPTable itemTable =
                    new PdfPTable(2);

            itemTable.setWidthPercentage(100);
            itemTable.setWidths(
                    new float[] { 3f, 1f }
            );

            itemTable.setSpacingBefore(10);
            itemTable.setSpacingAfter(20);


            // Header
            PdfPCell descriptionHeader =
                    new PdfPCell(
                            new Paragraph(
                                    "Description",
                                    boldFont
                            )
                    );

            descriptionHeader.setPadding(8);

            itemTable.addCell(descriptionHeader);


            PdfPCell amountHeader =
                    new PdfPCell(
                            new Paragraph(
                                    "Amount",
                                    boldFont
                            )
                    );

            amountHeader.setPadding(8);
            amountHeader.setHorizontalAlignment(
                    Element.ALIGN_RIGHT
            );

            itemTable.addCell(amountHeader);


            // Description
            String planDescription =
                    formatPlan(invoice);


            PdfPCell descriptionCell =
                    new PdfPCell(
                            new Paragraph(
                                    planDescription,
                                    normalFont
                            )
                    );

            descriptionCell.setPadding(8);

            itemTable.addCell(descriptionCell);


            // Amount
            String formattedAmount =
                    formatAmount(invoice.getAmount());


            PdfPCell amountCell =
                    new PdfPCell(
                            new Paragraph(
                                    invoice.getCurrency()
                                            + " "
                                            + formattedAmount,
                                    normalFont
                            )
                    );

            amountCell.setPadding(8);
            amountCell.setHorizontalAlignment(
                    Element.ALIGN_RIGHT
            );

            itemTable.addCell(amountCell);

            document.add(itemTable);


            // ==================== TOTAL ====================

            PdfPTable totalTable =
                    new PdfPTable(2);

            totalTable.setWidthPercentage(100);
            totalTable.setWidths(
                    new float[] { 3f, 1f }
            );

            PdfPCell totalLabel =
                    new PdfPCell(
                            new Paragraph(
                                    "Total",
                                    boldFont
                            )
                    );

            totalLabel.setPadding(8);
            totalLabel.setBorder(
                    PdfPCell.NO_BORDER
            );

            totalTable.addCell(totalLabel);


            PdfPCell totalAmount =
                    new PdfPCell(
                            new Paragraph(
                                    invoice.getCurrency()
                                            + " "
                                            + formattedAmount,
                                    boldFont
                            )
                    );

            totalAmount.setPadding(8);
            totalAmount.setBorder(
                    PdfPCell.NO_BORDER
            );

            totalAmount.setHorizontalAlignment(
                    Element.ALIGN_RIGHT
            );

            totalTable.addCell(totalAmount);

            document.add(totalTable);


            // ==================== PAYMENT STATUS ====================

            Paragraph paymentStatus =
                    new Paragraph(
                            "Payment Status: PAID",
                            boldFont
                    );

            paymentStatus.setSpacingBefore(20);

            document.add(paymentStatus);


            // ==================== FOOTER ====================

            Paragraph footer =
                    new Paragraph(
                            "Thank you for choosing StreamVerseX.",
                            normalFont
                    );

            footer.setAlignment(
                    Element.ALIGN_CENTER
            );

            footer.setSpacingBefore(40);

            document.add(footer);


            // ==================== FINISH ====================

            document.close();

            return outputStream.toByteArray();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate invoice PDF.",
                    e
            );
        }
    }


    // ==================== FIND USER INVOICE ====================

    private Invoice findUserInvoice(
            String userId,
            String invoiceId) {

        return invoiceRepository
                .findByIdAndUserId(
                        invoiceId,
                        userId
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Invoice not found."
                        )
                );
    }


    // ==================== PDF DETAIL ROW ====================

    private void addDetailRow(
            PdfPTable table,
            String label,
            String value,
            Font labelFont,
            Font valueFont) {

        PdfPCell labelCell =
                new PdfPCell(
                        new Paragraph(
                                label,
                                labelFont
                        )
                );

        labelCell.setBorder(
                PdfPCell.NO_BORDER
        );

        labelCell.setPadding(4);

        table.addCell(labelCell);


        PdfPCell valueCell =
                new PdfPCell(
                        new Paragraph(
                                valueOrFallback(
                                        value,
                                        "-"
                                ),
                                valueFont
                        )
                );

        valueCell.setBorder(
                PdfPCell.NO_BORDER
        );

        valueCell.setPadding(4);

        valueCell.setHorizontalAlignment(
                Element.ALIGN_RIGHT
        );

        table.addCell(valueCell);
    }


    // ==================== FORMAT AMOUNT ====================

    private String formatAmount(Long amount) {

        if (amount == null) {
            return "0.00";
        }

        /*
         * DB:
         * 19900 paise
         *
         * PDF:
         * 199.00
         */
        BigDecimal amountInRupees =
                BigDecimal.valueOf(amount)
                        .divide(
                                BigDecimal.valueOf(100),
                                2,
                                RoundingMode.HALF_UP
                        );

        return amountInRupees.toPlainString();
    }


    // ==================== FORMAT PLAN ====================

    private String formatPlan(Invoice invoice) {

        if (invoice.getPlan() == null) {
            return "StreamVerseX Premium Plan";
        }

        return switch (invoice.getPlan()) {

            case MONTHLY ->
                    "StreamVerseX Monthly Premium Plan";

            case YEARLY ->
                    "StreamVerseX Yearly Premium Plan";
        };
    }


    // ==================== FORMAT DATE ====================

    private String formatDate(
            java.time.Instant instant) {

        if (instant == null) {
            return "-";
        }

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern(
                        "dd MMMM yyyy"
                )
                .withZone(ZoneOffset.UTC);

        return formatter.format(instant);
    }


    // ==================== NULL FALLBACK ====================

    private String valueOrFallback(
            String value,
            String fallback) {

        if (value == null ||
                value.isBlank()) {

            return fallback;
        }

        return value;
    }


    // ==================== INVOICE NUMBER ====================

    private String generateInvoiceNumber() {

        String date = LocalDate
                .now(ZoneOffset.UTC)
                .format(
                        DateTimeFormatter.BASIC_ISO_DATE
                );

        String randomPart =
                UUID.randomUUID()
                        .toString()
                        .replace("-", "")
                        .substring(0, 8)
                        .toUpperCase();

        return "SVX-"
                + date
                + "-"
                + randomPart;
    }
}