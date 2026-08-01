package com.streamversex.backend.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.streamversex.backend.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class SubscriptionScheduler {

    private final SubscriptionService subscriptionService;

    @Scheduled(cron = "0 0 * * * *")
    public void expireSubscriptions() {
        subscriptionService.expireSubscriptions();
    }
}