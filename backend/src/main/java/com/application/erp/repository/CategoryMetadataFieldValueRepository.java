package com.application.shopapp.repository;

import com.application.shopapp.entities.CategoryMetadataFieldValue;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CategoryMetadataFieldValueRepository extends CrudRepository<CategoryMetadataFieldValue, Long> {

    @Query(value = "select * from category_metadata_field_value where category_metadata_field_id =:fieldId AND category_id =:categoryId ",nativeQuery = true)
    CategoryMetadataFieldValue findMetadataFieldValue(@Param("fieldId")Long fieldId,@Param("categoryId")Long categoryId);

    CategoryMetadataFieldValue findByValue(String value);
}
