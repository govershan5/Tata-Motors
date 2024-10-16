import { LightningElement, wire, track } from 'lwc';
import getProducts from '@salesforce/apex/CarProduct.getProducts';
import videocar from '@salesforce/resourceUrl/videoCar'
import getCarPrice from '@salesforce/apex/CarInformation.getCarPrice';
import IMAGE1 from '@salesforce/resourceUrl/image1';
import IMAGE2 from '@salesforce/resourceUrl/image2';
import IMAGE3 from '@salesforce/resourceUrl/image3';
import IMAGE4 from '@salesforce/resourceUrl/image4';
import IMAGE5 from '@salesforce/resourceUrl/image5';
import IMAGE6 from '@salesforce/resourceUrl/image6';;
import HarrierImageWhite from '@salesforce/resourceUrl/HarrierImageWhite';


export default class ProductDescprtion extends LightningElement {
    prodis = true;
    proInf = false;
HarrierImageWhiteUrl=HarrierImageWhite;
    @track carId = ' ';
    disTinf(event) {
        console.log('up');
        this.carId = event.target.dataset.id;
        console.log('clicked id is ' + this.carId);
        //console.log(this.carName);
        // console.log('clicked id is '+this.carName);
        this.prodis = false;
        this.proInf = true;
        // carName=event.target.dataset.id;

    }
    carProduct
        // @wire(getProducts)
    // cars({ error, data }) {
    //     if (data) {
    //         this.carProduct = data;
    //         console.log(this.carProduct);
    //         console.log(this.carName);
    //         // this.carProduct.forEach(element => {
    //         //    switch (element.Name) {
    //         //     case 'Harrier':
    //         //         element.ImageUrl__c=this.HarrierImage;
    //         //         break;
    //         //    case 'Nexon':
    //         //     element.ImageUrl__c=this.NexonImageurl;
    //         //     break;
    //         //     default :
    //         //         break;
    //         //    }
    //         // });
    //     } else if (error) {
    //         console.log(error);
    //     }
    // }
    productInfo;
     @track carPriceData;
    @track carName;
    @track carPrice;
    @track carImageUrl;

    @wire(getCarPrice,{carId:'$carId'})
    carPrice({ error, data }) {
        if (data) {
                                    //console.log('OUTPUT : ');
 console.log('Received data:', data);
                         const pricebookEntry = data[0];

         
            console.log('Car name:', this.carName);
            console.log('Car price:', this.carPrice);
            console.log('Car image URL:', this.carImageUrl);

        } if(error) {
            console.log('fhowhif');
            console.log(error);
        }
    }

    //car Color Seletction 
    //@track carImageUrl = 'https://s7ap1.scene7.com/is/image/tatamotors/StardustAsh-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';

    @track HarrierImageBlack = 'https://s7ap1.scene7.com/is/image/tatamotors/CosmicGold-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';
  //  @track HarrierImageWhite = 'https://s7ap1.scene7.com/is/image/tatamotors/StellarFrost-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';
    @track HarrierImageBlue = 'https://s7ap1.scene7.com/is/image/tatamotors/Galacticsapphire-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';

    imageSectionStyle = '';
    handleColor(event) {
       
        const color = event.target.dataset.color;
        
        console.log("color is "+color);
        // console.log(this.carName);
        // let dynamicPropertyName = `${this.carName}ImageBlue`;
        // console.log('the url of the car is ' + dynamicPropertyName)
        // let c = dynamicPropertyName;
        console.log('the url of the car is ' + dynamicPropertyName + " and from c is " + c);
        console.log(`check url is ${this.HarrierImageBlue}`);

        if (color == 'black') {
            let dynamicPropertyName = `${this.carName}ImageBlack`;
            let c = this[dynamicPropertyName];

            
        }
        else if (color == 'white') {
            let dynamicPropertyName = `${this.carName}ImageWhite`;
            let c = this[dynamicPropertyName];
            this.carImageUrl = c;
          
        }
        else if (color == 'blue') {
            let dynamicPropertyName = `${this.carName}ImageBlue`;
            let c = this[dynamicPropertyName];
            this.carImageUrl = c;
             alert("button got clicked");
            console.log("color is blue " + " car is " + `${this.carName}` + this.carImageUrl);

        }
        console.log(this.carImageUrl); // Log the URL to ensure it's being updated correctly


    }
    changeImageSectionBackground(color) {
        // Example: Change image-section background color based on color
        switch (color) {
            case 'brown':
                this.imageSectionStyle = 'background-color: #8B7355;';
                break;
            case 'white':
                this.imageSectionStyle = 'background-color: #FFFFFF;';
                break;
            case 'blue':
                this.imageSectionStyle = 'background-color: #1E3A5F;';
                break;
            case 'black':
                this.imageSectionStyle = 'background-color: #000000;';
                break;
            default:

                break;
        }
    }



    // handleColorChange(event) {
    //     var a = [1, 23]

    //     const selectedColor = event.currentTarget.dataset.color;
    //     switch (selectedColor) {

    //         case 'red':
    //             console.log(this.NexonImageurl);
    //             alert('red');
    //             this.NexonImageurl = this.HarrierRedUrl;
    //             console.log(this.NexonImageurl);
    //             break;
    //         case 'blue':
    //             this.NexonImageurl = this.HarrierBlueUrl;
    //             alert('blue');
    //             console.log('bluecar');
    //             break;
    //         case 'black':
    //             this.NexonImageurl = this.HarrierBlackUrl;
    //             console.log('black');

    //             break;
    //         case 'white':
    //             this.NexonImageurl = this.HarrierWhiteUrl;
    //             console.log('white');
    //             alert('white');

    //             break;
    //         default:
    //             this.NexonImageurl = this.HarrierBlackUrl;
    //     }

    // }

    videocarUrl = videocar;
    backgroundVideoUrl = this.videocarUrl;

    get visualforceUrl() {
        // Construct URL of your Visualforce page
        return `/apex/chatBot`;
    }


    resizeIframe() {
        var ele = this.template.querySelector('iframe');
        console.log(ele);

        ele.style.height = "300px ";
    }
  


    images = [IMAGE1, IMAGE2, IMAGE3, IMAGE4, IMAGE5, IMAGE6];
    currentImage = IMAGE1;
    isDragging = false;
    currentIndex = 0;
    startX = 0;
    lastUpdateTime = 0;
    updateInterval = 100;
    startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX;
        this.lastUpdateTime = Date.now();
    }

    onDrag(event) {
        if (this.isDragging) {
            const currentTime = Date.now();
            if (currentTime - this.lastUpdateTime >= this.updateInterval) {
                const deltaX = event.clientX - this.startX;
                if (deltaX > 5) {
                    this.showNextImage();
                    this.startX = event.clientX;
                } else if (deltaX < -5) {
                    this.showPrevImage();
                    this.startX = event.clientX;
                }
                this.lastUpdateTime = currentTime;
            }
        }
    }


    endDrag() {
        this.isDragging = false;
    }

    showNextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
    }

    showPrevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.currentImage = this.images[this.currentIndex];
    }
}