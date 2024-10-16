public class PaymentHandler {
	@AuraEnabled
    public static void payObject(Integer interestRate,Integer downpayment,
                                 Integer emi,String paymenttype,Integer totalAmount,Id accid){
                                     //
Payment p=new Payment();
p.Interest_Rate__c=interestRate;
p.Payment_Method__c='Credit Card';
p.DownPayment__c=downpayment;
p.Emi_Monthly__c=emi;
p.Status='Processed';
p.TypeofPayment__c=paymenttype;
p.Amount=totalAmount;
p.AccountId=accid;
p.Type='Sale';
p.ProcessingMode='External';
                                     
                                     insert p;

        
    }
}