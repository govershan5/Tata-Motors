public with sharing class DealerController {
    @AuraEnabled(cacheable=true)
    public static List<String> getStates() {
        Schema.SObjectType dealerType = Schema.getGlobalDescribe().get('Dealer__c');
        Schema.DescribeFieldResult fieldResult = dealerType.getDescribe().fields.getMap().get('State__c').getDescribe();
        List<Schema.PicklistEntry> picklistEntries = fieldResult.getPicklistValues();
        List<String> states = new List<String>();
        for (Schema.PicklistEntry entry : picklistEntries) {
            states.add(entry.getValue());
        }
        return states;
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getCities(String state) {
        List<String> cities = new List<String>();
        
        if (state != null) {
            // Query the City picklist values based on the selected state
            List<Dealer__c> dealers = [SELECT City__c FROM Dealer__c WHERE State__c = :state];
            Set<String> citySet = new Set<String>();

            for (Dealer__c dealer : dealers) {
                citySet.add(dealer.City__c);
            }
            cities.addAll(citySet);
        }
        return cities;
    }

    @AuraEnabled(cacheable=true)
    public static List<Dealer__c> findDealers(String state, String city) {
        return [SELECT Name, Phone__c, Email__c FROM Dealer__c WHERE State__c = :state AND City__c = :city];
    }
}