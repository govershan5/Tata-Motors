// import { LightningElement ,api,wire} from 'lwc';
// import getProductInfo from '@salesforce/apex/CarInformation.getProductInfo';
// import getOpId from '@salesforce/apex/OppPro.getOpId';
// import addProduct from '@salesforce/apex/OppPro.addProduct';
// export default class EndPage extends LightningElement {
//     @api messageep;
//     @api messagemail;
//     step="1";
//     one=true;
//     two=false;
//     three=false;
//     four=false;
//     five=false;
//     gPrice=0;
//     gName='';
//     @wire(getProductInfo,{idp:'$messageep'})
//     getP({data,error}){
//         if(data){
//             this.gPrice=data[0].Price__c;
//             this.gName=data[0].Name;
//         }
//         else{
//             console.log("product is not fetched"+error);
//         }
//     }
//     oneto2(){
//         this.one=false;
//         this.two=true;
//         this.step="2";
//     }
//     phoneNumber='';
//     // email='';
//     // phoneNumber='';
//     // price='';
//     // handleInputChanges(event){
//     //     console.log(this.messageep);
//     //     if(event.target.label=="Email Address"){
//     //     this.email=event.target.value;
//     //     }
//     //     if(event.target.label=="Phone Number"){
//     //     this.phoneNumber=event.target.value;
//     //     }
//     //     if(event.target.label=="Price"){
//     //     this.price=event.target.value;
//     //     }        
//     // }
//     goToPaymentMethod(){
//             this.two=false;
//             this.three=true;
//             this.step="3";
//     }
//     cardNumber='';
//     expiryDate='';
//     cvv='';
//     handlePaymentChanges(event){
//         if(event.target.label=="Card Number"){
//             this.cardNumber=event.target.value;
//         }
//         if(event.target.label=="Expiry Date"){
//             this.expiryDate=event.target.value;
//         }
//         if(event.target.label=="CVV"){
//             this.cvv=event.target.value;
//         }
//     }
//     goToReviewAndPay(){
//         this.three=false;
//         this.four=true;
//         this.step="4";
//     }
//     confirmPayment(){
//         this.four=false;
//         this.five=true;
//         this.step="5";
//     }

//     finishOrder() {
//         this.getOpIdAndAddProduct();
//     }
//     oid=''
//     // priceInfo=0;
//     getOpIdAndAddProduct() {
//         getOpId({ email: this.messagemail })
//             .then(data => {
//                 if (data) {
//                     this.oid = data.Id;
//                     // this.priceInfo = data.Price__c;
//                     console.log("getOpId:"+this.oid);
//                     this.getAddProduct();
//                     // return addProduct({ opp: this.oid, pro: this.messageep, p: this.priceInfo });
//                 }
//             })
//             .catch(error => {
//                 console.log("error");
//                 console.log("Error: " + error);
//             });
//             console.log(this.oid+" oppid");
//             console.log(this.messageep+" proId");
//             console.log(this.messagemail+" email");
//             console.log(this.gPrice+" price");
//     }

//     getAddProduct(){
//         alert('button got clicked');
//             addProduct({ opp: this.oid, pro: this.messageep, p: this.gPrice })
//         .then(data => {
//             if (data) {
//                 console.log(data);
//                         alert('button got clicked from data');

//                 console.log("data is inserted");

//             }
//         })
//         .catch(error => {
//                     alert('button got clicked from error');

//             console.error("Error adding product:", error);
        
//         });
//     }

// }



import { LightningElement, api, wire, track } from 'lwc';
import getProductInfo from '@salesforce/apex/CarInformation.getProductInfo';
import getOpId from '@salesforce/apex/OppPro.getOpId';
import addProduct from '@salesforce/apex/OppPro.addProduct';
import getAccId from '@salesforce/apex/OppPro.getAccId';
import payObject from '@salesforce/apex/PaymentHandler.payObject';
export default class EndPage extends LightningElement {
    @api messageep;
    @api messagemail;
    @track step = "1";
    @track one = true;
    @track two = false;
    @track three = false;
    @track four = false;
    @track five = false;
    @track gPrice = 0;
    @track gName = '';
    @track oid = '';
    @track orderNumber = '123456'; // Placeholder for order number
    @track cardNumber = '';
    @track expiryDate = '';
    @track cvv = '';
    @track phoneNumber = '';
    cstep = Number(this.step);

    sone(event) {
        if (this.cstep >= 1) {
            this.step = "1";
            this.cstep = Number(this.step);
            this.one = true;
            this.two = false;
            this.three = false;
            this.four = false;
            this.five = false;
        }
    }

    stwo(event) {
        if (this.cstep >= 2) {
            this.step = "2";
            this.cstep = Number(this.step);
            this.one = false;
            this.two = true;
            this.three = false;
            this.four = false;
            this.five = false;
        }
    }

    sthree(event) {
        if (this.cstep >= 3) {
            this.step = "3";
            this.cstep = Number(this.step);
            this.one = false;
            this.two = false;
            this.three = true;
            this.four = false;
            this.five = false;
        }
    }

    sfour(event) {
        if (this.cstep >= 4) {
            this.step = "4";
            this.cstep = Number(this.step);
            this.one = false;
            this.two = false;
            this.three = false;
            this.four = true;
            this.five = false;
        }
    }

    sfive(event) {
        if (this.cstep >= 5) {
            this.step = "5";
            this.cstep = Number(this.step);
            this.one = false;
            this.two = false;
            this.three = false;
            this.four = false;
            this.five = true;
        }
    }

    @wire(getProductInfo, { idp: '$messageep' })
    getP({ data, error }) {
        if (data) {
            this.gPrice = data[0].Price__c;
            this.gName = data[0].Name;
        } else if (error) {
            console.error("Error fetching product info:", error);
        }
    }

//    @wire(getAccId,{email:this.messagemail})
//    getAcc({data,error}){
//        if(data){
//            //this.accName=data.Name;
//            console.log('OUTPUT : ',data);
//        }
//        else if(error){
//            console.error(error);
//        }
//    }
    oneto2() {
        this.one = false;
        this.two = true;
        this.step = "2";
        this.cstep = Number(this.step);
    }

    goToPaymentMethod() {
        this.two = false;
        this.three = true;
        this.step = "3";
        this.cstep = Number(this.step);
       // this.handleEmiDetails(event);
    }
    back3(){
        this.three=false;
        this.two=true;
        this.step="2";
        this.cstep=Number(this.step);
    }
    handlePaymentChanges(event) {
        if (event.target.label === "Card Number") {
            this.cardNumber = event.target.value;
        }
        if (event.target.label === "Expiry Date") {
            this.expiryDate = event.target.value;
        }
        if (event.target.label === "CVV") {
            this.cvv = event.target.value;
        }
    }
    cback(){
        this.dispatchEvent(new CustomEvent('endback'));
        // this.dispatchEvent(new CustomEvent('endback'));
        console.log('endpageCE');
    }
    goToReviewAndPay() {
        this.three = false;
        this.four = true;
        this.step = "4";
        this.cstep = Number(this.step);
    }

    confirmPayment() {
        this.four = false;
        this.five = true;
        this.step = "5";
        this.cstep = Number(this.step);
    }

    finishOrder() {

        this.getOpIdAndAddProduct();
        // this.returntoH();
    }
    homFun(){
        this.dispatchEvent(new CustomEvent('returnH'));
    }

 // Assuming this attribute is passed from the parent component

    @track accountName;
    @track error;
@track accId;
    // Wire the Apex method to a property so it gets called automatically
    // when messagemail value changes or component is initialized.
    @wire(getAccId, { email: '$messagemail' })
    wiredAccount({ error, data }) {
        if (data) {
            this.accId=data.Id;
            this.accountName = data.Name;
            this.error = undefined; // Clear any previous errors
            console.log('Account Name retrieved:', this.accountName);
        } else if (error) {
            this.error = error;
            this.accountName = undefined; // Clear account name if error occurs
            console.error('Error retrieving account:', error);
        }
    }
    getOpIdAndAddProduct() {
        getOpId({ email: this.messagemail })
            .then(data => {
                if (data) {
                    this.oid = data.Id;
                    console.log("getOpId: " + this.oid);
                    return this.getAddProduct();
                }
            })
            .catch(error => {
                console.error("Error getting Opportunity ID:", error);
            });
    }

    getAddProduct() {
        alert('Adding product...');
        addProduct({ opp: this.oid, pro: this.messageep, p: this.gPrice })
            .then(data => {
                if (data) {
                    console.log("Product added:", data);
                    alert('Product added successfully');
                    this.setPaymentRecord();
                }
            })
            .catch(error => {
                alert('Error adding product');
                console.error("Error adding product:", error);
            });
    }


    goToPreviousStep() {
        if (this.step === "2") {
            this.step = "1";
            this.one = true;
            this.two = false;
        } else if (this.step === "3") {
            this.step = "2";
            this.two = true;
            this.three = false;
        } else if (this.step === "4") {
            this.step = "3";
            this.three = true;
            this.four = false;
        } else if (this.step === "5") {
            this.step = "4";
            this.four = true;
            this.five = false;
        }
        this.cstep = Number(this.step);
    }
    emiDetails = {};


  

    // Event handler to receive all EMI details from child component

    handleEmiDetails(event) {
        // Extract emiDetails from event.detail
        this.emiDetails = event.detail;

        // Update component properties with received details
        this.price = this.emiDetails.price;
        this.downPayment = this.emiDetails.downPayment;
        this.loanAmount = this.emiDetails.loanAmount;
        this.rateOfInterest = this.emiDetails.rateOfInterest;
        this.tenure = this.emiDetails.tenure;
        this.emi = this.emiDetails.emi;
        //this.setPaymentRecord();

        // Log received details and updated properties for debugging
        console.log(' handleEmiDetails EMI Details:', this.emiDetails);
        console.log('handleEmiDetails Price:', this.price);
        console.log(' handleEmiDetails Down Payment:', this.downPayment);
        console.log(' handleEmiDetails Loan Amount:', this.loanAmount);
        console.log('handleEmiDetails Rate of Interest:', this.rateOfInterest);
        console.log('handleEmiDetails Tenure:', this.tenure);
        console.log('handleEmiDetails EMI:', this.emi);
    }
setPaymentRecord(){
        payObject({interestRate:this.interestRate,downpayment:this.downPayment,
         emi:this.emi,paymenttype:'EMI',totalAmount:this.price,accid:this.accId}).then(data=>{
             if(data){
                 console.log('done');
             }
             else{
                 console.log('OUTPUT : ',error);
             }
         })
               }

}