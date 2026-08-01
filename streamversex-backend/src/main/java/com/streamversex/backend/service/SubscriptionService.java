package com.streamversex.backend.service;

import com.streamversex.backend.dto.response.SubscriptionResponseDTO;

public interface SubscriptionService {

    void expireSubscriptions();
    
    SubscriptionResponseDTO getSubscription(
            String userId
    );
}