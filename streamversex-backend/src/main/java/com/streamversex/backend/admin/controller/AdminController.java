package com.streamversex.backend.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.admin.dto.response.AdminDashboardResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminPaymentResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminReviewResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminUserResponseDTO;
import com.streamversex.backend.admin.service.AdminService;
import com.streamversex.backend.payment.PaymentStatus;
import com.streamversex.backend.security.CustomUserDetails;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@Tag(
        name = "Administration",
        description = "Administrative APIs for dashboard, users, reviews, payments and premium subscriptions."
)
public class AdminController {

    private final AdminService adminService;
    

    // ================= DASHBOARD =================

    @Operation(
            summary = "Admin Dashboard",
            description = "Returns overall platform statistics including users, reviews, payments, revenue and watchlist information."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Dashboard retrieved successfully"),
            @ApiResponse(responseCode = "403", description = "Access denied")
    })
    @GetMapping("/dashboard")
    public ResponseEntity<AdminDashboardResponseDTO> getDashboard() {

        return ResponseEntity.ok(
                adminService.getDashboard()
        );
    }
    

    // ================= GET ALL USERS =================
    @Operation(
            summary = "Get All Users",
            description = "Returns all registered users ordered by newest first."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Users retrieved successfully")
    })
    @GetMapping("/users")
    public ResponseEntity<List<AdminUserResponseDTO>> getAllUsers() {

        return ResponseEntity.ok(
                adminService.getAllUsers()
        );
    }

    // ================= GET USER =================

    @Operation(
            summary = "Get User",
            description = "Returns complete details of a specific user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @GetMapping("/users/{userId}")
    public ResponseEntity<AdminUserResponseDTO> getUser(
            @PathVariable String userId) {

        return ResponseEntity.ok(
                adminService.getUserById(userId)
        );
    }

    // ================= SEARCH USERS =================

    @Operation(
            summary = "Search Users",
            description = "Search users by name or email."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/users/search")
    public ResponseEntity<List<AdminUserResponseDTO>> searchUsers(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchUsers(keyword)
        );
    }

    // ================= BLOCK USER =================

    @Operation(
            summary = "Block User",
            description = "Blocks a user account. Admin accounts cannot be blocked."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User blocked successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PatchMapping("/users/{userId}/block")
    public ResponseEntity<Void> blockUser(
            @AuthenticationPrincipal CustomUserDetails admin,
            @PathVariable String userId) {

        adminService.blockUser(
                admin.getId(),
                userId
        );

        return ResponseEntity.ok().build();
    }

    // ================= UNBLOCK USER =================

    @Operation(
            summary = "Unblock User",
            description = "Removes the blocked status from a user account."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User unblocked successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PatchMapping("/users/{userId}/unblock")
    public ResponseEntity<Void> unblockUser(
            @AuthenticationPrincipal CustomUserDetails admin,
            @PathVariable String userId) {

        adminService.unblockUser(
                admin.getId(),
                userId
        );

        return ResponseEntity.ok().build();
    }
    
    
 // ==================== GET ALL REVIEWS ====================

    @Operation(
            summary = "Get All Reviews",
            description = "Returns all reviews submitted by users across the platform."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reviews retrieved successfully")
    })
    @GetMapping("/reviews")
    public ResponseEntity<List<AdminReviewResponseDTO>>
            getAllReviews() {

        return ResponseEntity.ok(
                adminService.getAllReviews()
        );
    }
    
    
 // ==================== SEARCH REVIEWS ====================

    @Operation(
            summary = "Search Reviews",
            description = "Search reviews using review text."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/reviews/search")
    public ResponseEntity<List<AdminReviewResponseDTO>>
            searchReviews(
                    @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchReviews(keyword)
        );
    }
    
    
 // ==================== DELETE REVIEW ====================

    @Operation(
            summary = "Delete Review",
            description = "Deletes a review from the platform."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Review deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Review not found")
    })
    @DeleteMapping("/reviews/{reviewId}")
    public ResponseEntity<Void>
            deleteReview(
                    @PathVariable String reviewId) {

        adminService.deleteReview(reviewId);

        return ResponseEntity.ok().build();
    }

    
    
 // ==================== GET ALL PAYMENTS ====================

    @Operation(
            summary = "Get All Payments",
            description = "Returns all subscription payment records."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payments retrieved successfully")
    })
    @GetMapping("/payments")
    public ResponseEntity<List<AdminPaymentResponseDTO>>
            getAllPayments() {

        return ResponseEntity.ok(
                adminService.getAllPayments()
        );
    }
    
    
 // ==================== GET PAYMENT ====================

    @Operation(
            summary = "Get Payment",
            description = "Returns complete information for a specific payment."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Payment not found")
    })
    @GetMapping("/payments/{paymentId}")
    public ResponseEntity<AdminPaymentResponseDTO>
            getPayment(
                    @PathVariable String paymentId) {

        return ResponseEntity.ok(
                adminService.getPayment(paymentId)
        );
    }

    
    
 // ==================== SEARCH PAYMENTS ====================

    @Operation(
            summary = "Search Payments",
            description = "Search payments using order ID, payment ID or user information."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/payments/search")
    public ResponseEntity<List<AdminPaymentResponseDTO>>
            searchPayments(
                    @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchPayments(keyword)
        );
    }
    
 // ==================== FILTER PAYMENTS ====================

    @Operation(
            summary = "Filter Payments by Status",
            description = "Returns payments filtered by payment status."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payments filtered successfully")
    })
    @GetMapping("/payments/status")
    public ResponseEntity<List<AdminPaymentResponseDTO>>
            getPaymentsByStatus(
                    @RequestParam PaymentStatus status) {

        return ResponseEntity.ok(
                adminService.getPaymentsByStatus(status)
        );
    }
    
    
 // ==================== PREMIUM USERS ====================

    @Operation(
            summary = "Get Premium Users",
            description = "Returns all users with an active premium subscription."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Premium users retrieved successfully")
    })
    @GetMapping("/premium-users")
    public ResponseEntity<List<AdminUserResponseDTO>>
            getPremiumUsers() {

        return ResponseEntity.ok(
                adminService.getPremiumUsers()
        );
    }


    @Operation(
            summary = "Search Premium Users",
            description = "Search premium users by name or email."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/premium-users/search")
    public ResponseEntity<List<AdminUserResponseDTO>>
            searchPremiumUsers(
                    @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchPremiumUsers(keyword)
        );
    }


    @Operation(
            summary = "Get Expiring Premium Users",
            description = "Returns premium users whose subscriptions are approaching their expiry date."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Expiring premium users retrieved successfully")
    })
    @GetMapping("/premium-users/expiring")
    public ResponseEntity<List<AdminUserResponseDTO>>
            getExpiringPremiumUsers() {

        return ResponseEntity.ok(
                adminService.getExpiringPremiumUsers()
        );
    }


    @Operation(
            summary = "Expire Premium Subscription",
            description = "Expires a user's premium subscription immediately."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Premium subscription expired successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PatchMapping("/premium-users/{userId}/expire")
    public ResponseEntity<Void>
            expirePremiumUser(
                    @PathVariable String userId) {

        adminService.expirePremiumUser(userId);

        return ResponseEntity.ok().build();
    }
}