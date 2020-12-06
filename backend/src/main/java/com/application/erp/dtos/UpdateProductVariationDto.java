package com.application.shopapp.dtos;

import java.io.File;
import java.util.Map;

public class UpdateProductVariationDto {

    private Long productId;
    private Long quantityAvailable;
    private Integer price;
    private String productVariationImage;
    private Map<String,String> metadata;
    Boolean isActive;

    public Boolean isActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Long getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(Long quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getProductVariationImage() {
        return productVariationImage;
    }

    public void setProductVariationImage(String productVariationImage) {
        this.productVariationImage = productVariationImage;
    }

    public Boolean getActive() {
        return isActive;
    }

    public Map<String, String> getMetadata() {
        return metadata;
    }

    public void setMetadata(Map<String, String> metadata) {
        this.metadata = metadata;
    }

    @Override
    public String toString() {
        return "UpdateProductVariationDto{" +
                "productId=" + productId +
                ", quantityAvailable=" + quantityAvailable +
                ", price=" + price +
                ", productVariationImage='" + productVariationImage + '\'' +
                ", metadata=" + metadata +
                ", isActive=" + isActive +
                '}';
    }
}
