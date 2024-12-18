package com.metahive.UserServer.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/public/test")
    public ResponseEntity<String> test(){

        return ResponseEntity.ok("Peekaboo from user server public test !!! ");
    }

    @GetMapping("/private/test")
    public ResponseEntity<String> privateTest(){
        return ResponseEntity.ok("Peekaboo from user server private test !!! ");
    }

}
