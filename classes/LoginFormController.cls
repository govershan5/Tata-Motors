public with sharing class LoginFormController {
 
    @AuraEnabled(cacheable=true)
    public static Boolean loginUser(String email, String password) {
        try {
            // Query for Account record with matching email
            Account acc = [SELECT Id, Password__c FROM Account WHERE Email__c = :email LIMIT 1];
     System.debug('account found'+acc);
            if (acc != null) {
                
                if (acc.Password__c==password) {
                    // Passwords match, login successful
                    return true;
                }
                else{
                    System.debug('passwords do not match');
                }
            }
            else{
                System.debug('No account found with provided email');
            }

            return false;
        } catch (Exception e) {
            System.debug('Error logging in: ' + e.getMessage());
            return false;
        }
    }
 
    
}