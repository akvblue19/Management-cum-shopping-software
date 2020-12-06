package com.application.shopapp.controllers;

import com.application.shopapp.dtos.CustomerSaveDto;
import com.application.shopapp.dtos.SellerSaveDto;
import com.application.shopapp.dtos.UserSaveDto;
import com.application.shopapp.entities.Product;
import com.application.shopapp.entities.ProductVariation;
import com.application.shopapp.entities.Role;
import com.application.shopapp.entities.User;
import com.application.shopapp.repository.ProductRepository;
import com.application.shopapp.repository.ProductVariationRepository;
import com.application.shopapp.repository.RoleRepository;
import com.application.shopapp.repository.UserRepository;
import com.application.shopapp.serviceImplementation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/e-commerce/register")
public class RegisterController {
    @Autowired
    CustomerServiceImpl customerService;

    @Autowired
    UserActivationService userActivationService;

//    ----------------------------------------------------------------------------------------------->>>
//    apis for registering account

    @PostMapping(value = "/register-customer")
    public String addCustomer(@Valid @RequestBody CustomerSaveDto customer, HttpServletResponse response) {
        String message = customerService.addCustomer(customer);
        if (message.equals("registered")) {
            response.setStatus(HttpServletResponse.SC_CREATED);
            return message;
        } else {
            response.setStatus(HttpServletResponse.SC_OK);
            return message;
        }
    }

    @Autowired
    SellerServiceImpl sellerService;

    @PostMapping(value = "/register-seller")
    public String addSeller(@Valid @RequestBody SellerSaveDto seller, HttpServletResponse response) {
        String message = sellerService.addSeller(seller);
        if (message.equals("Registered")) {
            response.setStatus(HttpServletResponse.SC_CREATED);
            return message;
        } else {
            response.setStatus(HttpServletResponse.SC_OK);
            return message;
        }
    }


    @Autowired
    AdminServiceImpl adminService;


    @PostMapping(value = "/register-admin")
    public String addAdmin(@Valid @RequestBody UserSaveDto userDto, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_CREATED);
        return adminService.saveAdmin(userDto);
    }

    @GetMapping(path = "/confirm-account")
    public String confirmCustomerAccount(@RequestParam("token") String token) {
        String message = userActivationService.activateUser(token);
        return message;
    }

    @PostMapping(path = "/resend-link")
    public String resendLinkToCustomer(@RequestParam("email") String email) {
        String message = userActivationService.resendLink(email);
        return message;
    }

//    ------------add
    @Autowired
    ProductServiceImpl productService;


    @GetMapping(value = "home/product/{id}")
    public List<ProductVariation> viewProduct(@PathVariable("id")Long productId) {
        return productService.viewCustomerProduct(productId);
    }

    @Autowired
    ProductVariationRepository productVariationRepository;

    @GetMapping(value = "home/variations")
    public Iterable<ProductVariation> viewAll() {
        return productVariationRepository.findAllVariation();
    }
//

    @Autowired
    UserRepository userRepository;

    @GetMapping(path = "/getRole")
    public User roleFinder(@RequestParam("email")String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }
}
