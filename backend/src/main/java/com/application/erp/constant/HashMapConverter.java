package com.application.shopapp.constant;


import org.codehaus.jackson.map.ObjectMapper;

import javax.persistence.AttributeConverter;
import java.io.IOException;
import java.util.Map;

public class HashMapConverter implements AttributeConverter<Map<String, Object>, String> {
    ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public String convertToDatabaseColumn(Map<String, Object> customerInfo) {

        String metadataInfo = null;
        try {
            metadataInfo = objectMapper.writeValueAsString(customerInfo);
        } catch (final Exception e) {
            System.out.println("Error: "+e.getMessage());
        }

        return metadataInfo;
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String customerInfoJSON) {

        Map<String, Object> metadata = null;
        try {
            metadata = objectMapper.readValue(customerInfoJSON, Map.class);
        } catch (final IOException e) {
            System.out.println("Error: "+e.getMessage());
        }

        return metadata;
    }

}
