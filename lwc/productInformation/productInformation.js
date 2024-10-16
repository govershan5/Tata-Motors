// import { LightningElement,wire } from 'lwc';
// import getCarPrice from '@salesforce/apex/CarInformation.getCarPrice';
// export default class ProductInformation extends LightningElement {
//     carImageUrl;
//     carName
//     productInfo;
//     @wire(getCarPrice,{carId:'01tdL000004xk8fQAA'})
//     carPrice({ error, data }) {
//         if (data) {
//                                     console.log('OUTPUT : ');

//             console.log('getCarPrice from hello',data);
//             // console.log(carId);

//             // this.carName=data.Product2.Name;

//         } if(error) {
//             console.log('fhowhif');
//             console.log(error);
//         }
//     }

// }