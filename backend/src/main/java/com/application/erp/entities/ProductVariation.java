package com.application.shopapp.entities;

import com.application.shopapp.audit.Auditing;
import com.application.shopapp.constant.HashMapConverter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.File;
import java.io.Serializable;
import java.util.Map;

@Entity
@Table(name = "product_variation")
@EntityListeners(AuditingEntityListener.class)
public class ProductVariation extends Auditing<String> implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "quantity_available")
    private Long quantityAvailable;
    @Column(name = "price")
    private Integer price;

    @Convert(converter = HashMapConverter.class)
    @Column(columnDefinition = "json")
    private Map<String,String> metaData;

    @Column(name = "primary_image_name")
    private String productVariationImage;


    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "is_active")
    private boolean isActive=true;

    //***************************************************************************************************


    public String getProductVariationImage() {
        return productVariationImage;
    }

    public void setProductVariationImage(String productVariationImage) {
        this.productVariationImage = productVariationImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Long getQuantityAvailable() {
        return quantityAvailable;
    }

    public void setQuantityAvailable(Long quantityAvailable) {
        this.quantityAvailable = quantityAvailable;
    }

    public Map<String, String> getMetaData() {
        return metaData;
    }

    public void setMetaData(Map<String, String> metaData) {
        this.metaData = metaData;
    }


    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }


    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "ProductVariation{" +
                "id=" + id +
                ", quantityAvailable=" + quantityAvailable +
                ", price=" + price +
                ", metaData=" + metaData +
                ", productVariationImage='" + productVariationImage + '\'' +
                ", product=" + product +
                ", isActive=" + isActive +
                '}';
    }
}
