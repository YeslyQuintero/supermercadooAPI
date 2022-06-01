package com.supermercado.producto.repository;

import com.supermercado.producto.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    public Product findByEmail(String email);
}
