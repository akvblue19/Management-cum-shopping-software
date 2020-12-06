package com.application.shopapp.controllers;

import com.application.shopapp.dtos.CategoryDto;
import com.application.shopapp.dtos.CategoryMetaDataFieldValueDto;
import com.application.shopapp.dtos.CategoryMetadataFieldDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.serviceImplementation.CategoryServiceImpl;
import com.application.shopapp.serviceImplementation.CustomerServiceImpl;
import com.application.shopapp.serviceImplementation.ProductServiceImpl;
import com.application.shopapp.serviceImplementation.SellerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(value = "/e-commerce/admin")
public class AdminController
{

    @Autowired
    SellerServiceImpl sellerService;

    @Autowired
    CustomerServiceImpl customerService;

    @Autowired
    CategoryServiceImpl categoryService;


//    --------------------------------------------------------------------------------------------->>
//    admin access for users

    @GetMapping(value = "/home/sellers/{id}")
    List<Seller> allSeller(@PathVariable("id")int pageNo) {
        return sellerService.listAllSeller(pageNo);
    }

    @GetMapping(value = "/home/customers/{id}")
    List<Customer> allCustomer(@PathVariable("id")int pageNo) {
        return customerService.listAllCustomer(pageNo);
    }

    @PutMapping(value = "/home/customer-activate/{id}")
    public String activateCustomer(@PathVariable(value = "id") Long id) {
        String message = customerService.activateCustomer(id);
            return message;
    }

    @PutMapping(value = "/home/customer-de-activate/{id}")
    public String deactivateCustomer(@PathVariable(value = "id") Long id) {
        String message = customerService.deactivateCustomer(id);
            return message;
    }

    @PutMapping(value = "/home/seller-activate/{id}")
    public String activateSeller(@PathVariable(value = "id") Long id) {
        String message = sellerService.activateSeller(id);
            return message;

    }

    @PutMapping(value = "/home/seller-de-activate/{id}")
    public String deactivateSeller(@PathVariable(value = "id") Long id) {
        String message = sellerService.deactivateSeller(id);
            return message;
    }


    //-------------------------------------------------------------------------------------------------->
    //Category related apis

    @PostMapping(value = "/home/add-metadata-field")
    public String addMetaField(@Valid @RequestBody CategoryMetadataFieldDto categoryMetaDataFieldDto) {
        Long id = categoryService.addMetadataField(categoryMetaDataFieldDto);
            return "Field Save with id:= "+id;
    }

    @GetMapping(value = "/home/get-metadata-fields/{id}")
    public List<CategoryMetadataField> getMetadataFields(@PathVariable("id")int pageNo) {
        return categoryService.getCategoryMetadataField(pageNo);
    }

    @PostMapping(value = "/home/add-category")
    public String addCategory(@Valid @RequestBody CategoryDto categoryDto) {
        Long id = categoryService.saveCategory(categoryDto);
            return "Category Save with id:= "+id;
    }


    @GetMapping(value = "/home/get-category/{id}")
    public Set<Category> getCategory(@PathVariable("id")Long categoryId) {
        return categoryService.getCategory(categoryId);
    }


    @GetMapping(value = "/home/all-category")
    public Set<Category> getAllCategory() {
        return categoryService.categoryList();
    }

    @PutMapping(value = "/home/update-category/{id}")
    public String updateCategory(@PathVariable("id")Long categoryId,@RequestParam("name") String name) {
        String message = categoryService.updateCategory(categoryId,name);
        return message;
    }

    @PostMapping(value = "/home/add-category-metadata-field-value")
    public String addCategoryMetadataValue(@Valid @RequestBody CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto) {
        String message = categoryService.saveCategoryMetadataFieldValue(categoryMetaDataFieldValueDto);
        return message;
    }

    @PutMapping(value = "/home/update-category-metadata-field-value")
    public String updateCategoryMetadataField(@Valid @RequestBody CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto) {
        String message = categoryService.updateCategoryMetadataFieldValue(categoryMetaDataFieldValueDto);
        return message;
    }


//    -------------------------------------------------------------------------------------------->
//    product apis

    @Autowired
    ProductServiceImpl productService;

    @PutMapping(value = "/home/activate-product/{id}")
    public String activateProduct(@PathVariable("id")Long productId) {
        String message = productService.activateProduct(productId);
            return message;

    }
    @PutMapping(value = "/home/de-activate-product/{id}")
    public String deactivateProduct(@PathVariable("id")Long product_id) {
        String message = productService.deactivateProduct(product_id);
            return message;
    }

    @GetMapping(value = "/home/all-products")
    public Iterable<Product> getProducts() {
        return productService.listAdminProduct();
    }

    @GetMapping(value = "/home/product/{id}")
    public Product getProductById(@PathVariable("id")Long productId) {
        return productService.findProductForAdminById(productId);
    }
}
