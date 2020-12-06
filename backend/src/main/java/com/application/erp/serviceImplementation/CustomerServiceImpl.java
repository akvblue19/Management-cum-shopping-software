package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.AddressDto;
import com.application.shopapp.dtos.CustomerProfileDto;
import com.application.shopapp.dtos.CustomerSaveDto;
import com.application.shopapp.dtos.UpdateAddressDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    VerificationTokenRepository verificationTokenRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AddressRepository addressRepository;

    @Override
    @Transactional
    public String addCustomer(CustomerSaveDto customer) {
        if(customer.getProfile().isEmpty() || customer.getFirstName().isEmpty() || customer.getMiddleName().isEmpty() || customer.getLastName().isEmpty() || customer.getPassword().isEmpty() || customer.getConfirmPassword().isEmpty() || customer.getContactNo().isEmpty() || customer.getEmail().isEmpty()){
            throw new UserNotFoundException("ERROR 001","Please Enter All the Details");
        }
        if(customer.getConfirmPassword().equals(customer.getPassword())) {
            String pass = passwordEncoder.encode(customer.getPassword());
            customer.setPassword(pass);
            Customer saveCustomer = new Customer();
            saveCustomer.setId(customer.getId());
            User existedEmail = userRepository.findByEmail(customer.getEmail());
            if(existedEmail != null) {
                throw new UserNotFoundException("ERROR 001","EMAIL ALREADY EXIST");
            }
            saveCustomer.setProfile(customer.getProfile());
            saveCustomer.setEmail(customer.getEmail());
            saveCustomer.setFirstName(customer.getFirstName());
            saveCustomer.setLastName(customer.getLastName());
            saveCustomer.setMiddleName(customer.getMiddleName());
            saveCustomer.setPassword(customer.getPassword());
            saveCustomer.setContactNo(customer.getContactNo());
            Set<Role> roleList = new HashSet<>();
            Role role = new Role();
            role.setAuthority("ROLE_CUSTOMER");
            roleList.add(role);
            saveCustomer.setRoleList(roleList);
            if (customer.getProfile() != null) {
                saveCustomer.setProfile(customer.getProfile());
            }
        customerRepository.save(saveCustomer);

            String token = UUID.randomUUID().toString();
            VerificationToken confirmToken = new VerificationToken();
            confirmToken.setToken(token);
            confirmToken.setUserEmail(customer.getEmail());
            confirmToken.setGeneratedDate(new Date());
            verificationTokenRepository.save(confirmToken);

            emailService.sendEmail("ACCOUNT ACTIVATE TOKEN", "To confirm your account, please click here : "
                    + "http://13.68.230.39:3000/confirm-account?token=" + token, customer.getEmail());

            return "registered";
        } else {
            return "Both password should be same";
        }
    }


    @Override
    @Transactional
    public List<Customer> listAllCustomer(int pageNo) {
        return customerRepository.findAllCustomer(PageRequest.of(pageNo,10,
                Sort.Direction.ASC,"user_id"));

    }

    @Override
    @Transactional
    public String activateCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if(!customer.isPresent()) {
            throw new UserNotFoundException("ERROR 001","INVALID ID");
        } else {
		    customer.get().setActive(true);
		    userRepository.save(customer.get());
            emailService.sendEmail("ACCOUNT ACTIVATED", "Your account is activated",
                    customer.get().getEmail());
        }
		return "Customer activated";
    }

    @Override
    @Transactional
    public String deactivateCustomer(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if(!customer.isPresent()) {
            throw new UserNotFoundException("ERROR 001","INVALID ID");
        } else {
            customer.get().setActive(false);
            userRepository.save(customer.get());
            emailService.sendEmail("ACCOUNT DE-ACTIVATED", "Your account is deactivated",
                    customer.get().getEmail());
        }
        return "Customer de-activated";
    }

//    -------------------------------------------------------------------------------------------->>


    @Override
    public Customer customerDetail(String email) {
        return customerRepository.findByEmail(email);
    }

    public String addAddress(String email, AddressDto addressDto) {
        if(addressDto.getAddress().isEmpty() || addressDto.getCity().isEmpty() || addressDto.getCountry().isEmpty() || addressDto.getLabel().isEmpty() || addressDto.getState().isEmpty() || addressDto.getZipCode().isEmpty()){
            throw  new UserNotFoundException("ERROR 001","Please Enter all the Fields");
        }
        Address address1 = new Address(addressDto.getCity(),addressDto.getState(),addressDto.getCountry(),addressDto.getAddress()
                ,addressDto.getZipCode(),addressDto.getLabel());
        User user = userRepository.findByEmail(email);
        Set<Address> address = user.getAddresses();
        address.add(address1);

        userRepository.save(user);
        return "Address Updated Successfully";
    }

    @Override
    public List<Address> getCustomerAddress(String email) {
        Customer customer = customerRepository.findByEmail(email);
        return addressRepository.findAddress(customer.getId());
    }

    @Override
    public String resetUserPassword(String password, String confirmPassword,String email) {
        if (password.equals(confirmPassword)) {
            String pass = passwordEncoder.encode(confirmPassword);
            Customer customer = customerRepository.findByEmail(email);
            customer.setPassword(pass);
            customerRepository.save(customer);
            emailService.sendEmail("PASSWORD UPDATED","Your password is successfully changed",email);
            return "Password Updated Successfully";
        } else {
            return "Both password should be same";
        }
    }

    @Override
    public String updateCustomerDetail(String username,CustomerProfileDto customerProfileDto) {
        if(customerProfileDto.getContactNo().isEmpty() || customerProfileDto.getLastName().isEmpty() || customerProfileDto.getFirstName().isEmpty()){
            throw  new UserNotFoundException("ERROR 001","Please Enter Some Data");
        }
        Customer customer = customerRepository.findByEmail(username);
        if(!customerProfileDto.getFirstName().isEmpty()) {
            customer.setFirstName(customerProfileDto.getFirstName());
        }
        if(!customerProfileDto.getLastName().isEmpty()) {
            customer.setLastName(customerProfileDto.getLastName());
        }
        if(!customerProfileDto.getContactNo().isEmpty()) {
            customer.setContactNo(customerProfileDto.getContactNo());
        }
            customerRepository.save(customer);
        return "Successfully Updated";
    }

    @Override
    public String updateAddress(Long id, UpdateAddressDto updateAddressDto) {
        Optional<Address> address = addressRepository.findById(id);
            if (address.isPresent()) {
                if(!updateAddressDto.getZipCode().isEmpty()) {
                    address.get().setZipCode(updateAddressDto.getZipCode());
                }
                if(!updateAddressDto.getState().isEmpty()) {
                    address.get().setState(updateAddressDto.getState());
                }
                if(!updateAddressDto.getLabel().isEmpty()) {
                    address.get().setLabel(updateAddressDto.getLabel());
                }
                if(!updateAddressDto.getCountry().isEmpty()) {
                    address.get().setCountry(updateAddressDto.getCountry());
                }
                if(!updateAddressDto.getCity().isEmpty()) {
                    address.get().setCity(updateAddressDto.getCity());
                }
                if(!updateAddressDto.getAddress().isEmpty()) {
                    address.get().setAddress(updateAddressDto.getAddress());
                }

                addressRepository.save(address.get());

                return "Successfully Updated";
            } else {
                return "Address not found";
            }
    }
}




