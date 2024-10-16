import { LightningElement, track } from 'lwc';
import qrcodeLibrary from '@salesforce/resourceUrl/qrcodeLibrary';
import { loadScript } from 'lightning/platformResourceLoader';

export default class DemoBarcode extends LightningElement {
    @track qrCodeStyle = 'display: block;';
    @track expiredMessageStyle = 'display: none;';
    amount = 700000;
    @track timer = '50:00';
    countdownInterval;

    renderedCallback() {
        if (!this.qrCodeGenerated) {
            this.qrCodeGenerated = true;
            this.loadQRCodeLibrary();
            this.startCountdown();
        }
    }

    loadQRCodeLibrary() {
        loadScript(this, qrcodeLibrary)
            .then(() => {
                this.generateQRCode();
            })
            .catch(error => {
                console.error('Error loading QRCode library', error);
            });
    }

    generateQRCode() {
        const qrCodeElement = this.template.querySelector('.qrcode');
        if (typeof QRCode !== 'undefined') {
            new QRCode(qrCodeElement, {
                text: `upi://pay?pa=choumiya18@ibl&pn=V Choumiya&tn=Payment for Purchasing Car&am=${this.amount}&cu=INR`,
                width: 200,
                height: 200,
            });
        } else {
            console.error('QRCode function is not available');
        }
    }

    startCountdown() {
        let timeLeft = 300; // 5 minutes in seconds
        this.countdownInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(this.countdownInterval);
                this.qrCodeStyle = 'display: none;';
                this.expiredMessageStyle = 'display: block;';
            } else {
                const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
                const seconds = String(timeLeft % 60).padStart(2, '0');
                this.timer = `${minutes}:${seconds}`;
                timeLeft--;
            }
        }, 1000);
    }
    goToReviewAndPay() {
        this.dispatchEvent(new CustomEvent('nexts'));
        
    }
}