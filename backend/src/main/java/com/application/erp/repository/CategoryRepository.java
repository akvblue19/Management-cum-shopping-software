package com.application.shopapp.repository;

import com.application.shopapp.entities.Category;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CategoryRepository extends CrudRepository<Category,Long> {

    @Query(value = "select * from category where parent_id IS NULL",nativeQuery = true)
    Set<Category> findRootNode();

    @Query(value = "select * from category c1 LEFT JOIN category c2 ON c1.id = c2.parent_id where c2.parent_id IS NULL",nativeQuery = true)
    Set<Category> findLeafNode();

    @Query(value ="select * from category c1 JOIN category c2 ON c2.parent_id=c1.id where c1.parent_id IS NOT NULL",nativeQuery = true)
    Set<Category> findInnerNode();

    @Query(value = "select * from category where parent_id =:parentId",nativeQuery = true)
    Set<Category> findByParentId(@Param("parentId") Long parentId);

    Optional<Category> findByName(String name);
}
