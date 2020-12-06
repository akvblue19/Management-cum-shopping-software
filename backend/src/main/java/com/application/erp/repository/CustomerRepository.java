package com.application.shopapp.repository;

import com.application.shopapp.entities.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CustomerRepository extends PagingAndSortingRepository<Customer,Long> {

    Customer findByEmail(String email);

    @Query("from Customer")
    List<Customer> findAllCustomer(Pageable pageable);

}
