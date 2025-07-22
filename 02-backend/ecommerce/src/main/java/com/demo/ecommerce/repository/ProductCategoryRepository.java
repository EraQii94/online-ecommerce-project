package com.demo.ecommerce.repository;

import com.demo.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:4200")
@RepositoryRestResource(path = "product-categories", collectionResourceRel = "productCategories")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {


}
