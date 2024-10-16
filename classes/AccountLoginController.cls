public with sharing class AccountLoginController {
    @AuraEnabled
    public static String handleLoginAndAddProducts(String email, String password, List<Id> productIds) {
    //    Account account = [SELECT Id, Name FROM Account WHERE Email__c = :email LIMIT 1];
    //     if (account == null) {
    //         throw new AuraHandledException('Invalid login credentials');
    //     }

    //     Contact contact = [SELECT Id, AccountId FROM Contact WHERE AccountId = :account.Id LIMIT 1];
    //     if (contact == null) {
    //         throw new AuraHandledException('No contact found for the account');
    //     }

    //     Opportunity opp = new Opportunity(
    //         Name = 'Order for ' + account.Name,
    //         CloseDate = Date.today().addDays(30),
    //         StageName = 'Prospecting',
    //         AccountId = account.Id
    //     );
    //     insert opp;

    //     List<OpportunityLineItem> oppLineItems = new List<OpportunityLineItem>();
    //     for (Id productId : productIds) {
    //         Product2 product = [SELECT Id, Name FROM Product2 WHERE Id = :productId LIMIT 1];
    //         OpportunityLineItem oppLineItem = new OpportunityLineItem(
    //             OpportunityId = opp.Id,
    //             Product2Id = product.Id,
    //             Quantity = 1
    //         );
    //         oppLineItems.add(oppLineItem);
    //     }
    //     insert oppLineItems;

    //     return 'Products added to the opportunity successfully';
    return '';
    }
}