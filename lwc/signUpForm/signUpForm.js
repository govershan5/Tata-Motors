import { LightningElement, track,api } from 'lwc';
import createAccount from '@salesforce/apex/SignupFormController.createAccount';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
export default class SignupForm extends LightningElement {
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
 
    handleInputChange(event) {
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
 
    handleSubmit() {
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
                this.closeForm();
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
    closeForm() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }   
    reset(){
        const reset=new CustomEvent('reset');
        this.dispatchEvent(reset);
    }
}