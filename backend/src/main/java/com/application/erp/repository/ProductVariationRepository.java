package com.application.shopapp.repository;

import com.application.shopapp.entities.ProductVariation;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface ProductVariationRepository extends CrudRepository<ProductVariation,Long> {

    @Query(value = "select * from product_variation where product_id =:uid",nativeQuery = true)
    List<ProductVariation> findByProductId(@Param("uid") Long productId);

    @Query(value = "select * from product_variation where product_id =:uid",nativeQuery = true)
    Set<ProductVariation> findSingleProductById(@Param("uid") Long productId);

    @Modifying
    @Transactional
    @Query(value = "delete from product_variation where product_id =:uid",nativeQuery = true)
    void deleteProductVariation(@Param("uid") Long productId);

    @Query(value = "select * from product_variation where is_active = true",nativeQuery = true)
    Iterable<ProductVariation> findAllVariation();
}
