package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.SellerGetDto;
import com.application.shopapp.dtos.SellerProfileDto;
import com.application.shopapp.dtos.SellerSaveDto;
import com.application.shopapp.dtos.UpdateAddressDto;
import com.application.shopapp.entities.*;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SellerServiceImpl implements SellerService {

    @Autowired
    SellerRepository sellerRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    AddressRepository addressRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public String addSeller(SellerSaveDto seller) {
        if(seller.getProfile().isEmpty() || seller.getAddresses().isEmpty() || seller.getGst().isEmpty() || seller.getCompanyContact().isEmpty() || seller.getPassword().isEmpty()
        || seller.getEmail().isEmpty() || seller.getCompanyName().isEmpty() || seller.getConfirmPassword().isEmpty() || seller.getFirstName().isEmpty() ||
        seller.getMiddleName().isEmpty() || seller.getLastName().isEmpty()){
            throw new UserNotFoundException("ERROR 001","Please Enter All the Fields");
        }
        if(seller.getConfirmPassword().equals(seller.getPassword())) {
            String pass = passwordEncoder.encode(seller.getPassword());
            seller.setPassword(pass);
            if(seller.getAddresses().size() == 1) {
                Seller saveSeller = new Seller();
                saveSeller.setId(seller.getId());
                User existedEmail = userRepository.findByEmail(seller.getEmail());
                if(existedEmail != null) {
                    throw new UserNotFoundException("ERROR 001","EMAIL ALREADY EXIST");
                }
                saveSeller.setEmail(seller.getEmail());
                saveSeller.setProfile(seller.getProfile());
                saveSeller.setCompanyName(seller.getCompanyName());
                saveSeller.setCompanyContact(seller.getCompanyContact());
                saveSeller.setFirstName(seller.getFirstName());
                saveSeller.setLastName(seller.getLastName());
                saveSeller.setMiddleName(seller.getMiddleName());
                saveSeller.setAddresses(seller.getAddresses());
                saveSeller.setPassword(seller.getPassword());
                Set<Role> roleList = new HashSet<>();
                Role role = new Role();
                role.setAuthority("ROLE_SELLER");
                roleList.add(role);
                saveSeller.setRoleList(roleList);
                saveSeller.setGst(seller.getGst());
                if(seller.getProfile() != null) {
                    saveSeller.setProfile(seller.getProfile());
                }
                sellerRepository.save(saveSeller);
                emailService.sendEmail("ACCOUNT REGISTERED", "Your account is pending for approval",
                        seller.getEmail());
                return "Registered";
            } else {
                return "Seller can have only one address";
            }
        } else {
            return "Both password should be same";
        }
    }


    @Transactional
    public List<Seller> listAllSeller(int pageNo) {
        return sellerRepository.findAllSeller(PageRequest.of(pageNo,10,
                Sort.Direction.ASC,"user_id"));

    }

    @Override
    @Transactional
    public String activateSeller(Long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if(!seller.isPresent()) {
            throw new UserNotFoundException("ERROR 001","INVALID ID");
        } else {
            seller.get().setActive(true);
            sellerRepository.save(seller.get());
            emailService.sendEmail("ACCOUNT ACTIVATED", "Your account is activated",
                    seller.get().getEmail());
        }
        return "Seller activated";
    }

    @Override
    @Transactional
    public String deactivateSeller(Long id) {
        Optional<Seller> seller = sellerRepository.findById(id);
        if(!seller.isPresent()) {
            throw new UserNotFoundException("ERROR 001","INVALID ID");
        } else {
            seller.get().setActive(false);
            sellerRepository.save(seller.get());
            emailService.sendEmail("ACCOUNT DE-ACTIVATED", "Your account is deactivated",
                    seller.get().getEmail());
        }
        return "Seller de-activated";
    }

//    ---------------------------------------------------------------------------------------------------->>

    @Override
    public SellerGetDto sellerGetDetail(String email) {
        Seller seller = sellerRepository.findByEmail(email);
        Set<Address> addresses = addressRepository.findSellerAddress(seller.getId());
        SellerGetDto sellerDto = new SellerGetDto();
        sellerDto.setId(seller.getId());
        sellerDto.setFirstName((seller.getFirstName()));
        sellerDto.setLastName(seller.getLastName());
        sellerDto.setMiddleName(seller.getMiddleName());
        sellerDto.setEmail(seller.getEmail());
        sellerDto.setProfile(seller.getProfile());
        sellerDto.setCompanyContact(seller.getCompanyContact());
        sellerDto.setCompanyName(seller.getCompanyName());
        sellerDto.setGst(seller.getGst());
        sellerDto.setAddresses(addresses);
        return sellerDto;
    }

    @Override
    public String updateSellerDetail(String username,SellerProfileDto sellerProfileDto) {
        Seller seller = sellerRepository.findByEmail(username);
        if (!sellerProfileDto.getFirstName().isEmpty()) {
            seller.setFirstName(sellerProfileDto.getFirstName());
        }
        if (!sellerProfileDto.getLastName().isEmpty()) {
            seller.setLastName(sellerProfileDto.getLastName());
        }
        if (!sellerProfileDto.getGst().isEmpty()){
            seller.setGst(sellerProfileDto.getGst());
        }
        if(!sellerProfileDto.getCompanyContact().isEmpty()) {
            seller.setCompanyContact(sellerProfileDto.getCompanyContact());
        }
        if(!sellerProfileDto.getCompanyName().isEmpty()) {
            seller.setCompanyName(sellerProfileDto.getCompanyName());
        }
        sellerRepository.save(seller);
        return "Successfully Updated";
    }

    @Override
    public String resetUserPassword(String password, String confirmPassword, String username) {
        if (password.equals(confirmPassword)) {
            String pass = passwordEncoder.encode(confirmPassword);
            Seller seller = sellerRepository.findByEmail(username);
            seller.setPassword(pass);
            sellerRepository.save(seller);
            emailService.sendEmail("PASSWORD UPDATED","Your password is successfully changed",username);
            return "Password Updated Successfully";
        } else {
            return "Both password should be same";
        }
    }

    @Override
    public String updateAddress(Long id, UpdateAddressDto addressDto) {
        Optional<Address> address = addressRepository.findById(id);
        if (!address.isPresent()) {
            return "Address not found";
        } else {
            if(!addressDto.getZipCode().isEmpty()) {
                address.get().setZipCode(addressDto.getZipCode());
            }
            if(!addressDto.getState().isEmpty()) {
                address.get().setState(addressDto.getState());
            }
            if(!addressDto.getLabel().isEmpty()) {
                address.get().setLabel(addressDto.getLabel());
            }
            if(!addressDto.getCountry().isEmpty()) {
                address.get().setCountry(addressDto.getCountry());
            }
            if(!addressDto.getCity().isEmpty()) {
                address.get().setCity(addressDto.getCity());
            }
            if(!addressDto.getAddress().isEmpty()) {
                address.get().setAddress(addressDto.getAddress());
            }
            addressRepository.save(address.get());
            return "Successfully Updated";
        }
    }
}
