import { LightningElement,track } from 'lwc';
import bgVideo from '@salesforce/resourceUrl/bgVideo';

export default class DemoVideo extends LightningElement {
 url=bgVideo;
 @track carDetails = [
    {
      id: 1,
      name: 'Car 1',
      description: 'Details about Car 1. Include features, specifications, and any other relevant information.',
      imageUrl: 'https://s7ap1.scene7.com/is/image/tatamotors/TornadoBlue-0-3?$PO-750-500-S$&fit=crop&fmt=webp-alpha', // Replace with your image URL
      class: 'left-image'
    },
    {
      id: 2,
      name: 'Car 2',
      description: 'Details about Car 2. Include features, specifications, and any other relevant information.',
      imageUrl: 'https://s7ap1.scene7.com/is/image/tatamotors/TornadoBlue-0-3?$PO-750-500-S$&fit=crop&fmt=webp-alpha', // Replace with your image URL
      class: 'right-image'
    },
    {
      id: 3,
      name: 'Car 3',
      description: 'Details about Car 3. Include features, specifications, and any other relevant information.',
      imageUrl: 'https://s7ap1.scene7.com/is/image/tatamotors/TornadoBlue-0-3?$PO-750-500-S$&fit=crop&fmt=webp-alpha', // Replace with your image URL
      class: 'left-image'
    }
  ];

 
@track textClass = 'hidden';

      imageUrl='https://s7ap1.scene7.com/is/image/tatamotors/TornadoBlue-0-3?$PO-750-500-S$&fit=crop&fmt=webp-alpha'// Replace with your image URL

handleMouseEnter() {
        this.textClass = 'visible';
    }

    handleMouseLeave() {
        this.textClass = 'hidden';
    }

}