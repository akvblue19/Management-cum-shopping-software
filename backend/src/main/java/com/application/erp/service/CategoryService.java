package com.application.shopapp.service;

import com.application.shopapp.dtos.CategoryDto;
import com.application.shopapp.dtos.CategoryMetaDataFieldValueDto;
import com.application.shopapp.dtos.CategoryMetadataFieldDto;
import com.application.shopapp.entities.Category;
import com.application.shopapp.entities.CategoryMetadataField;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CategoryService {

    Long saveCategory(CategoryDto categoryDto);

    Set<Category> getCategory(Long categoryId);

    Set<Category> categoryList();

    String updateCategory(Long categoryId,String name);

    String saveCategoryMetadataFieldValue(CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto);

    String updateCategoryMetadataFieldValue(CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto);

    Set<Category> allCustomerCategory();

    Long addMetadataField(CategoryMetadataFieldDto categoryMetaDataFieldDto);

    List<CategoryMetadataField> getCategoryMetadataField(int pageNo);

    Optional<Category> filteredCategory(Long categoryId);
}
