package com.application.shopapp.dtos;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class CategoryMetaDataFieldValueDto implements Serializable {

    private Long categoryId;
    private Long categoryMetadataFieldId;
    @NotNull
    private String value;


    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getCategoryMetadataFieldId() {
        return categoryMetadataFieldId;
    }

    public void setCategoryMetadataFieldId(Long categoryMetadataFieldId) {
        this.categoryMetadataFieldId = categoryMetadataFieldId;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "CategoryMetaDataFieldValueDto{" +
                "categoryId=" + categoryId +
                ", categoryMetadataFieldId=" + categoryMetadataFieldId +
                ", value='" + value + '\'' +
                '}';
    }
}
