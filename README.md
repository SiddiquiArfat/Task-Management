# Task-Management


<img
  align="right"
        width="40%"
        src="https://img.freepik.com/free-vector/hand-drawn-illustration-business-planning_52683-76702.jpg?w=826&t=st=1699849955~exp=1699850555~hmac=84c2f8a26b73290cf1f337d8362f8661e0a02439d3dc06a7ba027cd882dbbe84"
        alt="error"
      />
TaskPulse is your ultimate task management solution, designed to simplify your life and enhance productivity. Our platform empowers you to effortlessly organize, prioritize, and track tasks while collaborating seamlessly with your team


## Tech Stack

#### Java | Spring Boot | Spring Framework | Spring Data JPA | Spring Security | Spring Boot Web | Validation | Logger | Slf4j | Spring Boot DevTools| Postman | MySQL Database | Maven | Swagger UI | Lombok |
## Modules

- User Module

## Prerequisites

- Java 8 or higher
- Maven
- MySQL Server


## Installation & Run
```bash
# To run this project locally:

# Clone the repository and navigate to the directory
git clone https://github.com/SiddiquiArfat/Task-Management.git
cd Task-Management

# Configure your MySQL credentials in application.properties
# located in src/main/resources directory
# Replace with your actual MySQL credentials
spring.datasource.url=jdbc:mysql://localhost:3306/your-database-name
spring.datasource.username=your-username
spring.datasource.password=your-password

# Use Maven to build the project
mvn clean install

# After successful build, navigate to target directory and run the jar file
java -jar target/decisive-iron-5903-0.0.1-SNAPSHOT.jar

# Your application should be up and running at http://localhost:8080.
```

## API Root Endpoint

```
https://localhost:8080/
```

```
http://localhost:8080/index.html
  
