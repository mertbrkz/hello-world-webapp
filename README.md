# Hello World Web Application

A simple Maven-based Java web application demonstrating a "Hello World" application.

## Project Structure

```
hello-world-webapp/
├── src/
│   ├── main/
│   │   ├── java/com/example/
│   │   │   └── HelloWorldServlet.java
│   │   └── webapp/
│   │       ├── index.jsp
│   │       └── WEB-INF/
│   │           └── web.xml
│   └── test/
│       └── java/com/example/
├── pom.xml
└── README.md
```

## Build

To build the project:

```bash
mvn clean package
```

This will create a WAR file in the `target/` directory.

## Run

To run the application, deploy the WAR file to a servlet container like Apache Tomcat or use:

```bash
mvn tomcat7:run
```

## Access

Once running, access the application at:
- JSP Page: `http://localhost:8080/hello-world/`
- Servlet: `http://localhost:8080/hello-world/hello`

## Java Version

This project uses Java 11. Ensure you have JDK 11 or later installed.

## License

MIT License
