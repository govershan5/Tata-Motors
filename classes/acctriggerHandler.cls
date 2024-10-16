public class acctriggerHandler {
    public static void handleAfterInsert(List<Account> newAccounts){
        List<Contact> contactsToInsert = new List<Contact>();
        List<Opportunity> opportunitiesToInsert = new List<Opportunity>();
        for(Account acc : newAccounts){
            Contact newcontact = new Contact(LastName=acc.Name,AccountId=acc.Id,Email=acc.Email__c);
            contactsToInsert.add(newContact);
            Opportunity newOpportunity = new Opportunity(Name=acc.Name + 'Opportunity',
                                                         AccountId=acc.Id,
                                                         CloseDate=Date.today().addDAys(30),
                                                         StageName='Value Proposition',Email__c=acc.Email__c);
            opportunitiesToInsert.add(newOpportunity);
        }
        if(!contactsToInsert.isEmpty()){
            insert contactsToInsert;
        }
        if(!opportunitiesToInsert.isEmpty()){
            insert opportunitiesToInsert;
        }
    }

}