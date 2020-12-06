package com.application.shopapp.controllers;

import com.application.shopapp.validation.PasswordValidation;
import com.application.shopapp.dtos.*;
import com.application.shopapp.entities.Category;
import com.application.shopapp.entities.Product;
import com.application.shopapp.entities.ProductVariation;
import com.application.shopapp.entities.Seller;
import com.application.shopapp.serviceImplementation.CategoryServiceImpl;
import com.application.shopapp.serviceImplementation.ProductServiceImpl;
import com.application.shopapp.serviceImplementation.SellerServiceImpl;
import com.application.shopapp.serviceImplementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "/e-commerce/seller")
public class SellerController
{
    @Autowired
    SellerServiceImpl sellerService;

    @Autowired
    PasswordValidation passwordValidation;

    @Autowired
    UserServiceImpl userService;


//---------------------------------------------------------------------------------------------------->>
//    seller profile


    @GetMapping(value = "/home/user-profile")
    public SellerGetDto sellerProfile() {
        String username = userService.getUserName();
        return sellerService.sellerGetDetail(username);

    }

    @PutMapping(value = "/home/update-profile")
    public String updateSellerProfile(@Valid @RequestBody SellerProfileDto sellerProfileDto) {
        String username = userService.getUserName();
        String message = sellerService.updateSellerDetail(username,sellerProfileDto);
            return message;
    }

    @PutMapping(value = "/home/reset-password")
    public String resetSellerPassword(@RequestParam("password") String password, @RequestParam("confirmPassword") String confirmPassword) {
        if (passwordValidation.validatePassword(password, confirmPassword)) {
            String username = userService.getUserName();
            String message = sellerService.resetUserPassword(password, confirmPassword, username);
                return message;
        } else {
            return "Password not Valid should include Uppercase, LowerCase and Special Character";
        }
    }

    @PutMapping(value = "/home/update-address/{id}")
    public String updateSellerAddress(@PathVariable("id")Long id,@RequestBody UpdateAddressDto addressDto) {
        String username = userService.getUserName();
        String message = sellerService.updateAddress(id,addressDto);
            return message;
    }

//    ------------------------------------------------------------------------------------------------>>>
//Product apis

    @Autowired
    ProductServiceImpl productService;

    @PostMapping(value = "/home/add-product")
    public String addProduct(@RequestBody ProductDto productDto) {
        String username = userService.getUserName();
        String message = productService.addProduct(username,productDto);
            return message;
    }

    @GetMapping(value = "/home/all-products")
    public Set<Product> getProducts() {
        return productService.listAllProduct();
    }

    @GetMapping(value = "/home/product/{id}")
    public Product getProductById(@PathVariable("id")Long productId) {
        return productService.findProductById(productId);
    }

    @DeleteMapping(value = "/home/product/{id}")
    public String deleteProduct(@PathVariable("id")Long productId) {
        String username = userService.getUserName();
        String message = productService.deleteProduct(productId,username);
            return message;
        }

    @PutMapping(value = "/home/update-product/{id}")
    public String updateProduct(@RequestBody ProductUpdateDto productUpdateDto,@PathVariable("id")Long productId) {
        String username = userService.getUserName();
        String message = productService.updateProduct(username,productUpdateDto,productId);
            return message;
    }

    @PostMapping(value = "/home/add-product-variation")
    public String setProductVariation(@RequestBody ProductVariationDto productVariationDto){
        productService.addProductVariation(productVariationDto);
        return "saved";
    }

    @PutMapping(value = "/home/update-product-variation/{id}")
    public String updateProductVariation(@PathVariable("id")Long id,@RequestBody UpdateProductVariationDto updateProductVariationDto){
        productService.updateProductVariation(id,updateProductVariationDto);
        return "saved";
    }

    @GetMapping(value = "/home/product-variation/{id}")
    public ProductVariation getProductVariation(@PathVariable("id")Long productVariationId) {
        return  productService.findProductVariation(productVariationId);
    }


    @GetMapping(value = "/home/all-product-variation/{id}")
    public List<ProductVariation> getAllProductVariation(@PathVariable("id")Long productId) {
        return productService.findAllVariation(productId);


    }

//    ------------------------------------------------------------------------------------------------>>
//category api

    @Autowired
    CategoryServiceImpl categoryService;

   @GetMapping(value = "/home/all-category")
    public Set<Category> getAllCategory() {
        return categoryService.categoryList();
    }
}
