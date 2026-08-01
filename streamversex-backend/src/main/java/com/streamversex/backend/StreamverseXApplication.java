package com.streamversex.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class StreamverseXApplication {

	public static void main(String[] args) {
		SpringApplication.run(StreamverseXApplication.class, args);
	}

}
