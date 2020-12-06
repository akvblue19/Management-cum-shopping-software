package com.application.shopapp;

import com.application.shopapp.entities.*;
import com.application.shopapp.exceptionhandler.ProductNotFoundException;
import com.application.shopapp.repository.*;
import com.application.shopapp.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.*;

@SpringBootTest
class ShopappApplicationTests {

	@Test
	void contextLoads() {
	}


	@Autowired
	SellerRepository sellerRepository;

	@Autowired
	AddressRepository addressRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	ProductVariationRepository productVariationRepository;

	@Autowired
	CategoryMetadataFieldRepository categoryMetadataFieldRepository;

	@Autowired
	CategoryMetadataFieldValueRepository categoryMetadataFieldValueRepository;

	@Test
	public Seller sellerDetail(String email) {
		Seller seller = sellerRepository.findByEmail(email);

		return seller;
	}


//	@Test
//	public void findProductById() {
//		Product product = productRepository.findById(19L);
//			if ("adarshupgrade@gmail.com".equals("adarshupgrade@gmail.com")) {
//				System.out.println(product);
//			}
//	}
}
