package com.raphpractice.demo.student;

import com.raphpractice.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getAllStudents(){


        return studentService.getAllStudents();
    }

    //add new content
    @PostMapping
    public void addNewStudent(@RequestBody @Valid Student student){
       studentService.addNewStudent(student);
    }
}
