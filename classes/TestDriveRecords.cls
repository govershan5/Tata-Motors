public class TestDriveRecords {
    @AuraEnabled(cacheable=true)
    public static List<TestDrive__c> getTestRecords(String email){ 
            List<TestDrive__c> tsd=[SELECT Id, Name,Preferred_Slot__c, Time__c, Phone__c, Account__r.Name,Product__c, Product__r.Name, Email__c 
            FROM TestDrive__c 
            WHERE Email__c = :email];
       return tsd;
    }

}