package com.application.shopapp.scheduler;

import com.application.shopapp.entities.Seller;
import com.application.shopapp.repository.SellerRepository;
import com.application.shopapp.serviceImplementation.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.Iterator;

@EnableAsync
public class Scheduling {

    @Autowired
    EmailService emailService;

    @Autowired
    SellerRepository sellerRepository;

    @Async
    @Scheduled(cron = "0 0 12 * * ?")
    public void scheduleFixedRateTaskAsync() throws InterruptedException {
        Iterable<Seller> sellers = sellerRepository.findAll();
        Iterator<Seller> sellerIterator = sellers.iterator();
        while (sellerIterator.hasNext()) {
            Seller seller = sellerIterator.next();
            emailService.sendEmail("ALL Orders Rejected or Cancelled", "Following orders are cancelled",
                    seller.getEmail());
        }
    }
}
