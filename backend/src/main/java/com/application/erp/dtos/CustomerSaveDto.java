package com.application.shopapp.dtos;

import com.application.shopapp.validation.Phone;
import com.application.shopapp.validation.ValidPassword;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.File;
import java.io.Serializable;

public class CustomerSaveDto  implements Serializable {

    private Long id;
    @Email
    @NotNull(message = "Invalid email")
    @Column(unique = true)
    private String email;

    @Size(min = 3,max = 10,message = "first name invalid")
    private String firstName;

    private String middleName;

    @Size(min = 3,max = 10,message = "last name invalid")
    private String lastName;

    @ValidPassword(message = "Password Not Valid")
    private String password;

    private String profile;

    @NotNull
    private String confirmPassword;

    @NotNull
    @Phone
    private String contactNo;


    public CustomerSaveDto()
    {}


    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }


    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }


    @Override
    public String toString() {
        return "CustomerSaveDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                ", contactNo='" + contactNo + '\'' +
                '}';
    }
}
