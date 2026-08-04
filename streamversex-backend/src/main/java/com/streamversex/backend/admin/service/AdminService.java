package com.streamversex.backend.admin.service;

import java.util.List;

import com.streamversex.backend.admin.dto.response.AdminDashboardResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminPaymentResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminReviewResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminUserResponseDTO;
import com.streamversex.backend.payment.PaymentStatus;

public interface AdminService {

    // ================= Dashboard =================

    AdminDashboardResponseDTO getDashboard();

    // ================= Users =================

    List<AdminUserResponseDTO> getAllUsers();

    AdminUserResponseDTO getUserById(String userId);

    List<AdminUserResponseDTO> searchUsers(String keyword);

    void blockUser(
            String adminId,
            String userId
    );

    void unblockUser(
            String adminId,
            String userId
    );
    
 // ==================== REVIEWS ====================

    List<AdminReviewResponseDTO> getAllReviews();

    List<AdminReviewResponseDTO> searchReviews(
            String keyword
    );

    void deleteReview(
            String reviewId
    );
    
    
    List<AdminPaymentResponseDTO> getAllPayments();

    AdminPaymentResponseDTO getPayment(
            String paymentId
    );

    List<AdminPaymentResponseDTO> searchPayments(
            String keyword
    );

    List<AdminPaymentResponseDTO> getPaymentsByStatus(
            PaymentStatus status
    );
    
    
    List<AdminUserResponseDTO> getPremiumUsers();

    List<AdminUserResponseDTO> searchPremiumUsers(
            String keyword
    );

    List<AdminUserResponseDTO> getExpiringPremiumUsers();

    void expirePremiumUser(
            String userId
    );

}