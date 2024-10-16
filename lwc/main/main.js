import { LightningElement, track, wire } from 'lwc';
import bgimage from '@salesforce/resourceUrl/pro1';
import prologo from '@salesforce/resourceUrl/prologo';
import tipimage2 from '@salesforce/resourceUrl/tip1';
import tipimage3 from '@salesforce/resourceUrl/tip2';
import tipimage4 from '@salesforce/resourceUrl/tip3';
import tipimage5 from '@salesforce/resourceUrl/tip4';
import video from '@salesforce/resourceUrl/provideo';
import alto from '@salesforce/resourceUrl/alto';
import ev from '@salesforce/resourceUrl/ev';

import nexon from '@salesforce/resourceUrl/nexon';
import safari from '@salesforce/resourceUrl/safari';
import punch from '@salesforce/resourceUrl/punch';
import celerio from '@salesforce/resourceUrl/celerio';

import getProducts from '@salesforce/apex/CarProduct.getProducts';
import videocar from '@salesforce/resourceUrl/videoCar'
import getCarPrice from '@salesforce/apex/CarInformation.getCarPrice';
import IMAGE1 from '@salesforce/resourceUrl/image1';
import IMAGE2 from '@salesforce/resourceUrl/image2';
import IMAGE3 from '@salesforce/resourceUrl/image3';
import IMAGE4 from '@salesforce/resourceUrl/image4';
import IMAGE5 from '@salesforce/resourceUrl/image5';
import IMAGE6 from '@salesforce/resourceUrl/image6';

import loginUser from '@salesforce/apex/LoginFormController.loginUser';
import createAccount from '@salesforce/apex/SignupFormController.createAccount';
import createCase from '@salesforce/apex/CaseCreationController.createCase';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import createLead from '@salesforce/apex/LeadController.createLead';

export default class Main extends LightningElement {
    home = true;
    service = false;
    carsPage = false;
    tdf = false;
    @track signUpForm = false;
    isLogged = false;
    image1 = bgimage;
    logo = prologo;
    image2 = tipimage2;
    image3 = tipimage3;
    image4 = tipimage4;
    image5 = tipimage5;
    videocar = video;
    altos = alto;
    evs = ev;
    nexons = nexon;
    safaris = safari;
    punchs = punch;
    celerios = celerio;
    @track selectedPId='';
    @track selectedEmail='';
    logoutF(){
        this.isLogged=false;
    }
    tdFun() {
        if(this.isLogged==false){
            this.loginS=true;
        }
        else{
 this.proInf = false;
        this.tdf = true;
        }
       
    }
    proBackDis(){
        this.proInf=false;
        this.prodis=true;
    }
    handleTDC() {
        this.proInf = true;
        this.tdf = false;
    }
    signUpFun() {
        this.signUpForm = true;
    }
    closeSignUp(){
        this.signUp=false;
    }
    handleChildClose() {
        this.signUpForm = false;
    }
    // proInfTologinS(){
    //     this.proInf=false;
    //     this.loginS=true;
    // }
    homTOcar() {
        this.home = false;
        this.carsPage = true;
    }
    serFun() {
        this.home = false;
        this.service = true;
    }
    homFun() {
        this.home = true;
        this.carsPage = false;
       
    }
    carList = [
        {
            id: 1,
            name: 'Tata Punch',
            image: "https://imgd.aeplcdn.com/227x128/n/cw/ec/39015/punch-exterior-right-front-three-quarter-54.jpeg?isig=0&q=80"
        },
        {
            id: 2,
            name: 'Tata Safari',
            image: this.safaris
        },
        {
            id: 3,
            name: 'Nexon',
            image: this.nexons
        },
        {
            id: 4,
            name: 'Celerio',
            image: this.celerios
        },
        {
            id: 5,
            name: 'Tata EV',
            image: this.evs
        },
        {
            id: 6,
            name: 'Alto',
            image: this.altos
        },


        {
            id: 7,
            name: 'Tata Avinya',
            image: 'https://s7ap1.scene7.com/is/image/tatamotors/daytona-grey-left-125?$QI-805-404-D$&fit=crop&fmt=png-alpha'
        },
        {
            id: 8,
            name: 'Tata Sierra',
            image: 'https://s7ap1.scene7.com/is/image/tatamotors/home-tigor-test-drive-2?$TT-614-400-D$&fit=crop&fmt=jpg'
        }
    ];

    prodis = true;
    proInf = false;

    @track carId = ' ';
    disTinf(event) {
        console.log('up');
        this.carId = event.target.dataset.id;
        console.log('clicked id is ' + this.carId);
        console.log(this.carName);
        // console.log('clicked id is '+this.carName);

        this.prodis = false;
        this.proInf = true;
        // carName=event.target.dataset.id;

    }
    carProduct
    @wire(getProducts)
    cars({ error, data }) {
        if (data) {
            this.carProduct = data;
            console.log(this.carProduct);
            console.log(this.carName);
            // this.carProduct.forEach(element => {
            //    switch (element.Name) {
            //     case 'Harrier':
            //         element.ImageUrl__c=this.HarrierImage;
            //         break;
            //    case 'Nexon':
            //     element.ImageUrl__c=this.NexonImageurl;
            //     break;
            //     default :
            //         break;
            //    }
            // });
        } else if (error) {
            console.log(error);
        }
    }
    carImageUrl;
    @track carName=''
    productInfo;
    @wire(getCarPrice, { carId: '$carId' })
    carPrice({ error, data }) {
        if (data) {
            console.log('getCarPrice');
            // console.log(carId);

            this.productInfo = data;
            this.selectedPId=data[0].Product2.Id;
            this.carName=data[0].Product2.Name;
            console.log('lkeaocnevhq4ypvq8y'+' '+this.selectedPId+" "+this.productInfo+" "+this.carName);
            console.log(data);
            this.carImageUrl = data[0].Product2.ImageUrl__c;
            // this.carName=this.productInfo[0].Product2.Name;
            // console.log(this.productInfo[0].Product2.Name);

            // console.log(this.productInfo[0].Product2.Description);
            // console.log(this.productInfo.Product2.Name+" "+this.productInfo.UnitPrice+"  "+ data);
        } if (error) {
            console.log('fhowhif');
            console.log(error);
        }
    }



    //car Color Seletction 
    //@track carImageUrl = 'https://s7ap1.scene7.com/is/image/tatamotors/StardustAsh-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';

    @track HarrierImageBlack = 'https://s7ap1.scene7.com/is/image/tatamotors/CosmicGold-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';
    @track HarrierImageWhite = 'https://s7ap1.scene7.com/is/image/tatamotors/StellarFrost-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';
    @track HarrierImageBlue = 'https://s7ap1.scene7.com/is/image/tatamotors/Galacticsapphire-0?$PO-750-500-S$&fit=crop&fmt=webp-alpha';
    imageSectionStyle = '';
    handleColor(event) {
        alert("button got clicked");
        const color = event.target.dataset.color;
        const but = event.target.class;
        console.log(but);
        this.changeImageSectionBackground(color);
        const name = ''
        console.log(color);
        console.log(this.carName);
        let dynamicPropertyName = `${this.carName}ImageBlue`;
        let c = this[dynamicPropertyName];
        console.log('the url of the car is ' + dynamicPropertyName + " and from c is " + c);
        console.log(`check url is ${this.HarrierImageBlue}`);

        if (color == 'black') {
            let dynamicPropertyName = `${this.carName}ImageBlack`;
            let c = this[dynamicPropertyName];
            this.carImageUrl = c;
            console.log("color is black " + " car is " + `${this.carName}` + this.carImageUrl);

        }
        else if (color == 'white') {
            let dynamicPropertyName = `${this.carName}ImageWhite`;
            let c = this[dynamicPropertyName];
            this.carImageUrl = c;
            console.log("color is white " + " car is " + `${this.carName}` + this.carImageUrl);

        }
        else if (color == 'blue') {
            let dynamicPropertyName = `${this.carName}ImageBlue`;
            let c = this[dynamicPropertyName];
            this.carImageUrl = c;
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



    handleColorChange(event) {
        var a = [1, 23]

        const selectedColor = event.currentTarget.dataset.color;
        switch (selectedColor) {

            case 'red':
                console.log(this.NexonImageurl);
                alert('red');
                this.NexonImageurl = this.HarrierRedUrl;
                console.log(this.NexonImageurl);
                break;
            case 'blue':
                this.NexonImageurl = this.HarrierBlueUrl;
                alert('blue');
                console.log('bluecar');
                break;
            case 'black':
                this.NexonImageurl = this.HarrierBlackUrl;
                console.log('black');

                break;
            case 'white':
                this.NexonImageurl = this.HarrierWhiteUrl;
                console.log('white');
                alert('white');

                break;
            default:
                this.NexonImageurl = this.HarrierBlackUrl;
        }

    }

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

    // @track email = '';
    // @track password = '';
    // @track error = '';

    // handleInputChange(event) {
    //     const field = event.target.label;
    //     if (field === 'Email') {
    //         this.email = event.target.value;
    //     } else if (field === 'Password') {
    //         this.password = event.target.value;
    //     }
    // }

    // handleLogin() {
    //     loginUser({ email: this.email, password: this.password })
    //         .then(result => {
    //             if (result) {
    //                 // Login successful
    //                 isLogged=true;
    //                 this.dispatchEvent(
    //                     new ShowToastEvent({
    //                         title: 'Success',
    //                         message: 'Logged in successfully',
    //                         variant: 'success',
    //                     }),
    //                 );
    //                 // Redirect to home page or any desired URL
    //                 window.location.href = '/home/home.jsp'; // Replace with your desired URL
    //             } else {
    //                 // Login failed
    //                 this.error = 'Invalid email or password. Please try again.';
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error logging in:', error);
    //             this.error = 'Error logging in. Please try again later.';
    //         });
    // }

    // login form

    @track email = '';
    @track password = '';
    @track error = '';
    loginS = false;
    login=true;
    signUp = false;
    ep=false;
    homeTlogin() {
        this.loginS = true;
    }
    endToV(){
        this.ep=false;
        this.proInf=true;
        console.log('proinfPage');
    }
    homeTlogin2(){
        if(this.isLogged==false){
            this.loginS=true;
        }
        else{
            this.proInf=false;
            this.ep=true;
        }
    }
    loginToNormal() {
        this.loginS = false;
    }
    handleInputChange1(event) {
        const field = event.target.label;
        if (field === 'Email') {
            this.email = event.target.value;
        } else if (field === 'Password') {
            this.password = event.target.value;
        }
    }

    signFuns() {
        // this.login=false;
        this.signUp = true;
        this.email = '';
        this.password = '';
    }
    @track proData={proEmail:'',proPas:''};
    @track unqemail='';
    handleLogin() {
        loginUser({ email: this.email, password: this.password })
            .then(result => {
                if (result) {
                    // Login successful
                    this.selectedEmail=this.email;
                    this.isLogged=true;
                    this.loginS = false;
                    this.unqemail=this.email;
                    this.proData.proEmail=this.email;
                    this.proData.proPas=this.password;
                    console.log('guddu');
                    this.email='';
                    this.password='';
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Success',
                            message: 'Logged in successfully',
                            variant: 'success',
                        }),
                    );
                    // Redirect to home page or any desired URL
                    // window.location.href = '/home/home.jsp'; // Replace with your desired URL
                } else {
                    // Login failed
                    this.error = 'Invalid email or password. Please try again.';
                }
            })
            .catch(error => {
                console.error('Error logging in:', error);
                this.error = 'Error logging in. Please try again later.';
            });
    }
    @track name = '';
    @track phone = '';
    @track email = '';
    @track password = '';
    @track confirmPassword = '';
    @track gender = '';
    @track age = '';
 
    get genderOptions() {
        return [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Other', value: 'Other' }
        ];
    }
 
    handleInputChangeSign(event) {
        const field = event.target.dataset.id;
        if (field === 'name') {
            this.name = event.target.value;
        } else if (field === 'phone') {
            this.phone = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'password') {
            this.password = event.target.value;
        } else if (field === 'confirmPassword') {
            this.confirmPassword = event.target.value;
        } else if (field === 'gender') {
            this.gender = event.target.value;
        } else if (field === 'age') {
            this.age = event.target.value;
        }
    }
 
    handleSubmitSign() {
        if (this.password !== this.confirmPassword) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Password and Confirm Password must match',
                    variant: 'error',
                }),
            );
            return;
        }
 
        // Validate age
        if (this.age && parseInt(this.age) < 18) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Age must be 18 or older',
                    variant: 'error',
                }),
            );
            return;
        }
 
        const fields = { 
            'Name': this.name, 
            'Email__c': this.email,
            'Phone': this.phone,
            'Password__c': this.password,
            'Gender__c': this.gender, // Custom field API name
            'Age__c': this.age // Custom field API name
        };
 
        createAccount({ accountData: fields })
            .then(() => {
                // Show success alert
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created successfully',
                        variant: 'success',
                    }),
                );
 
                // Clear form fields
                this.name = '';
                this.phone = '';
                this.email = '';
                this.password = '';
                this.confirmPassword = '';
                this.gender = '';
                this.age = '';
 
                // Redirect to home page or any desired URL
                // window.location.href = '/home/home.jsp'; // Replace with your desired URL
                this.signUp=false;
            })
            .catch(error => {
                console.error('Error creating account:', error);
                let errorMessage = 'Unknown error';
                if (error && error.body && error.body.message) {
                    errorMessage = error.body.message;
                } else if (error && error.message) {
                    errorMessage = error.message;
                }
 
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating account',
                        message: errorMessage,
                        variant: 'error',
                    }),
                );
            });
    }


    // get in touch
    @track isModalOpen = false;
    // @track firstName1 = '';
    // @track lastName1 = '';
    // @track company1 = '';
    // @track email1 = '';
    // @track phone1 = '';
    // @track message1 = '';

    openModal() {
        this.isModalOpen = true;
    }

    closeModal() {
        console.log('cloishgoehrgpaoihrwponcpriydrslviycaithviyde;oavi');
        this.isModalOpen = false;
    }

    // handleInputChange(event) {
    //     const field = event.target.dataset.id;
    //     if (field === 'firstName') {
    //         this.firstName1 = event.target.value;
    //     } else if (field === 'lastName') {
    //         this.lastName1 = event.target.value;
    //     } else if (field === 'company') {
    //         this.company1 = event.target.value;
    //     } else if (field === 'email') {
    //         this.email1 = event.target.value;
    //     } else if (field === 'phone') {
    //         this.phone1 = event.target.value;
    //     } else if (field === 'message') {
    //         this.message1 = event.target.value;
    //     }
    // }

    // handleSubmit() {
    //     if (this.validateInputs()) {
    //         const leadData = {
    //             FirstName: this.firstName1,
             
    //             LastName: this.lastName1,
    //             Company: this.company1,
    //             Email: this.email1,
    //             Phone: this.phone1,
    //             Status: 'Open - Not Contacted', // Setting the lead status directly
    //             Description: this.message1
    //         };

    //         createLead({ lead: leadData })
    //             .then(() => {
    //                 this.showToast('Success', 'Lead created successfully', 'success');
    //                 this.closeModal();
    //             })
    //             .catch(error => {
    //                 this.showToast('Error', error.body.message, 'error');
    //             });
    //     } else {
    //         this.showToast('Error', 'Please fill in all required fields', 'error');
    //     }
    // }

    // validateInputs() {
    //     const allValid = [...this.template.querySelectorAll('lightning-input')]
    //         .reduce((validSoFar, inputCmp) => {
    //             inputCmp.reportValidity();
    //             return validSoFar && inputCmp.checkValidity();
    //         }, true);
    //     return allValid;
    // }

    // showToast(title, message, variant) {
    //     const event = new ShowToastEvent({
    //         title: title,
    //         message: message,
    //         variant: variant,
    //     });
    //     this.dispatchEvent(event);
    // }


    //  renderedCallback() {
    //     // Check if Font Awesome already loaded
    //     if (this.fontAwesomeInitialized) {
    //         return;
    //     }
    //     this.fontAwesomeInitialized = true;
 
    //     // Create link element to load Font Awesome
    //     const link = document.createElement('link');
    //     link.rel = 'stylesheet';
    //     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    //     link.crossOrigin = 'anonymous';
 
    //     // Append to the head
    //     document.head.appendChild(link);
    // }

 //contact us case creation

    @track name = '';
    @track email = '';
    @track message = '';

    handleChange(event) {
        const field = event.target.dataset.id;
        if (field === 'name') {
            this.name = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'message') {
            this.message = event.target.value;
        }
    }

    handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission
        createCase({ name: this.name, email: this.email, message: this.message })
            .then(result => {
                this.showToast('Success', result, 'success');
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(event);
    }

    returntoHomeT(){
        this.ep=false;
        this.proInf=true;
    }
}