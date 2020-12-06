package com.application.shopapp.repository;

import com.application.shopapp.entities.Customer;
import com.application.shopapp.entities.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductRepository extends CrudRepository<Product,Long> {

    @Query(value = "select * from product where category_id =:uid",nativeQuery = true)
    List<Product> findByCategoryId(@Param("uid") Long id);

    @Query(value = "select * from product where seller_user_id =:id AND category_id =:categoryId AND brand =:brand AND name=:name", nativeQuery = true)
    Product findUniqueName(@Param("id") Long id, @Param("brand") String brand, @Param("categoryId") Long categoryId, @Param("name") String name);

    @Query(value = "select * from product where category_id =:uid AND is_active = true",nativeQuery = true)
    Set<Product> findAllByCategoryId(@Param("uid")Long categoryId);

    @Query(value = "select * from product where seller_user_id =:uid",nativeQuery = true)
    Set<Product> findBySellerId(@Param("uid")Long sellerId);

    @Query(value = "select * from product where is_active = true",nativeQuery = true)
    Set<Product> findAllActiveProduct();

    @Query(value = "select * from product",nativeQuery = true)
    List<Product> findAllProduct();

    @Modifying
    @Transactional
    @Query(value = "delete from product where id =:uid",nativeQuery = true)
    void deleteProduct(@Param("uid") Long productId);

}
