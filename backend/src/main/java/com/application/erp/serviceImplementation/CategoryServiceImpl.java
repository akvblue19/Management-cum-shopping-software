package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.CategoryDto;
import com.application.shopapp.dtos.CategoryMetaDataFieldValueDto;
import com.application.shopapp.dtos.CategoryMetadataFieldDto;
import com.application.shopapp.entities.Category;
import com.application.shopapp.entities.CategoryMetadataField;
import com.application.shopapp.entities.CategoryMetadataFieldValue;
import com.application.shopapp.entities.Product;
import com.application.shopapp.exceptionhandler.CategoryNotFoundException;
import com.application.shopapp.exceptionhandler.ProductNotFoundException;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.CategoryMetadataFieldRepository;
import com.application.shopapp.repository.CategoryMetadataFieldValueRepository;
import com.application.shopapp.repository.CategoryRepository;
import com.application.shopapp.repository.ProductRepository;
import com.application.shopapp.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryMetadataFieldRepository categoryMetadataFieldRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryMetadataFieldValueRepository categoryMetadataFieldValueRepository;


    @Override
    public Long saveCategory(CategoryDto categoryDto) {
        if(categoryDto.getName().isEmpty()){
            throw new CategoryNotFoundException("ERROR 003","PLEASE ENTER VALUE");
        }

        Optional<Category> exist = categoryRepository.findByName(categoryDto.getName());
        if (exist.isPresent()) {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY ALREADY EXIST");
        }
        Category category = new Category();
        if (categoryDto.getParentId() == null) {
            category.setName(categoryDto.getName());
            category.setParent(null);
            categoryRepository.save(category);
        } else {
            Optional<Category> categoryExistence = categoryRepository.findById(categoryDto.getParentId());
            if (!categoryExistence.isPresent()) {
                throw new CategoryNotFoundException("ERROR 003","PARENT DOES NOT EXIT");
            } else {
                List<Product> product = productRepository.findByCategoryId(categoryDto.getParentId());
                if (!product.isEmpty()) {
                    category.setParent(categoryExistence.get());
                    category.setName(categoryDto.getName());
                    categoryRepository.save(category);
                } else {
                    throw new ProductNotFoundException("ERROR 002","PARENT NOT ASSOCIATED WITH ANY PRODUCT");
                }
            }
        }
        return category.getId();
    }

    @Override
    public Set<Category> getCategory(Long categoryId) {
        Set<Category> categorySet = new HashSet<>();
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(category.isPresent()) {
            Category parentCategory = category.get().getParent();
            Set<Category> childCategory = categoryRepository.findByParentId(categoryId);
            categorySet.add(category.get());
            categorySet.add(parentCategory);
            categorySet.addAll(childCategory);
            return categorySet;
        }else {
            throw new CategoryNotFoundException("ERROR 003","INVALID ID");
        }
    }

    @Override
    public Set<Category> categoryList() {
        Set<Category> categories = new HashSet<>();
        Set<Category> rootCategorySet = categoryRepository.findRootNode();
        Set<Category> innerCategorySet = categoryRepository.findInnerNode();
        Set<Category> leafCategorySet = categoryRepository.findLeafNode();
        categories.addAll(rootCategorySet);
        categories.addAll(innerCategorySet);
        categories.addAll(leafCategorySet);
        return categories;
    }


    @Override
    public String updateCategory(Long categoryId,String name) {
        if(name.isEmpty()){
            throw new UserNotFoundException("","Please Enter Some Value");
        }
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(category.isPresent()) {
            Optional<Category> categoryByName = categoryRepository.findByName(name);
            if(!categoryByName.isPresent()) {
                if (!name.isEmpty()) {
                    category.get().setName(name);
                    categoryRepository.save(category.get());
                }
                return "Category Updated";
            } else {
                throw new CategoryNotFoundException("ERROR 003","CATEGORY ALREADY EXIST");
            }
        } else
        {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY NOT FOUND");
        }
    }

    @Override
    public String saveCategoryMetadataFieldValue(CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto) {
        if(categoryMetaDataFieldValueDto.getCategoryId()==null){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        if(categoryMetaDataFieldValueDto.getCategoryMetadataFieldId()==null){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        if(categoryMetaDataFieldValueDto.getValue()==null){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        Optional<Category> category = categoryRepository.findById(categoryMetaDataFieldValueDto.getCategoryId());
        if(category.isPresent()) {
            Optional<CategoryMetadataField> categoryMetadataField = categoryMetadataFieldRepository.findById(categoryMetaDataFieldValueDto.getCategoryMetadataFieldId());{
                if(categoryMetadataField.isPresent()){
                    CategoryMetadataFieldValue value=categoryMetadataFieldValueRepository.findByValue(categoryMetaDataFieldValueDto.getValue());
                    if(value == null) {
                        CategoryMetadataFieldValue categoryMetadataFieldValue = new CategoryMetadataFieldValue();
                        categoryMetadataFieldValue.setCategory(category.get());
                        categoryMetadataFieldValue.setCategoryMetadataField(categoryMetadataField.get());
                        categoryMetadataFieldValue.setValue(categoryMetaDataFieldValueDto.getValue());
                        categoryMetadataFieldValueRepository.save(categoryMetadataFieldValue);
                        return "Meta data field value added";
                    }else {
                        throw new CategoryNotFoundException("ERROR 003","VALUE ALREADY PRESENT");
                    }
                } else {
                    throw new CategoryNotFoundException("ERROR 003","METADATA FIELD NOT EXIST");
                }
            }
        } else {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY NOT FOUND");
        }
    }


    @Override
    public String updateCategoryMetadataFieldValue(CategoryMetaDataFieldValueDto categoryMetaDataFieldValueDto) {
        if(categoryMetaDataFieldValueDto.getCategoryId()==null){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        if(categoryMetaDataFieldValueDto.getCategoryMetadataFieldId()==null){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        if(categoryMetaDataFieldValueDto.getValue().isEmpty()){
            throw new CategoryNotFoundException("ERROR 003","SHOULD NOT BE NULL");
        }
        Optional<Category> category = categoryRepository.findById(categoryMetaDataFieldValueDto.getCategoryId());
        if(category.isPresent()) {
            Optional<CategoryMetadataField> categoryMetadataField = categoryMetadataFieldRepository.findById(categoryMetaDataFieldValueDto.getCategoryMetadataFieldId());
                if(categoryMetadataField.isPresent()){
                    CategoryMetadataFieldValue categoryMetadataFieldValue = categoryMetadataFieldValueRepository.findMetadataFieldValue(categoryMetaDataFieldValueDto.getCategoryMetadataFieldId(),categoryMetaDataFieldValueDto.getCategoryId());
                    categoryMetadataFieldValue.setValue(categoryMetaDataFieldValueDto.getValue());
                    categoryMetadataFieldValueRepository.save(categoryMetadataFieldValue);
                    return "Meta data field value updated";
                } else {
                    throw new CategoryNotFoundException("ERROR 003","METADATA FIELD NOT EXIST");
                }
            } else {
            throw new CategoryNotFoundException("ERROR 003","CATEGORY NOT FOUND");
        }
    }

    @Override
    public Set<Category> allCustomerCategory() {
        Set<Category> category = categoryRepository.findRootNode();
           return category;
    }

    @Override
    public Long addMetadataField(CategoryMetadataFieldDto categoryMetaDataFieldDto) {
        if(categoryMetaDataFieldDto.getName()==null){
            throw new CategoryNotFoundException("ERROR 003","PLEASE ENTER VALUE");
        }
        CategoryMetadataField field=categoryMetadataFieldRepository.findByName(categoryMetaDataFieldDto.getName());{
            if(field != null) {
                throw new CategoryNotFoundException("ERROR 003","FIELD VALUE ALREADY PRESENT");
            }
        }
        if(categoryMetaDataFieldDto.getName().isEmpty()) {
            throw new CategoryNotFoundException("ERROR 003","PLEASE ADD SOME DATA");
        }
        CategoryMetadataField categoryMetadataField = new CategoryMetadataField();
        categoryMetadataField.setName(categoryMetaDataFieldDto.getName());
        categoryMetadataFieldRepository.save(categoryMetadataField);
        return categoryMetadataField.getId();
    }

    @Override
    public List<CategoryMetadataField> getCategoryMetadataField(int pageNo) {
        return categoryMetadataFieldRepository.findAllFields(PageRequest.of(pageNo,10,
                Sort.Direction.ASC,"id"));
    }


    @Override
    public Optional<Category> filteredCategory(Long categoryId) {
        Optional<Category> filteredCategory = categoryRepository.findById(categoryId);
        Optional<Category> categoryByName = categoryRepository.findByName(filteredCategory.get().getName());
        return categoryByName;
    }

    public Set<Category> childCategory(Long categoryId) {
        return categoryRepository.findByParentId(categoryId);
    }
}
