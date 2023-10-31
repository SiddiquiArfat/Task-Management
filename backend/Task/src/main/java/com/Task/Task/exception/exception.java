package com.Task.Task.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class exception {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> methodArgumentNotValid(Exception exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> exception(Exception exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorDetails> noHandlerFoundException(Exception exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserException.class)
    public ResponseEntity<ErrorDetails> userException(UserException exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ActiveException.class)
    public ResponseEntity<ErrorDetails> activeException(ActiveException exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TaskException.class)
    public ResponseEntity<ErrorDetails> taskException(TaskException exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ProjectException.class)
    public ResponseEntity<ErrorDetails> projectException(ProjectException exception, WebRequest wr){
        ErrorDetails ed = new ErrorDetails();
        ed.setDescritpion(wr.getDescription(false));
        ed.setMessage(exception.getMessage());
        return new ResponseEntity<>(ed, HttpStatus.BAD_REQUEST);
    }



}
