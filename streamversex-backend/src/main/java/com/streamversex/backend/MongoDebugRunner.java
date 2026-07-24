//package com.streamversex.backend;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.stereotype.Component;
//
//@Component
//public class MongoDebugRunner implements CommandLineRunner {
//
//    private final MongoTemplate mongoTemplate;
//
//    public MongoDebugRunner(MongoTemplate mongoTemplate) {
//        this.mongoTemplate = mongoTemplate;
//    }
//
//    @Override
//    public void run(String... args) {
//        System.out.println("================================");
//        System.out.println("Database : " + mongoTemplate.getDb().getName());
//        System.out.println("Collections : " + mongoTemplate.getCollectionNames());
//        System.out.println("================================");
//    }
//}