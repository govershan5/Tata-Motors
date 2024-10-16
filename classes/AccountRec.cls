public with sharing class AccountRec {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT id,Name FROM Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> getPro(string mail){
        return [SELECT Name,Email__c,Gender__c,Age__c,Phone from Account where Email__c=:mail limit 1];
    }
    @AuraEnabled(cacheable=true)
    public static List<Case> getCas(string mail){
        List<Contact> c=[SELECT Id from Contact where Email=:mail limit 1];
        List<Case> cas=[SELECT Description,Id,SuppliedName,Status from Case where ContactId=:c[0].Id limit 1];
        return cas;
    }
}