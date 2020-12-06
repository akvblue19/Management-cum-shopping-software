package com.application.shopapp.dtos;

import com.application.shopapp.validation.Phone;
import com.application.shopapp.validation.ValidPassword;
import com.application.shopapp.entities.Address;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.File;
import java.io.Serializable;
import java.util.Set;

public class SellerSaveDto implements Serializable {

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

    @NotNull
    private String confirmPassword;

    @NotNull
    private Set<Address> addresses;

    @Size(min = 10,max = 10,message ="Invalid gst no." )
    private String gst;
    @NotNull
    @Phone
    private String companyContact;
    @Size(min = 5,max = 20,message ="Invalid CompanyName " )
    private String companyName;

    private String profile;


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


    public Set<Address> getAddresses() {
        return addresses;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public String getGst() {
        return gst;
    }

    public void setGst(String gst) {
        this.gst = gst;
    }

    public String getCompanyContact() {
        return companyContact;
    }

    public void setCompanyContact(String companyContact) {
        this.companyContact = companyContact;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @Override
    public String toString() {
        return "SellerSaveDto{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", confirmPassword='" + confirmPassword + '\'' +
                ", addresses=" + addresses +
                ", gst='" + gst + '\'' +
                ", companyContact='" + companyContact + '\'' +
                ", companyName='" + companyName + '\'' +
                ", profile='" + profile + '\'' +
                '}';
    }
}
