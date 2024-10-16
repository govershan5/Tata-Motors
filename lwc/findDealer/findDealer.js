import { LightningElement, track, wire } from 'lwc';
import getStates from '@salesforce/apex/DealerController.getStates';
import getCities from '@salesforce/apex/DealerController.getCities';
import findDealers from '@salesforce/apex/DealerController.findDealers';

export default class FindDealer extends LightningElement {
    @track stateOptions = [];
    @track cityOptions = [];
    @track selectedState = '';
    @track selectedCity = '';
    @track dealers = [];
    @track errorMessage = '';

    // Fetch states using wire service
    @wire(getStates)
    wiredStates({ error, data }) {
        if (data) {
            this.stateOptions = data.map(state => {
                return { label: state, value: state };
            });
        } else if (error) {
            console.error(error);
        }
    }

    // Handle state selection change
    handleStateChange(event) {
        this.selectedState = event.detail.value;
        this.cityOptions = [];
        this.selectedCity = '';

        // Fetch cities based on selected state
        getCities({ state: this.selectedState })
            .then(data => {
                this.cityOptions = data.map(city => {
                    return { label: city, value: city };
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    child1b(){
        // this.dispatchEvent(new CustomEvent('back1child'));
        console.log('emiback');
        this.dispatchEvent(new CustomEvent('back1child'));
    }
    // Handle city selection change
    handleCityChange(event) {
        this.selectedCity = event.detail.value;

        // Fetch dealers based on selected state and city
        if (this.selectedCity) {
            findDealers({ state: this.selectedState, city: this.selectedCity })
                .then(data => {
                    this.dealers = data;
                    this.errorMessage = ''; // Clear any previous error messages
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    // Handle next button click
    selected() {
        // Check if both state and city are selected
        if (this.selectedState && this.selectedCity) {
            this.dispatchEvent(new CustomEvent('dealers'));
            this.errorMessage = ''; // Clear any previous error messages
        } else {
            this.errorMessage = 'Please select both State and City before proceeding.';
        }
    }

    // Determine if Next button should be disabled
    get isNextDisabled() {
        return !(this.selectedState && this.selectedCity);
    }

    // Handle back button click
    goToPreviousStep() {
        // Perform any necessary actions when going back
    }
}