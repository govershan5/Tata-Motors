public class OppPro {
    @AuraEnabled
    public static OpportunityLineItem addProduct(Id opp, Id pro, Integer p,String Email) {
        OpportunityLineItem oli = new OpportunityLineItem();
        try {
            // Retrieve the custom pricebook ID
            Id customPricebookId = [SELECT Id FROM Pricebook2 WHERE Name = 'Tata Cars Price' LIMIT 1].Id;
            System.debug('Custom Pricebook Id: ' + customPricebookId);

            // Retrieve the pricebook entry for the specific product
            List<PricebookEntry> pricebookEntries = [SELECT Id, Product2.Name, UnitPrice, Product2.Description, Product2.Mileage__c, Product2.ImageUrl__c
                                                     FROM PricebookEntry
                                                     WHERE Pricebook2Id = :customPricebookId AND Product2.Id = :pro LIMIT 1];
            
            System.debug('Pricebook Entries: ' + pricebookEntries);

            if (pricebookEntries.isEmpty()) {
                throw new AuraHandledException('No pricebook entries found for the specified product.');
            }

            System.debug('Pricebook Entry Id: ' + pricebookEntries[0].Id);
            System.debug('Product Name: ' + pricebookEntries[0].Product2.Name);

            // Create a new OpportunityLineItem
            oli.OpportunityId = opp;
            oli.UnitPrice = p;
            oli.Quantity = 1;
            oli.Email__c=Email;
            oli.PricebookEntryId = pricebookEntries[0].Id;

            // Insert the OpportunityLineItem
            insert oli;
            System.debug('OpportunityLineItem inserted successfully: ' + oli.Id);

        } catch (Exception e) {
            System.debug('Error occurred: ' + e.getMessage());
            throw new AuraHandledException('An error occurred while adding the product: ' + e.getMessage());
        }

        return oli;
    }

    @AuraEnabled
    public static Opportunity getOpId(String email) {
     /*
      Account acc=[select id,name from Account where id=:accId][0];
       Set<Id> accIds=new Set<Id>();
        List<Contact> contactsToInsert = new List<Contact>();

            List<Opportunity> opportunitiesToInsert = new List<Opportunity>();

    for(Account acc:acclst){
        Contact newcontact = new Contact(LastName=acc.Name,AccountId=acc.Id);
        contactsToInsert.add(newContact);
       accIds.add(acc.Id);
    }
    List<Opportunity> opplst=[select id,name from Opportunity where AccountId=:accid and StageName!='Closed Won'];
    if(opplst.size()==0){
        for(Account acc : acclst){
        Opportunity newOpportunity = new Opportunity();
             newOpportunity.Name=acc.Name;
        newOpportunity.Email__c=acc.Email__c;
            opportunitiesToInsert.add(newOpportunity);
        }
        
    }
    else{
          for(Account acc : acclst){
		Opportunity opp=opplst[0];
        opp.Name=acc.Name;
        opp.Email__c=acc.Email__c;
           opportunitiesToInsert.add(opp);   
    }
        
    }
      */ 
        
        List<Opportunity> op = [SELECT Id FROM Opportunity WHERE Email__c = :email LIMIT 1];
        System.debug('Opportunities found: ' + op);
        if (op.isEmpty()) {
            throw new AuraHandledException('No opportunity found with the specified email.');
        }
        return op[0];
    }
    @AuraEnabled(cacheable=true)
    public static Account getAccId(String email) {
        // Query Opportunity related to the email first
        Opportunity opp = [SELECT Id, AccountId, Account.Name FROM Opportunity WHERE Email__c = :email LIMIT 1];

        if (opp == null) {
            throw new AuraHandledException('No opportunity found with the specified email.');
        }

        // Query Account based on the Opportunity's AccountId
        Account acc = [SELECT Id, Name FROM Account WHERE Id = :opp.AccountId LIMIT 1];

        if (acc == null) {
            throw new AuraHandledException('No account found for the opportunity with the specified email.');
        }

        return acc;
    }
}