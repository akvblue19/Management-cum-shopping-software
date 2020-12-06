package com.application.shopapp.dtos;


import java.io.Serializable;

public class CustomerProfileDto implements Serializable {

    private Long id;
    private String firstName;
    private String lastName;
    private boolean isActive;
    private String contactNo;

    public CustomerProfileDto()
    {}


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }


    @Override
    public String toString() {
        return "CustomerProfileDto{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", isActive=" + isActive +
                ", contactNo='" + contactNo + '\'' +
                '}';
    }
}

