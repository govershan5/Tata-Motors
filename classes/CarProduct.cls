public class CarProduct{
    @AuraEnabled(cacheable=true)
    public static List<Product2> getProducts(){
        List<Product2> cars=[select id, Name,ImageUrl__c from Product2 where Description!=null];
        system.debug(cars);
        return cars;
    }
}