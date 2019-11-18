package com.raphpractice.demo.student;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    public List<Student> selectAllStudents(){
        return List.of(
                new Student(UUID.randomUUID(), "James", "Bond", "jamesbond@gmail.com", Student.Gender.MALE),
                new Student(UUID.randomUUID(), "Elisa", "Tamara", "elisatamara@gmail.com", Student.Gender.FEMALE)
        );
    }
}
