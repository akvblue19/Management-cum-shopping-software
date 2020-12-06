package com.application.shopapp.dtos;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class CategoryMetadataFieldDto implements Serializable {

    @NotNull
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CategoryMetadataFieldDto{" +
                "name='" + name + '\'' +
                '}';
    }
}
