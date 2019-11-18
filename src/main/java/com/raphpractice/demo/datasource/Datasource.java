package com.raphpractice.demo.datasource;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;


@Configuration
public class Datasource {

    @Bean
    @ConfigurationProperties("app.datasource")
    public HikariDataSource hikariDataSource(){
        return DataSourceBuilder.create()
                .type(HikariDataSource.class)
                .build();
    }
}
