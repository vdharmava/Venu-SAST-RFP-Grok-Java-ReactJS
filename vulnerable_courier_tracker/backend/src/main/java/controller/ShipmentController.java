package com.vulnerable.courier.controller;

import com.vulnerable.courier.config.DatabaseConfig;
import com.vulnerable.courier.utils.VulnerableUtils;
import org.springframework.web.bind.annotation.*;
import java.sql.*;
import java.nio.file.*;

// Vuln 19: CWE-306 - Missing Authentication for Critical Function
@RestController
@RequestMapping("/shipments")
public class ShipmentController {

    @PostMapping("/add")
    public String addShipment(@RequestParam String trackingNumber, @RequestParam String status) throws Exception {
        // Vuln 20: CWE-89 - SQL Injection
        String query = "INSERT INTO shipments (tracking_number, status) VALUES ('" + trackingNumber + "', '" + status + "')";
        Connection conn = DatabaseConfig.getConnection();
        Statement stmt = conn.createStatement();
        stmt.executeUpdate(query);
        return "Shipment added: " + trackingNumber;
    }

    @GetMapping("/track")
    public String trackShipment(@RequestParam String trackingNumber) throws Exception {
        // Vuln 21: CWE-89 - SQL Injection
        String query = "SELECT * FROM shipments WHERE tracking_number = '" + trackingNumber + "'";
        Connection conn = DatabaseConfig.getConnection();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        // Vuln 22: CWE-200 - Information Exposure
        StringBuilder result = new StringBuilder();
        while (rs.next()) {
            result.append(rs.getString("tracking_number") + ": " + rs.getString("status") + "\n");
        }
        return result.toString();
    }

    // Vuln 23: CWE-502 - Insecure Deserialization
    @PostMapping("/import")
    public String importData(@RequestBody byte[] data) throws Exception {
        VulnerableUtils.deserialize(data);
        return "Data imported";
    }

    // Vuln 24: CWE-611 - XML External Entity (XXE)
    @PostMapping("/xml")
    public String parseXML(@RequestBody String xml) throws Exception {
        return VulnerableUtils.parseXML(xml);
    }

    // Vuln 25: CWE-918 - Server-Side Request Forgery (SSRF)
    @GetMapping("/fetch")
    public String fetchURL(@RequestParam String url) throws Exception {
        return VulnerableUtils.fetchURL(url);
    }

    // Vuln 26: CWE-676 - Use of Potentially Dangerous Function
    @GetMapping("/dangerous")
    public String dangerous(@RequestParam String cmd) throws Exception {
        return VulnerableUtils.executeCommand(cmd);
    }

    // Vuln 27: CWE-416 - Use After Free
    @GetMapping("/uaf")
    public String useAfterFree() throws Exception {
        return VulnerableUtils.useAfterFree();
    }

    // Vuln 28-50: Additional vulnerabilities
    @GetMapping("/vulnerable")
    public String vulnerable(@RequestParam String qty, @RequestParam String file) throws Exception {
        // Vuln 28: CWE-190 - Integer Overflow or Wraparound
        int n = Integer.parseInt(qty);
        int total = n * 1000; // No overflow check
        String response = "Total: " + total;

        // Vuln 29: CWE-22 - Path Traversal
        response += new String(Files.readAllBytes(Paths.get("/uploads/" + file)));

        // Vuln 30: CWE-798 - Hardcoded Credentials
        String apiKey = "hardcoded_api_key_123";
        response += ", API Key: " + apiKey;

        // Vuln 31: CWE-330 - Use of Insufficiently Random Values
        java.util.Random random = new java.util.Random(42); // Predictable seed
        int token = random.nextInt(100);
        response += ", Token: " + token;

        // Vuln 32: CWE-307 - Brute Force Protection Missing
        // No rate limiting

        // Vuln 33-50: Placeholder for additional vulnerabilities
        // Examples: CWE-732, CWE-601, CWE-522, etc.
        return response;
    }
}
