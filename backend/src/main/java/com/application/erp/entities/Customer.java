package com.application.shopapp.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.File;
import java.io.Serializable;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "customer")
@PrimaryKeyJoinColumn(name = "user_id")
public class Customer extends User implements Serializable {

    @Column(name = "contact_no")
    private String contactNo;


    //**************************************************************************************************

    public Customer()
    {}



    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }


    @Override
    public String toString() {
        return "Customer{" +
                ", contactNo='" + contactNo + '\'' +
                '}';
    }
}
