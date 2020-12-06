package com.application.shopapp.service;

import com.application.shopapp.dtos.AddressDto;
import com.application.shopapp.dtos.CustomerProfileDto;
import com.application.shopapp.dtos.CustomerSaveDto;
import com.application.shopapp.dtos.UpdateAddressDto;
import com.application.shopapp.entities.Address;
import com.application.shopapp.entities.Customer;

import java.util.List;

public interface CustomerService {

    String addCustomer(CustomerSaveDto customer);

    List<Customer> listAllCustomer(int pageNo);

    String activateCustomer(Long id);

    String deactivateCustomer(Long id);

    Customer customerDetail(String email);

    List<Address> getCustomerAddress(String email);

    String resetUserPassword(String password, String confirmPassword,String email);

    String updateCustomerDetail(String username, CustomerProfileDto customerProfileDto);

    String updateAddress(Long id, UpdateAddressDto updateAddressDto);

}
