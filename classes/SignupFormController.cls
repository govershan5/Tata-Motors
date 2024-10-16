public with sharing class SignupFormController {
    
    @AuraEnabled
    public static void createAccount(Map<String, Object> accountData) {
        try {
            // Extract data from the accountData map
            String name = (String) accountData.get('Name');
            String email = (String) accountData.get('Email__c');
            String phone = (String) accountData.get('Phone');
            String password = (String) accountData.get('Password__c');
            String gender = (String) accountData.get('Gender__c');
            String ageStr = (String) accountData.get('Age__c'); // Retrieve age as String
 
            // Convert age from String to Integer
            Integer age = ageStr != null ? Integer.valueOf(ageStr) : null;
 
            // Create new Account object
            Account newAccount = new Account(
                Name = name,
                Email__c = email,
                Phone = phone,
                Password__c = password,
                Gender__c = gender,
                Age__c = age
            );
            
            // Insert the Account record
            insert newAccount;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating account: ' + e.getMessage());
        }
    }
}