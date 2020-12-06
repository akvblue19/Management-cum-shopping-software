package com.application.shopapp.dtos;

import javax.validation.constraints.NotNull;

public class CategoryDto {

    private Long parentId;
    @NotNull(message = "Should not be null")
    private String name;

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CategoryDto{" +
                "id=" + parentId +
                ", name='" + name + '\'' +
                '}';
    }
}
