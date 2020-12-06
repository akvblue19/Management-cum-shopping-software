package com.application.shopapp.dtos;

import java.io.File;
import java.util.Map;

public class ProductVariationDto {

    private Long productId;
    private Long quantityAvailable;
    private Integer price;
    private String productVariationImage;
    private Map<String,String> metaData;



    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
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

    public Map<String, String> getMetaData() {
        return metaData;
    }

    public void setMetaData(Map<String, String> metaData) {
        this.metaData = metaData;
    }

    public Long getQuantityAvailable() {
        return quantityAvailable;
    }

    public String getProductVariationImage() {
        return productVariationImage;
    }

    public void setProductVariationImage(String productVariationImage) {
        this.productVariationImage = productVariationImage;
    }

    @Override
    public String toString() {
        return "ProductVariationDto{" +
                "productId=" + productId +
                ", quantityAvailable=" + quantityAvailable +
                ", price=" + price +
                ", productVariationImage='" + productVariationImage + '\'' +
                ", metaData=" + metaData +
                '}';
    }
}
