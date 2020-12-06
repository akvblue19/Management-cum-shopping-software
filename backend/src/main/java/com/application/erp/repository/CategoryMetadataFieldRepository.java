package com.application.shopapp.repository;

import com.application.shopapp.entities.CategoryMetadataField;
import com.application.shopapp.entities.Customer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CategoryMetadataFieldRepository extends CrudRepository<CategoryMetadataField,Long> {

    CategoryMetadataField findByName(String name);

    @Query("from CategoryMetadataField")
    List<CategoryMetadataField> findAllFields(Pageable Pageable);
}
