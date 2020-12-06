package com.application.shopapp.repository;

import com.application.shopapp.entities.Address;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface AddressRepository extends CrudRepository<Address,Long> {

    @Query(value = "select * from address where user_id=:uid",nativeQuery = true)
    List<Address> findAddress(@Param("uid")Long id);

    @Query(value = "select * from address where user_id=:uid",nativeQuery = true)
    Set<Address> findSellerAddress(@Param("uid")Long id);

}
