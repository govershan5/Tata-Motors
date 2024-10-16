public with sharing class SlotController {
 
    @AuraEnabled
    public static String createTestDriveRecord(Map<String, String> fields) {
        System.debug('Received fields: ' + fields);
 
        try {
            // Extract fields from the map
            String name = fields.get('name');
            String email = fields.get('email');
            String phone = fields.get('phone');
            String license = fields.get('license');
            String preferredSlotString = fields.get('preferredSlot');
            String preferredTimeString = fields.get('preferredTime');
 			String carName=fields.get('carName');
            // String city=fields.get('city');
            System.debug('name: ' + name);
            System.debug('email: ' + email);
            System.debug('phone: ' + phone);
            System.debug('license: ' + license);
            System.debug('preferredSlotString: ' + preferredSlotString);
            System.debug('preferredTimeString: ' + preferredTimeString);
 
            if (name == null || email == null || phone == null || license == null || preferredSlotString == null || preferredTimeString == null) {
                throw new AuraHandledException('One or more required fields are null.');
            }
 
            // Convert string to Date and Time
            Date preferredSlot = Date.valueOf(preferredSlotString);
            Time preferredTime = Time.newInstance(Integer.valueOf(preferredTimeString.split(':')[0]), 0, 0, 0);
            System.debug('preferredSlot: ' + preferredSlot);
            System.debug('preferredTime: ' + preferredTime);
 
            // Insert TestDrive__c record
              Id acclst=[select id,Name,Email__c from Account where Email__c=:email][0].Id;
        Id prolst=[select id from Product2 where Name =:carName][0].Id;
            TestDrive__c newTestDrive = new TestDrive__c(
                Name = name,
                Email__c = email,
                Phone__c = phone,
                License__c = license,
                Preferred_Slot__c = preferredSlot,
                Time__c = preferredTime
                // city__c = city
                
            );
            newTestDrive.Product__c=prolst;
            newTestDrive.Account__c=acclst;
            insert newTestDrive;
 
            return 'Success';
        } catch (Exception e) {
            System.debug('Error message: ' + e.getMessage());
            throw new AuraHandledException('Error creating records: ' + e.getMessage());
        }
    }
    
}