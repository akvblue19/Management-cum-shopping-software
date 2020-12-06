package com.application.shopapp.entities;


import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Entity
@Table(name = "address")
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "city")
    @NotEmpty(message = "Please provide a city")
    private String city;
    @Column(name = "state")
    @NotEmpty(message = "Please provide a state")
    private String state;
    @Column(name = "country")
    @NotEmpty(message = "Please provide a country")
    private String country;
    @Column(name = "address")
    @NotEmpty(message = "Please provide a address")
    private String address;
    @Column(name = "zip_code")
    @NotEmpty(message = "Please provide a zipCode")
    private String zipCode;
    @Column(name = "label")
    @NotEmpty(message = "Work/Home")
    private String label;


    //***************************************************************************************************

    public Address()
    {}

    public Address(String city, String state,String country,String address,String zipCode,String label) {
        this.city = city;
        this.state = state;
        this.country = country;
        this.address = address;
        this.zipCode = zipCode;
        this.label = label;
    }


    public Long getId() {
       return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return "Address{" +
                "id=" + id +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", address='" + address + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", label='" + label + '\'' +
                '}';
    }
}
