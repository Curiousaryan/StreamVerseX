//package com.streamversex.backend;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.env.ConfigurableEnvironment;
//import org.springframework.core.env.PropertySource;
//import org.springframework.stereotype.Component;
//
//@Component
//public class PropertyDebugger implements CommandLineRunner {
//
//    private final ConfigurableEnvironment env;
//
//    public PropertyDebugger(ConfigurableEnvironment env) {
//        this.env = env;
//    }
//
//    @Override
//    public void run(String... args) {
//
//        System.out.println("========== PROPERTY SOURCES ==========");
//
//        for (PropertySource<?> ps : env.getPropertySources()) {
//            System.out.println(ps.getName());
//        }
//
//        System.out.println("URI      = " + env.getProperty("spring.mongodb.uri"));
//        System.out.println("Database = " + env.getProperty("spring.mongodb.database"));
//        System.out.println("Host     = " + env.getProperty("spring.mongodb.host"));
//        System.out.println("Port     = " + env.getProperty("spring.mongodb.port"));
////    }
//}