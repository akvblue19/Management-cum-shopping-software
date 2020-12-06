package com.application.shopapp.repository;

import com.application.shopapp.entities.Seller;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SellerRepository extends CrudRepository<Seller,Long> {

    Seller findByEmail(String email);

    @Query("from Seller")
    List<Seller> findAllSeller(PageRequest user_id);

}
