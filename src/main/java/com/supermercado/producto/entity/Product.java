package com.supermercado.producto.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Data
public class Product {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false, length = 64)
    private String password;

    @Column(nullable = false, unique = true, length = 50)
    private String color;

    @Column(nullable = false, unique = true, length = 50)
    private String talla;

    @Column(nullable = false, unique = true, length = 50)
    private String diseño;

    @Column(nullable = false, unique = true, length = 50)
    private String sensacion;

    @Column(nullable = false, unique = true, length = 50)
    private String precio;

}
