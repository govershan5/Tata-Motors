public with sharing class ProRec {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(){
        return [SELECT id,Name,ImageUrl__c,Mileage__c,Description FROM Product2];
    }
}