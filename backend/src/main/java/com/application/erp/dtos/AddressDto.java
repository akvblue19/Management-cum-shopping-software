package com.application.shopapp.dtos;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class AddressDto implements Serializable {

    @NotNull(message = "Add City")
    private String city;
    @NotNull(message = "Add State")
    private String state;
    @NotNull(message = "Add Country")
    private String country;
    @NotNull(message = "Add Address")
    private String address;
    @NotNull(message = "Add zipCode")
    private String zipCode;
    @NotNull(message = "Add Label")
    private String label;

    public AddressDto()
    { }

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
        return "AddressDto{" +
                "city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", country='" + country + '\'' +
                ", address='" + address + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", label='" + label + '\'' +
                '}';
    }
}
