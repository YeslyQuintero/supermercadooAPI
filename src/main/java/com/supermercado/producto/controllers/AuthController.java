package com.supermercado.producto.controllers;


import com.supermercado.producto.entity.Product;
import com.supermercado.producto.repository.ProductRepository;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    @Autowired
    private ProductRepository productRepository;
    private Product product;
    private Message message;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value = "api/auth/login", method = RequestMethod.POST)
    public ResponseEntity login(@RequestBody Product productReq){
        try{
            message = new Message();
            product = productRepository.findByEmail(productReq.getEmail());
            if(passwordEncoder.matches(productReq.getPassword(), product.getPassword())){
                return message.viewMessage(HttpStatus.OK, "login", "The user logged in");
            }
            return message.viewMessage(HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "invalid username or password");
        }catch (Exception e){
            return message.viewMessage(HttpStatus.INTERNAL_SERVER_ERROR, "error", e.getMessage());
        }

    }
}
