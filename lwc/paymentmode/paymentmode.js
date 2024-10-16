import { LightningElement, track,api } from 'lwc';

export default class PaymentMethod extends LightningElement {
    @track selectedPaymentMethod;
    @track upiId;
    @track cardNumber;
    @track expiryDate;
    @track cvv;
    @track netBankingId;
@api fetched;
    get paymentMethodOptions() {
        return [
            { label: 'UPI', value: 'UPI' },
            { label: 'Credit Card', value: 'CREDIT_CARD' },
            { label: 'Debit Card', value: 'DEBIT_CARD' },
            { label: 'Net Banking', value: 'NET_BANKING' }
        ];
    }

    get isUPI() {
        return this.selectedPaymentMethod === 'UPI';
    }

    get isCreditOrDebitCard() {
        return this.selectedPaymentMethod === 'CREDIT_CARD' || this.selectedPaymentMethod === 'DEBIT_CARD';
    }

    get isNetBanking() {
        return this.selectedPaymentMethod === 'NET_BANKING';
    }

    handlePaymentMethodChange(event) {
        this.selectedPaymentMethod = event.detail.value;
    }

    handleUPIChange(event) {
        this.upiId = event.detail.value;
    }

    handlePaymentChanges(event) {
        const field = event.target.label;
        if (field === 'Card Number') {
            this.cardNumber = event.detail.value;
        } else if (field === 'Expiry Date') {
            this.expiryDate = event.detail.value;
        } else if (field === 'CVV') {
            this.cvv = event.detail.value;
        }
    }

    handleNetBankingChange(event) {
        this.netBankingId = event.detail.value;
    }

   
    goToReviewAndPay() {
        // Check if all card fields are filled
        if (!this.cardNumber || !this.expiryDate || !this.cvv) {
            this.errorMessage = 'Please fill in all card details before proceeding.';
            console.error(this.errorMessage);
            return; // Stop execution if any field is empty
        }

        // If all fields are filled, proceed
        this.dispatchEvent(new CustomEvent('nexts'));
        this.errorMessage = ''; // Clear any previous error
    }
    goToReviewAndPayBanking(){

    }
    @track netBankingId = '';

goToReviewAndPayBanking() {
    // Check if Net Banking ID is filled
    if (!this.netBankingId) {
        this.errorMessage = 'Please enter your Net Banking ID before proceeding.';
        console.error(this.errorMessage);
        return; // Stop execution if the field is empty
    }

    // If all fields are filled, proceed
    this.dispatchEvent(new CustomEvent('nexts'));
    this.errorMessage = ''; // Clear any previous error
}
    goToPreviousStep() {
        this.dispatchEvent(new CustomEvent('back'));
    }
}