import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //  originalText: string = "Hello, Everyone!";
  // scrambledText: string = "";
  // scrambleInterval: any;

  // constructor() { }

  // ngOnInit(): void {
  //   this.scrambleText();
  //   this.scrambleInterval = setInterval(() => {
  //     this.scrambleText();
  //   }, 100); // Adjust the interval as needed
  // }

  // scrambleText() {
  //   const originalArray = this.originalText.split('');
  //   const scrambledArray = this.scrambledText.split('');
  //   let revealed = 0;
  //   for (let i = 0; i < originalArray.length; i++) {
  //     if (scrambledArray[i] !== originalArray[i]) {
  //       scrambledArray[i] = originalArray[i];
  //       revealed++;
  //     }
  //   }
  //   this.scrambledText = scrambledArray.join('');
  //   if (revealed === originalArray.length) {
  //     clearInterval(this.scrambleInterval);
  //   }
  // }

  //Another way

  // originalText: string = 'Hello, Everyone!';
  // scrambledText: string = '';
  // revealIndices: number[] = [];
  // currentIndex: number = 0;
  // revealInterval: any;

  // constructor() {}

  // ngOnInit(): void {
  //   this.scrambleText();
  //   this.revealInterval = setInterval(() => {
  //     this.revealCharacter();
  //   }, 100); // Adjust the interval as needed
  // }

  // scrambleText() {
  //   const textArray = this.originalText.split('');
  //   this.scrambledText = textArray.map(() => '_').join('');
  //   const length = textArray.length;
  //   while (this.revealIndices.length < length) {
  //     const randomIndex = Math.floor(Math.random() * length);
  //     if (!this.revealIndices.includes(randomIndex)) {
  //       this.revealIndices.push(randomIndex);
  //     }
  //   }
  // }

  // revealCharacter() {
  //   if (this.currentIndex < this.revealIndices.length) {
  //     const index = this.revealIndices[this.currentIndex];
  //     const textArray = this.scrambledText.split('');
  //     textArray[index] = this.originalText[index];
  //     this.scrambledText = textArray.join('');
  //     this.currentIndex++;
  //   } else {
  //     clearInterval(this.revealInterval);
  //   }
  // }

  originalText: string = 'Hello, Everyone!';
  scrambledText: string = '';
  specialCharacters: string[] = ['#', '@', '!', '$', '%', '*'];
  revealIndices: number[] = [];
  revealIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.startAnimation();
  }

  startAnimation() {
    this.scrambleText();
    this.revealCharacter();
  }

  scrambleText() {
    const textArray = this.originalText.split('');
    const specialCharIndex = Math.floor(
      Math.random() * this.specialCharacters.length
    );
    const specialChar = this.specialCharacters[specialCharIndex];
    this.scrambledText = textArray.map(() => specialChar).join('');
    const length = textArray.length;
    this.revealIndices = [];
    while (this.revealIndices.length < length) {
      const randomIndex = Math.floor(Math.random() * length);
      if (!this.revealIndices.includes(randomIndex)) {
        this.revealIndices.push(randomIndex);
      }
    }
  }

  revealCharacter() {
    const index = this.revealIndices[this.revealIndex];
    if (index !== undefined) {
      const textArray = this.scrambledText.split('');
      textArray[index] = this.originalText[index];
      this.scrambledText = textArray.join('');
      this.revealIndex = (this.revealIndex + 1) % this.revealIndices.length;
      setTimeout(() => {
        this.revealCharacter(); // Continue animating recursively
      }, 100); // Adjust the interval as needed
    } else {
      this.startAnimation(); // Restart the animation
    }
  }
}
