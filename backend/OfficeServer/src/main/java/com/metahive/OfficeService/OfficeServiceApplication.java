package com.metahive.OfficeService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OfficeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OfficeServiceApplication.class, args);
	}

}
