package com.Task.Task.Respository;

import com.Task.Task.Model.ContactPage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<ContactPage, Integer> {
}
