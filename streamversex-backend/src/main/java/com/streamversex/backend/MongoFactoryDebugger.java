package com.streamversex.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.stereotype.Component;

@Component
public class MongoFactoryDebugger implements CommandLineRunner {

    private final MongoDatabaseFactory factory;

    public MongoFactoryDebugger(MongoDatabaseFactory factory) {
        this.factory = factory;
    }

    @Override
    public void run(String... args) {

        System.out.println("Factory Class : " + factory.getClass().getName());
        System.out.println("Factory DB    : " + factory.getMongoDatabase().getName());
    }
}