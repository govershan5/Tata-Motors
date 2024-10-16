public with sharing class TestDriveEmailHandler {
    public static void sendTestDriveEmail(TestDrive__c testDrive) {
        // Create the email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[] { testDrive.Email__c });
        mail.setSubject('Test Drive Scheduled');
        mail.setPlainTextBody('Hello ' + 'Name' + ',\n\n' +
            'Your test drive has been scheduled. Here are the details:\n' +
            'Preferred Date: ' + testDrive.Preferred_Slot__c+ '\n' +
            'Preferred Time: ' + testDrive.Time__c + '\n' + 
            'License: ' + testDrive.License__c + '\n' +
            'phone: ' + testDrive.Phone__c + '\n' +
            'Thank you.');

        // Send the email
        system.debug('mail is sent');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        // Messaging.SingleEmailMessage mailD = new Messaging.SingleEmailMessage();
        // List<Dealer__c> d=[SELECT Name,Email__c from Dealer__c where City__c=:testDrive.city__c limit 1];
        // mail.setToAddresses(new String[]{d[0].Email__c});
        // mail.setSubject('assignment of the customer to the dealer');
        // mail.setPlainTextBody('Dear '+d[0].Name+ '\n\n'+' We are pleased to inform you that a test drive has been scheduled for a prospective customer and his details are'+'\n'
        // + 'name :'+testDrive.Name+'\n'+
        // 'Preferred Date: ' + testDrive.Preferred_Slot__c+ '\n' +
        //     'Preferred Time: ' + testDrive.Time__c + '\n' + 
        //     'License: ' + testDrive.License__c + '\n' +
        //     'phone: ' + testDrive.Phone__c);
        //  Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mailD });
    }
}