public class CarInformation {
   @AuraEnabled(cacheable=true)
    public static List<Product2> getCars(){
         List<Product2> cars=[SELECT Id, Mileage__c, Name FROM Product2];
        system.debug(cars);
        return cars;
    }
         @AuraEnabled(cacheable=true)
     public static List<PriceBookEntry> getCarPrice(string carId){
                Id customPricebookId = [SELECT Id FROM Pricebook2 WHERE Name = 'Tata Cars Price' LIMIT 1].Id;
                List<PricebookEntry> pricebookEntries = [SELECT Id,Product2.Id,Product2.Name,UnitPrice,Product2.Description,Product2.Mileage__c,Product2.ImageUrl__c
                                                 FROM PricebookEntry
                                                 WHERE Pricebook2Id = :customPricebookId and Product2.Id = :carId limit 1];
         system.debug(pricebookEntries[0].Product2.ImageUrl__c);
         system.debug('sefoiwhofhiwofiosei');
        return pricebookEntries;
}
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProductInfo(string idp){
        List<Product2> pro=[SELECT Id,Price__c,Name from Product2 where Id=:idp];
        return pro;
    }
}