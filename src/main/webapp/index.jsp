<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <title>Hello World Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        h1 {
            color: #333;
            margin: 0;
        }
        p {
            color: #666;
            margin-top: 10px;
        }
        .timestamp {
            color: #999;
            font-size: 0.9em;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌟 Hello World!</h1>
        <p>Welcome to your Maven web application</p>
        <p>Built with Java, Maven, and JSP</p>
        <div class="timestamp">
            <p>Generated at: <%= new java.util.Date() %></p>
        </div>
    </div>
</body>
</html>
