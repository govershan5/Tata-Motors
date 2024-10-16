import { LightningElement, track,api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createTestDriveRecord from '@salesforce/apex/SlotController.createTestDriveRecord';
import { NavigationMixin } from 'lightning/navigation';

export default class TestDriveForm extends NavigationMixin(LightningElement) {
    @track firstName='';
    @track lastName='';
    @track email='';
    @track pincode='';
    @track mobileNumber='';
    @track otp='';
    @track license='';
    @track preferredSlot;
    @track carName;
    @track preferredTime;
    @track agreement = false;
    @track showroomButtonVariant = 'brand';
    @track doorstepButtonVariant = 'neutral';
    @track showForm = true;
@api pname;
    timeOptions = [
        { label: '09:00', value: '09:00' },
        { label: '10:00', value: '10:00' },
        { label: '11:00', value: '11:00' },
        { label: '12:00', value: '12:00' },
        { label: '13:00', value: '13:00' },
        { label: '14:00', value: '14:00' },
        { label: '15:00', value: '15:00' },
        { label: '16:00', value: '16:00' },
        { label: '17:00', value: '17:00' }
    ];

    handleChange(event) {
        const field = event.target.name;
        this[field] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }

    handleShowroomClick() {
        this.showroomButtonVariant = 'brand';
        this.doorstepButtonVariant = 'neutral';
    }

    handleDoorstepClick() {
        this.showroomButtonVariant = 'neutral';
        this.doorstepButtonVariant = 'brand';
    }

    handleSubmit() {
        const fields = {
            name: this.firstName,
            // lastName: this.lastName,
            email: this.email,
            // pincode: this.pincode,
            phone: this.mobileNumber,
            // otp: this.otp,
            license: this.license,
            preferredSlot: this.preferredSlot,
            preferredTime: this.preferredTime,
            carName:this.pname
        };

        createTestDriveRecord({ fields })
            .then(result => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Congratulations, your slot is booked!',
                        variant: 'success'
                    })
                );
                this.clearForm();
                this.showForm = false;
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error',
                        message: 'Error booking your slot: ' + error.body.message,
                        variant: 'error'
                    })
                );
            });
    }

    clearForm() {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.pincode = '';
        this.mobileNumber = '';
        this.otp = '';
        this.license = '';
        this.preferredSlot = '';
        this.preferredTime = '';
        this.agreement = false;
    }

    handleClose() {
        this.dispatchEvent(new CustomEvent('close'));
    }
}