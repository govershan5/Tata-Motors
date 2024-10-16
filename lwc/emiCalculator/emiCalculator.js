import { LightningElement, track, api } from 'lwc';

export default class EmiCalculator extends LightningElement {
    @api price = ''; // Ensure this receives the price from the parent correctly
    @track downPayment = '';
    @track loanAmount = '';
    @track rateOfInterest = '';
    @track tenure = '';
    @track emi = '';
    @track paymentType = ''; // Selected payment type
    @track showEmiCalculator = false; // Flag to show/hide EMI calculator


  //  @api price;
    @api downPayment;
    @api loanAmount;
    @api rateOfInterest;
    @api tenure;
    emi = 0;

    // Define an event to pass all EMI details back to the parent component
    dispatchEmiDetailsEvent() {
    // Log each property just before dispatching the event
    console.log('Dispatching EMI Details Event - Price:', this.price);
    console.log('Dispatching EMI Details Event - Down Payment:', this.downPayment);
    console.log('Dispatching EMI Details Event - Loan Amount:', this.loanAmount);
    console.log('Dispatching EMI Details Event - Rate of Interest:', this.rateOfInterest);
    console.log('Dispatching EMI Details Event - Tenure:', this.tenure);
    console.log('Dispatching EMI Details Event - EMI:', this.emi);

    const event = new CustomEvent('emicalculatedetails', {
        detail: {
            price: this.price,
            downPayment: this.downPayment,
            loanAmount: this.loanAmount,
            rateOfInterest: this.rateOfInterest,
            tenure: this.tenure,
            emi: this.emi
        }
    });
    console.log('Dispatching EMI Details Event:', event.detail); // Double-check the event detail being dispatched
    this.dispatchEvent(event);
}

    // Options for the combo box
    get paymentOptions() {
        return [
            { label: 'One Time Payment', value: 'oneTime' },
            { label: 'Purchase in EMI', value: 'emi' }
        ];
    }

    // Handle change in payment type selection
    handlePaymentTypeChange(event) {
        this.paymentType = event.detail.value;
        // Show EMI calculator section only if "Purchase in EMI" is selected
        this.showEmiCalculator = this.paymentType === 'emi';
        // Reset fields when switching payment types
        if (!this.showEmiCalculator) {
            this.resetFields();
        }
    }

    get computedRateOfInterest() {
        const tenureMonths = parseFloat(this.tenure) || 0;
        
        if (tenureMonths >= 12 && tenureMonths < 24) {
            return 11;
        } else if (tenureMonths >= 24 && tenureMonths < 36) {
            return 12;
        } else if (tenureMonths >= 36 && tenureMonths < 48) {
            return 13;
        } else if (tenureMonths >= 48 && tenureMonths < 60) {
            return 14;
        } else if (tenureMonths >= 60) {
            return 15;
        } else {
            return 0; // Default or fallback rate if no tenure matches
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.id;
        this[field] = event.target.value;

        if (field === 'price' || field === 'downPayment' || field === 'tenure') {
            if (field === 'price' || field === 'downPayment') {
                this.updateLoanAmount();
            }
            this.calculateEMI();
        }
    }

    updateLoanAmount() {
        const price = parseFloat(this.price) || 0;
        const downPayment = parseFloat(this.downPayment) || 0;
        this.loanAmount = (price - downPayment).toString();
        this.dispatchEmiDetailsEvent();
    }

    calculateEMI() {
        const principal = parseFloat(this.loanAmount) || 0;
        const tenure = parseFloat(this.tenure) || 0;

        // Calculate the computedRateOfInterest based on tenure
        if (tenure >= 12 && tenure < 24) {
            this.rateOfInterest = 11;
        } else if (tenure >= 24 && tenure < 36) {
            this.rateOfInterest = 12;
        } else if (tenure >= 36 && tenure < 48) {
            this.rateOfInterest = 13;
        } else if (tenure >= 48 && tenure < 60) {
            this.rateOfInterest = 14;
        } else if (tenure >= 60) {
            this.rateOfInterest = 15;
        } else {
            this.rateOfInterest = 0; // Default or fallback rate if no tenure matches
        }

        const rateOfInterest = this.rateOfInterest;

        if (principal > 0 && rateOfInterest > 0 && tenure > 0) {
            const interestRate = rateOfInterest / 12 / 100;
            const numberOfMonths = tenure;

            const emi = principal * interestRate * (Math.pow(1 + interestRate, numberOfMonths) / (Math.pow(1 + interestRate, numberOfMonths) - 1));
            this.emi = emi.toFixed(2);
        } else {
            this.emi = '0.00';
        }
        this.dispatchEmiDetailsEvent();
        console.log('dispatchEmiDetailsEvent called');
    }

    resetFields() {
        this.price = '';
        this.downPayment = '';
        this.loanAmount = '';
        this.rateOfInterest = '';
        this.tenure = '';
        this.emi = '';
    }
}