package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.ProductDto;
import com.application.shopapp.dtos.ProductUpdateDto;
import com.application.shopapp.dtos.ProductVariationDto;
import com.application.shopapp.dtos.UpdateProductVariationDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.exceptionhandler.CategoryNotFoundException;
import com.application.shopapp.exceptionhandler.ProductNotFoundException;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.ValidationException;
import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    ProductVariationRepository productVariationRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CategoryMetadataFieldRepository categoryMetadataFieldRepository;
    @Autowired
    CategoryMetadataFieldValueRepository categoryMetadataFieldValueRepository;

    @Autowired
    EmailService emailService;

    @Override
    public String addProduct(String username, ProductDto productDto) {
        if(productDto.getBrand().isEmpty() || productDto.getCategoryId()==null || productDto.getDescription().isEmpty() || productDto.getName().isEmpty()){
            throw new CategoryNotFoundException("ERROR 003","Please Enter all the Fields");
        }
        Seller seller = sellerRepository.findByEmail(username);
        Product product = new Product();
        Optional<Category> categoryOptional = categoryRepository.findById(productDto.getCategoryId());
        if (!categoryOptional.isPresent()) {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY NOT FOUND");
        }
        Category category = categoryOptional.get();
        Product productName = productRepository.findUniqueName(seller.getId(), productDto.getBrand(), category.getId(), productDto.getName());
        if (productName != null) {
            throw new ProductNotFoundException("ERROR 002","PRODUCT SHOULD BE UNIQUE");
        }else {
            product.setName(productDto.getName());
            product.setBrand(productDto.getBrand());
            product.setDescription(productDto.getDescription());
            product.setCategory(category);
            product.setSeller(seller);
            productRepository.save(product);
            emailService.sendEmail("NEW PRODUCT ADDED", "Activate the product",
                    "adarshsoni284@gmail.com");
        }
        return "Product added successfully";
    }

    @Override
    @Transactional
    public String addProductVariation(ProductVariationDto productVariationDto) {
        if(productVariationDto.getProductVariationImage().isEmpty() || productVariationDto.getPrice()==null || productVariationDto.getQuantityAvailable()==null || productVariationDto.getMetaData().isEmpty() || productVariationDto.getProductId()==null){
            throw new ProductNotFoundException("ERROR 002","Please Enter all the Fields");
        }
        Optional<Product> productOptional = productRepository.findById(productVariationDto.getProductId());
        if (!productOptional.isPresent())
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT FOUND");
        Product product = productOptional.get();
        ProductVariation productVariation = new ProductVariation();
        productVariation.setProduct(product);
//        Category category = product.getCategory();
        Map<String, String> metaData = productVariationDto.getMetaData();
        for (Map.Entry<String, String> fieldValues : metaData.entrySet()) {
            String field = fieldValues.getKey();
            String value = fieldValues.getValue();
            CategoryMetadataField categoryMetadataField = categoryMetadataFieldRepository.findByName(field);
            CategoryMetadataFieldValue categoryMetadataFieldValue = categoryMetadataFieldValueRepository.findByValue(value);
            if(categoryMetadataField == null ){
                throw new ProductNotFoundException("ERROR 002","FIELD NOT FOUND");
            }else {
                if( categoryMetadataFieldValue == null) {
                    throw new CategoryNotFoundException("ERROR 003","VALUE NOT FOUND");
                }
            }
        }
        productVariation.setMetaData(productVariationDto.getMetaData());
        if (productVariationDto.getPrice() < 0) {
            throw new ValidationException("Price must be 0 or more");
        }
        productVariation.setPrice(productVariationDto.getPrice());
        if (productVariationDto.getQuantityAvailable()< 0) {
            throw new ValidationException("Quantity must be ) or more");
        }
        productVariation.setQuantityAvailable(productVariationDto.getQuantityAvailable());
        productVariation.setProductVariationImage(productVariationDto.getProductVariationImage());

        productVariationRepository.save(productVariation);
        return "Product variation added successfully!";
    }

    @Override
    public List<ProductVariation> viewCustomerProduct(Long id) {
        Optional<Product> productOptional = productRepository.findById(id);
        if (!productOptional.isPresent()) {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT FOUND");
        }
        if(!productOptional.get().isActive()) {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT ACTIVE");
        }
        Product product = productOptional.get();
        List<ProductVariation> productVariationList = productVariationRepository.findByProductId(product.getId());
        if(productVariationList.isEmpty()) {
            throw new ProductNotFoundException("ERROR 002","NO VARIATIONS AVAILABLE FOR THE GIVEN PRODUCT");
        } else {
            return productVariationList;
        }
    }



    @Override
    @Transactional
    public Set<Product> listAllProduct() {
        String username = userService.getUserName();
        Seller seller = sellerRepository.findByEmail(username);
        Set<Product> product=productRepository.findBySellerId(seller.getId());
        return product;

    }

    @Override
    @Transactional
    public Iterable<Product> listAdminProduct() {

        return productRepository.findAllProduct();

    }

    @Override
    public Product findProductById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT FOUND");
        } else {
            Seller seller = product.get().getSeller();
            String username = userService.getUserName();
            if (username.equals(seller.getEmail())) {
                return product.get();
            } else {
                throw new UserNotFoundException("ERROR 001","USER NOT AUTHORIZED");
            }
        }
    }

    @Override
    public Product findProductForAdminById(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT FOUND");
        }
        if (product.get().isActive()) {
            return product.get();
        }  else {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT ACTIVE");
        }
    }

    @Override
    public ProductVariation findProductVariation(Long productVariationId) {
        Optional<ProductVariation> productVariation = productVariationRepository.findById(productVariationId);
        Product product = productVariation.get().getProduct();
        Seller seller = product.getSeller();
        String username = userService.getUserName();
        if (seller.getEmail().equals(username)) {
            return productVariation.get();
        } else{
            throw new ProductNotFoundException("ERROR 002","USER NOT AUTHORIZED");
        }
    }

    @Override
    public ProductVariation CustomerProductVariation(Long productVariationId) {
        Optional<ProductVariation> productVariation = productVariationRepository.findById(productVariationId);
        Product product = productVariation.get().getProduct();
            return productVariation.get();
    }

    @Override
    public List<ProductVariation> findAllVariation(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent()) {
            String username = userService.getUserName();
            if(username.equals(product.get().getSeller().getEmail())) {
               return productVariationRepository.findByProductId(productId);
            }else {
                throw new UserNotFoundException("ERROR 001","USER NOT AUTHORIZED");
            }
        } else {
            throw new ProductNotFoundException("ERROR 002","PRODUCT NOT FOUND");
        }
    }

    @Override
    @Transactional
    public String deleteProduct(Long productId,String username) {
        Optional<Product> product = productRepository.findById(productId);
        if(!product.isPresent()) {
            return "product not found";
        }else {
            Seller seller = sellerRepository.findByEmail(username);
            if(seller == product.get().getSeller()) {
                productVariationRepository.deleteProductVariation(productId);
                productRepository.deleteProduct(productId);
                return "Product deleted";
            } else {
                return "not authorized";
            }
        }
    }

    @Override
    @Transactional
    public String updateProduct(String username, ProductUpdateDto productUpdateDto,Long id) {
        if(productUpdateDto.getName().isEmpty() || productUpdateDto.getDescription().isEmpty()){
            throw new ProductNotFoundException("ERROR 002","Please add some data");
        }

        Seller seller = sellerRepository.findByEmail(username);
        Optional<Product>  product = productRepository.findById(id);
        if(seller == product.get().getSeller()) {
            if(!productUpdateDto.getDescription().isEmpty()) {
                product.get().setDescription(productUpdateDto.getDescription());
            }
            if(!productUpdateDto.getName().isEmpty()) {
                product.get().setName(productUpdateDto.getName());
            }
            if(productUpdateDto.isReturnable()) {
                product.get().setReturnable(productUpdateDto.isReturnable());
            }
            if (productUpdateDto.isCancellable()) {
                product.get().setCancellable(productUpdateDto.isCancellable());
            }
            productRepository.save(product.get());
            return "Product Updated";
        }else {
            return "Update failed";
        }

    }

    @Override
    public Set<ProductVariation> getProductsForCustomer(Long categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(!category.isPresent()) {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY NOT FOUND");
        }

        Set<Category> categories = new HashSet<>();
        Set<Category> categoryChild = categoryRepository.findByParentId(categoryId);
        categories.addAll(categoryChild);
        categories.add(category.get());

        Set<Product> allProducts = new HashSet<>();
        Set<ProductVariation> allVariation = new HashSet<>();

        Iterator<Category> categoryIterator = categories.iterator();
        while (categoryIterator.hasNext()){
            Category particularCategory = categoryIterator.next();
            Set<Product> products = productRepository.findAllByCategoryId(particularCategory.getId());
            allProducts.addAll(products);
        }

        Iterator<Product> productIterator = allProducts.iterator();
        while (productIterator.hasNext()){
            Product particularProduct = productIterator.next();
            Set<ProductVariation> variations = productVariationRepository.findSingleProductById(particularProduct.getId());
            allVariation.addAll(variations);
        }
        return allVariation;

    }

    @Override
    public String activateProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(!product.isPresent()) {
            return "No product with the given id";
        } else {
            if(product.get().isActive()) {
                return "Product is already active";
            }else{
                    product.get().setActive(true);
                    productRepository.save(product.get());
                    emailService.sendEmail("PRODUCT ACTIVATED", "Activate the product",
                            "adarshsoni284@gmail.com");
                    return "Product Activated";
            }
        }
    }

    @Override
    public String deactivateProduct(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(!product.isPresent()) {
            return "No product with the given id";
        } else {
            if(product.get().isActive()) {
                product.get().setActive(false);
                productRepository.save(product.get());
                emailService.sendEmail("PRODUCT DE-ACTIVATED", "Deactivate the product",
                "adarshsoni284@gmail.com");
                return "Product De-activated";
            } else {
                return "User Not Authorized";
            }
        }
    }

    @Override
    public String updateProductVariation(Long id, UpdateProductVariationDto updateProductVariationDto) {
        String username=userService.getUserName();
        Optional<ProductVariation> productVariationOptional = productVariationRepository.findById(id);
        if (!productVariationOptional.isPresent())
            throw new ProductNotFoundException("ERROR 002","PRODUCT VARIATION NOT FOUND");
        ProductVariation productVariation = productVariationOptional.get();
        if (productVariation.getProduct().getSeller() != sellerRepository.findByEmail(username)) {
            throw new ProductNotFoundException("ERROR 002","USER NOT AUTHORIZED");
        }
        if (updateProductVariationDto.getQuantityAvailable() != null) {
            productVariation.setQuantityAvailable(updateProductVariationDto.getQuantityAvailable());
        }
        if (updateProductVariationDto.getPrice() != null) {
            productVariation.setPrice(updateProductVariationDto.getPrice());
        }
        if (!updateProductVariationDto.getProductVariationImage().isEmpty()) {
            productVariation.setProductVariationImage(updateProductVariationDto.getProductVariationImage());
        }
        if (updateProductVariationDto.isActive() != null) {
            productVariation.setActive(updateProductVariationDto.isActive());
        }
        if (updateProductVariationDto.getMetadata() != null) {
            Map<String, String> metadata = updateProductVariationDto.getMetadata();
            for (Map.Entry<String, String> fieldValues : metadata.entrySet()) {
                String field = fieldValues.getKey();
                String value = fieldValues.getValue();
                CategoryMetadataField categoryMetadataField = categoryMetadataFieldRepository.findByName(field);
                CategoryMetadataFieldValue categoryMetadataFieldValue = categoryMetadataFieldValueRepository.findByValue(value);
                if(categoryMetadataField == null ){
                    throw new ProductNotFoundException("ERROR 002","FIELD NOT FOUND");
                }else {
                    if( categoryMetadataFieldValue == null) {
                        throw new CategoryNotFoundException("ERROR 003","VALUE NOT FOUND");
                    }
                }
            }
            productVariation.setMetaData(metadata);
        }
        productVariationRepository.save(productVariation);
        return "product variation updated successfully";

    }

    @Override
    public Iterable<ProductVariation> similarProducts(Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        if(product.isPresent()) {
            if (product.get().isActive()) {
                return productVariationRepository.findByProductId(productId);
            } else {
                throw new ProductNotFoundException("ERROR 002","PRODUCT NOT ACTIVE");
            }
        } else {
            throw new ProductNotFoundException("ERROR 002","INVALID PRODUCT ID");
        }
    }

    public Set<Product> allProduct() {
        return productRepository.findAllActiveProduct();
    }
}
