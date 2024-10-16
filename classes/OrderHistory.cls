public class OrderHistory {
    @AuraEnabled(cacheable=true)
    public static List<OpportunityLineItem> getOrders(String mail){
        Id oppId=[select Id from Opportunity where Email__c=:mail limit 1][0].Id;
      List<OpportunityLineItem> opl= [SELECT Id, Product2Id, OpportunityId,  UnitPrice, Product2.Name,Product2.ImageUrl__c FROM OpportunityLineItem where OpportunityId=:oppId   ];
        system.debug('oppurtunity line items are '+opl);
        return opl;
        
    }
    @AuraEnabled(cacheable=true)
    public static Id getOpId(String mail){
        Id oppId=[select Id from Opportunity where Email__c=:mail limit 1][0].Id;
        system.debug(oppId);
        return oppId;
    }
    
}