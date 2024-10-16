public with sharing class CaseCreationController {
    @AuraEnabled
    public static String createCase(String name, String email, String message) {
        try {
            Case newCase = new Case();
            newCase.Origin = 'Web';
            newCase.Status = 'New';
            newCase.Subject = 'Customer Inquiry from ' + name;
            newCase.Description = message;
            newCase.SuppliedName = name;
            newCase.SuppliedEmail = email;
            insert newCase;
            return 'Case created successfully with Id: ' + newCase.Id;
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}