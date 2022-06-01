package com.supermercado.producto.controllers;

import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sun.plugin2.message.Message;

import java.util.*;

@RestController

public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    private Message message = new Message();

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.GET)
    public ResponseEntity<Optional> getProduct(@PathVariable Long id){
        Optional<Product> foundUser = productRepository.findById(id);
        if(foundUser.isPresent()){
            return message.viewMessage(HttpStatus.OK,"success", "Producto found");
        }
        return message.viewMessage(HttpStatus.NOT_FOUND, "Not found", "Producto not found");
    }

    @RequestMapping(value = "api/product", method = RequestMethod.POST)
    public ResponseEntity createProduct(@RequestBody Product product){
        Map<String,String> response = new LinkedHashMap<>();
        try{
            product.setColor(product.getColor());
            product.setTalla(product.getTalla());
            product.setDiseño(product.getDiseño());
            product.setSensacion(product.getSensacion());
            product.setPrecio(product.getPrecio());
            productRepository.save(product);
            return message.viewMessage(HttpStatus.OK, "success", "registered producto success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR, "error", "An error occurred while registering the producto!");
        }
    }

    @RequestMapping(value = "api/product", method = RequestMethod.GET)
    public List<Product> listProduct(){
        return productRepository.findAll();

    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.PUT)
    public ResponseEntity editProduct(@RequestBody Product newProduct, @PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try{
            Product product = productRepository.findById(id).get();
            product.setColor(newProduct.getColor());
            product.setTalla(newProduct.getTalla());
            product.setDiseño(newProduct.getDiseño());
            product.setSensacion(newProduct.getSensacion());
            product.setPrecio(newProduct.getPrecio());
            productRepository.save(product);

            return message.viewMessage(HttpStatus.OK, "success", "producto edit success!");
        }catch (Exception e) {
            return message.viewMessage(HttpStatus.NOT_FOUND, "error", "Producto not found!");
        }
    }

    @RequestMapping(value = "api/product/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteProduct(@PathVariable Long id){
        Map<String, String> response = new HashMap<>();
        try {
            Product product = productRepository.findById(id).get();
            productRepository.delete(product);
            return message.viewMessage(HttpStatus.OK, "success", "producto delete success!");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.NOT_FOUND, "error", "Producto not found!");
        }
    }
}
