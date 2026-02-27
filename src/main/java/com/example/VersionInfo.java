package com.example;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class VersionInfo {
    private String version;
    private String buildDate;
    private String appName;
    private String status;

    public VersionInfo() {
        this.version = "1.0-SNAPSHOT";
        this.buildDate = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        this.appName = "Hello World Web Application";
        this.status = "running";
    }

    public String getVersion() {
        return version;
    }

    public String getBuildDate() {
        return buildDate;
    }

    public String getAppName() {
        return appName;
    }

    public String getStatus() {
        return status;
    }
}
