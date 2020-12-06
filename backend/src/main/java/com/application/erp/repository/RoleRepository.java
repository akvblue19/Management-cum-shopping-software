package com.application.shopapp.repository;

import com.application.shopapp.entities.Product;
import com.application.shopapp.entities.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends CrudRepository<Role,Long> {

}
