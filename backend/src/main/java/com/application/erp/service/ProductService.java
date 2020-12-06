package com.application.shopapp.service;

import com.application.shopapp.dtos.ProductDto;
import com.application.shopapp.dtos.ProductUpdateDto;
import com.application.shopapp.dtos.ProductVariationDto;
import com.application.shopapp.dtos.UpdateProductVariationDto;
import com.application.shopapp.entities.Product;
import com.application.shopapp.entities.ProductVariation;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductService {

    Iterable<Product> listAdminProduct();

    String addProduct(String username, ProductDto productDto);

    String addProductVariation(ProductVariationDto productVariationDto);

    List<ProductVariation> viewCustomerProduct(Long id);

    Set<Product> listAllProduct();

    Product findProductById(Long productId);

    Product findProductForAdminById(Long productId);

    ProductVariation findProductVariation(Long productVariationId);

    List<ProductVariation> findAllVariation(Long productId);

    String deleteProduct(Long productId,String username);

    String updateProduct(String username, ProductUpdateDto productUpdateDto,Long id);

    Set<ProductVariation> getProductsForCustomer(Long category_id);

    String activateProduct(Long productId);

    String deactivateProduct(Long productId);

    String updateProductVariation(Long id, UpdateProductVariationDto updateProductVariationDto);

    Iterable<ProductVariation> similarProducts(Long productId);

    ProductVariation CustomerProductVariation(Long productVariationId);

    Set<Product> allProduct();

}
