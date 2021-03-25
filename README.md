# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Jingheng Li**

Time spent: **5** hours spent in total

Link to project: https://glitch.com/edit/#!/tranquil-succulent-equinox (insert your link here, should start with https://glitch.com...)

## Required Functionality

The following **required** functionality is complete:

* [yes] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [yes] "Start" button toggles between "Start" and "Stop" when clicked. 
* [yes] Game buttons each light up and play a sound when clicked. 
* [yes] Computer plays back sequence of clues including sound and visual cue for each button
* [yes] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [yes] User wins the game after guessing a complete pattern
* [yes] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [yes] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [yes] Playback speeds up on each turn
* [yes] Computer picks a different pattern each time the game is played
* [yes] Player only loses after 3 mistakes (instead of on the first mistake)
* [yes] Game button appearance change goes beyond color (e.g. add an image)
  - after adding the images, I was only able to make the image appear when the player clicks the button. When the program shows the clue, images do not appear.
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!
  - Use the :hover selector to change the button's color to red when the mouse is moved over it.

## Video Walkthrough

Here's a walkthrough of implemented user stories:
* Process of winning the game (made 1 mistake)
![](https://i.imgur.com/TdRJewI.gif)

* Process of losing the game (used all three chances)
![](https://i.imgur.com/GXFEBuw.gif)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
[YOUR ANSWER HERE]
* Resources used when developing **Spruce up your bottons** part
  * After adding images in HTML, I added "hidden" into the class of each of the images' tags to try to make them disappear. And then I used document.getElementById("button"+btn).classList.remove and add function to try to remove and add “hidden” from and into the class but it didn’t work out. So I googled this problem and came across [this Quora question](https://www.quora.com/How-do-I-make-an-image-appear-after-a-button-is-clicked-with-css). In the [example](https://codepen.io/WhatTheKit/pen/jbgzNP) shown, it uses “~” selector to implement this feature. So I tried that as well, but it didn't work either. I looked further into this “~” (tilde) selector as I didn’t know what this means, so I found this [stackoverflow question](https://stackoverflow.com/questions/10782054/what-does-the-tilde-squiggle-twiddle-css-selector-mean), one of the responses mentions “other combinators in the family” and I found that I should use “>” instead of “~” because image is included inside the button, and it worked! This selector is called the “child selector”.

* Issues regarding web audio
  * Even though the tutorial provides the code for generating tones, I found that my button was not playing sound when it is tested in the live website, but everything was fine when tested in Glitch.com along with the codes on the side. I opened the DevTools and found that the error “The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page." appeared multiple times in the beginning when I run my program using the live site link. So I googled it and found there are many posts related to this issue and in [this stackoverflow post](https://stackoverflow.com/questions/54110092/problems-with-webaudio), it says “This [error] appears to be a consequence of Chrome's new policy” and we need to call resume() to solve this problem. I referenced to the solution given below and moved
  
        context = new AudioContext();
        o = context.createOscillator()
        g = context.createGain()
        g.connect(context.destination)
        g.gain.setValueAtTime(0,context.currentTime)
        o.connect(g)
        o.start(0)
      
      into an if statement in the function playTone(btn,len) so the function becomes:

        function playTone(btn,len){ 
        if (!context)
        {
        context = new AudioContext();
        o = context.createOscillator()
        g = context.createGain()
        g.connect(context.destination)
        g.gain.setValueAtTime(0,context.currentTime)
        o.connect(g)
        o.start(0)
        }
        ...
        

After this change, the sound can be properly played in the live website when the clue is called. However, there is no sound if the player clicks those buttons first without clicking the start button. 

I am not sure if this is an issue or if I just messed up my code somehow, but I want to address this issue to see if any other has experienced the same, or if there is a better way to solve this.


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 

I didn’t encounter any big challenge when developing those required steps for this project as the tutorial is detailed and straightforward. However, I did encounter some challenges when I was developing those optional features. Specifically in the “Spruce up your buttons” part, as I’ve stated above in question 1, I was not able to make an image appear when the player clicks it. I solved it by consulting some posts online and found the solution using a child selector. But I still couldn’t make the image appear when the clue calls the corresponding button. 

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 

In the minimum requirements of the project, the pattern is set in the beginning. I was wondering if this array of patterns is constant, why not make the array of patterns a global constant. Besides this, I was also wondering how to use frameworks in javaScript to make web development more efficient, and if there is any drawback of using javaScript, what’s the tradeoff and if there is a better alternative.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I have a few more hours to work on this project, I would make it a game with multiple levels, each level has increasing difficulty. For example, the first level would be this basic version of the game with only four buttons and monotones, the second level could have six buttons and a faster playback speed starting from the beginning, and the third level could have even more buttons and tones that sound closer to each other so it is hard to differentiate.



## License

    Copyright [Jingheng Li]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
