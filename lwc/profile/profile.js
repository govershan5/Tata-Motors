import { LightningElement, track,wire,api } from 'lwc';
import getProducts from '@salesforce/apex/ProRec.getProducts';
import getPro from '@salesforce/apex/AccountRec.getPro';
import getCas from '@salesforce/apex/AccountRec.getCas';
import getOrders from '@salesforce/apex/OrderHistory.getOrders';
import getOpId from '@salesforce/apex/OrderHistory.getOpId';
import getTestRecords from '@salesforce/apex/TestDriveRecords.getTestRecords';
const columnC=[
    {label:'Id',fieldName:'Id',type:'text'},
    {label:'Status',fieldName:'Status',type:'text'},
    {label:'Discription',fieldName:'Discription',type:'text'},
    {label:'SuppliedName',fieldName:'SuppliedName',type:'text'}
]
const columnP=[
    {label:'Image',fieldName:'ImageUrl__c',type:'Image'},
    {label:'Name',fieldName:'Name',type:'text'},
    {label:'Mileage',fieldName:'Mileage',type:'text'},
    {label:'Product Description',fieldName:'Product Description',type:'text'}
]
const columns = [
    { label: 'Unit Price', fieldName: 'UnitPrice', type: 'currency' },
    { label: 'Product Name', fieldName: 'Product2Name', type: 'text' },
    {
        label: 'Product Image',
        fieldName: 'ProductImageUrl',
        type: 'image',
        typeAttributes: { height: '50', width: '50', alt: { fieldName: 'Product2Name' } }
    }
];

const columnd=[
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Preferred slot', fieldName: 'Preferred_Slot__c', type: 'text' },
    { label: 'Time',fieldName:'Time__c',type:'Time'},
    { label: 'Phone',fieldName:'Phone__c',type:'number'},
]

import Profile from '@salesforce/resourceUrl/profile';
export default class ProfileMenu extends LightningElement {
    @api message;
    @api uemail;
    @track isDropdownVisible = false;
    parent=true;
    pf=false;
    cas=false;
    pro7=false;
    pro=Profile;
    tdv=false;
    tdfun(){
        this.parent=false;
        this.tdv=true;
    }
    tdToH(){
        this.parent=true;
        this.tdv=false;
    }
    // email=this.message.proEmail;
    // console.log(email);
    // @track
    // imarr={x:["https://imgd.aeplcdn.com/370x208/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-71.jpeg?isig=0&q=80"]};
    @track userName = '';
    @track userTitle = '';
    @track userEmail = 'john.doe@example.com';
    @track userPhone = '+1 (555) 123-4567';
    @track userGender='';
    @wire(getPro,{mail:'$uemail'})
    wiredPro({data,error}){
        if(data){
            console.log(this.uemail+' oooooooooooooooooooooooooooooooooooooooooooooooooo');
            this.userName=data[0].Name;
            this.userEmail=data[0].Email__c;
            this.userPhone=data[0].Phone;
            this.userGender=data[0].Gender__c;
            console.log('owaiehfonhwact4u3ybv3qiyg f;oq w4b;c5gbyz;cigy');

        }
        if(error){
            console.log(email+'sefwkengpiu');
            console.log(error);
        }
    }
    checkCon=false;
    cases;
    columnC=columnC;
    columns=columns;
    @wire(getCas,{mail:'$uemail'})
    getCases({data,error}){
        if(data){
            console.log(data+'hoaiehcbgoiseuecrukbt');
            // console.log('OUTPUT : ',this.message.proEmail);
            this.checkCon=true;
            this.cases=data;

        }
        else{
            this.checkCon=true;
            console.error('error in fetching cases',error);
        }
    }
columnP=columnP;
    product=[];
    checkPro=false;
    oppId=''
    @wire(getOrders,{mail:'$uemail'})
    wiregetOppId({data,error}){
        if(data){
            this.product=data.map(item => ({
                ...item,
                Product2Name: item.Product2.Name,
                ProductImageUrl: item.Product2.ImageUrl__c
            }));
            
            
            // data;
            this.checkPro=true;
            console.log('OUTPUT : ',data,' ',this.uemail);
        }
        else{
            this.checkPro=true;
        console.log('error not getting opid'+error);
        }
    }
   testDrive=[];
   checktd=false;
   columnd=columnd;
   @wire(getTestRecords,{email:'$uemail'})
   wiregetTestRec({data,error}){
       if(data){
           this.checktd=true;
           console.log(data+'ddddddddddddddddddddddddddddddddd');
           this.testDrive=data;
       }
       else{
           console.log('eeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrroooooooooooooooooooooorrrrrrrrrrrrrrrrrrr');
           this.checktd=true;
           console.log('error not getting opid'+error);
       }
   }


    get dropdownClass() {
        return this.isDropdownVisible ? 'dropdown-menu show' : 'dropdown-menu';
    }

    toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
    }
    profun(){
        this.parent=false;
        this.pf=true;
    }
    pfToH(){
        this.parent=true;
        this.pf=false;
    }
    casfun(){
        this.parent=false;
        this.cas=true;
    }
    productfun(){
        this.parent=false;
        this.pro7=true;
    }
    casToH(){
        this.parent=true;
        this.cas=false;
    }
    proToH(){
        this.parent=true;
        this.pro7=false;
    }
    logout1(){
        this.dispatchEvent(new CustomEvent('logout'));
    }
}