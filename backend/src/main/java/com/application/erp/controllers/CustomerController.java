package com.application.shopapp.controllers;

import com.application.shopapp.dtos.UpdateAddressDto;
import com.application.shopapp.validation.PasswordValidation;
import com.application.shopapp.dtos.AddressDto;
import com.application.shopapp.dtos.CustomerProfileDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.repository.AddressRepository;
import com.application.shopapp.serviceImplementation.CategoryServiceImpl;
import com.application.shopapp.serviceImplementation.CustomerServiceImpl;
//import com.application.shopapp.services.ProductService;
import com.application.shopapp.serviceImplementation.ProductServiceImpl;
import com.application.shopapp.serviceImplementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/e-commerce/customer")
public class CustomerController
{
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    UserServiceImpl userService;

    @Autowired
    CustomerServiceImpl customerService;

    @Autowired
    PasswordValidation passwordValidation;

//------------------------------------------------------------------------------------------------------->>
//    customer profile

    @GetMapping(value = "/home/user-profile")
    public Customer customerProfile() {
        String username = userService.getUserName();
        return customerService.customerDetail(username);

    }

    @PostMapping(value = "/home/save-address")
    public String addAddress(@Valid @RequestBody AddressDto address) {
        String username = userService.getUserName();
        String message = customerService.addAddress(username,address);
            return message;
    }

    @GetMapping(value = "/home/get-address")
    public List<Address> getCustomerAddress() {
        String username = userService.getUserName();
        return customerService.getCustomerAddress(username);

    }

    @PutMapping(value = "/home/reset-password")
    public String resetCustomerPassword(@RequestParam("password") String password, @RequestParam("confirmPassword") String confirmPassword,HttpServletResponse response) {
        if (passwordValidation.validatePassword(password, confirmPassword)) {
            String username = userService.getUserName();
            String message = customerService.resetUserPassword(password, confirmPassword, username);
                response.setStatus(HttpServletResponse.SC_OK);
                return message;
        }else {
            return "Password not Valid should include Uppercase, LowerCase and Special Character";
        }
    }

    @DeleteMapping(value = "/home/delete-address/{id}")
    public String deleteAddress(@PathVariable("id")Long id) {
        Optional<Address> address = addressRepository.findById(id);
            addressRepository.deleteById(id);
            return "Address Deleted Successfully";
    }

    @PutMapping(value = "/home/update-profile")
    public String updateCustomerProfile(@Valid @RequestBody CustomerProfileDto customerProfileDto,HttpServletResponse response) {
        String username = userService.getUserName();
        String message = customerService.updateCustomerDetail(username,customerProfileDto);
            response.setStatus(HttpServletResponse.SC_OK);
            return message;
    }

    @PutMapping(value = "/home/update-address/{id}")
    public String updateCustomerAddress(@PathVariable("id")Long id, @Valid @RequestBody UpdateAddressDto addressDto, HttpServletResponse response) {
        String username = userService.getUserName();
        String message = customerService.updateAddress(id,addressDto);
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            return message;
    }


//    ------------------------------------------------------------------------------------------------>
//    product apis

    @Autowired
    ProductServiceImpl productService;

    //--------------added

    @GetMapping(value = "/home/product-variation/{id}")
    public ProductVariation getProductVariation(@PathVariable("id")Long productVariationId) {
        return  productService.CustomerProductVariation(productVariationId);
    }

    @GetMapping(value = "home/product/{id}")
    public List<ProductVariation> viewProduct(@PathVariable("id")Long productId) {
        return productService.viewCustomerProduct(productId);
    }

    @GetMapping(value = "/home/product-by-category/{id}")
    public Set<ProductVariation> getProductByCategoryId(@PathVariable("id")Long categoryId) {
        return productService.getProductsForCustomer(categoryId);
    }

    @GetMapping(value = "/home/similar-product/{id}")
    public Iterable<ProductVariation> getSimilarProduct(@PathVariable("id")Long productId) {
        return productService.similarProducts(productId);
    }


//    ------------------------------------------------------------------------------------------->
//    Category Services

    @Autowired
    CategoryServiceImpl categoryService;

    @GetMapping(value = "/home/get-category")
    public Set<Category> getCategory() {
        return categoryService.allCustomerCategory();
    }

    @GetMapping(value = "/home/get-child-category/{id}")
    public Set<Category> getCategory(@PathVariable("id")Long categoryId) {
        return categoryService.childCategory(categoryId);
    }

    @GetMapping(value = "/home/get-filtered-category/{id}")
    public Optional<Category> getFilteredCategory(@PathVariable("id")Long categoryId) {
        return categoryService.filteredCategory(categoryId);
    }
}
