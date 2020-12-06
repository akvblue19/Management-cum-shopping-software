package com.application.shopapp.service;

import com.application.shopapp.dtos.*;
import com.application.shopapp.entities.Seller;

public interface SellerService {

    String addSeller(SellerSaveDto seller);

    String activateSeller(Long id);

    String deactivateSeller(Long id);

//    Seller sellerDetail(String email);

    String updateSellerDetail(String username, SellerProfileDto sellerProfileDto);

    String resetUserPassword(String password, String confirmPassword, String username);

    String updateAddress(Long id, UpdateAddressDto addressDto);

    SellerGetDto sellerGetDetail(String email);
}
