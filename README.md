# Pre-work - _Memory Game_

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program.

Submitted by: **Jingheng Li**

Time spent: **5** hours spent in total

Link to project: https://glitch.com/edit/#!/tranquil-succulent-equinox 

## Required Functionality

The following **required** functionality is complete:

- [yes] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
- [yes] "Start" button toggles between "Start" and "Stop" when clicked.
- [yes] Game buttons each light up and play a sound when clicked.
- [yes] Computer plays back sequence of clues including sound and visual cue for each button
- [yes] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess.
- [yes] User wins the game after guessing a complete pattern
- [yes] User loses the game after an incorrect guess

The following **optional** features are implemented:

- [yes] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
- [ ] Buttons use a pitch (frequency) other than the ones in the tutorial
- [ ] More than 4 functional game buttons
- [yes] Playback speeds up on each turn
- [yes] Computer picks a different pattern each time the game is played
- [yes] Player only loses after 3 mistakes (instead of on the first mistake)
- [yes] Game button appearance change goes beyond color (e.g. add an image)
  - after adding the images, I was only able to make the image appear when the player clicks the button. When the program shows the clue, images do not appear.
- [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
- [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!
  - Use the :hover selector to change the button's color to red when the mouse is moved over it.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

- Process of winning the game (made 1 mistake)
  ![](https://i.imgur.com/TdRJewI.gif)

- Process of losing the game (used all three chances)
  ![](https://i.imgur.com/GXFEBuw.gif)

## Reflection Questions

1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.

- Resources used when creating the feature of adding image to the button

  - https://www.quora.com/How-do-I-make-an-image-appear-after-a-button-is-clicked-with-css
  - https://codepen.io/WhatTheKit/pen/jbgzNP
  - https://stackoverflow.com/questions/10782054/what-does-the-tilde-squiggle-twiddle-css-selector-mean

- Issues regarding web audio
  
  - https://stackoverflow.com/questions/54110092/problems-with-webaudio

  - Explanation & Confusion: Even though the tutorial provides the code for generating tones, I found that my buttons were not playing sounds when it is tested in the live website, but everything seemed fine when tested in the Glitch IDE along with the codes on the side. I opened the DevTools and found that the error “The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page." appeared multiple times when I run my program in the beginning using the live site link. So I googled it and found there are many posts related to this same error message and in [this stackoverflow post](https://stackoverflow.com/questions/54110092/problems-with-webaudio), it says “This [error] appears to be a consequence of Chrome's new policy” and we need to call resume() to solve this problem. I referenced to the solution given below and moved

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

    After this change, the sound can be properly played in the live website when the clue is called. However, there is no sound played if the player clicks those buttons first without clicking the start button.

    I am not sure if this is the correct way to solve the problem, but I want to address this to see if anyone else has experienced the same, or if there is a better way to solve this.


2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)

One challenge that I encountered when developing the minimum required features for this project is the last part where we need to add the game logic in the guess function. Thanks to the flow chart and the hints provided in the tutorial, I was able to quickly write out nested conditional statements as below:

    if (btn === pattern[progress]) {
      if (guessCounter === progress) {
        if (progress === 7) {
          winGame();
        } else {
          progress += 1;
          playClueSequence();
        }
      } else {
        guessCounter += 1;
      }
    } else {
      loseGame();
    }


Of course it did not go that well. When I tested the program, I found out that the program would consider my right guesses as false and the “You lost” alert would pop out without letting me even finish clicking my pattern. So I went back to those nested conditional statements and analyzed the code. Since “You lost” alert popped up, it means that the first condition of the nested conditional statment was not satisfied and thus it directly jumped to else statement and called *loseGame()* for the “You lost” alert. Looking at `btn === pattern[progress]`, I then realized that I mixed up the variable *progress* with the variable *guessCounter*. *progress* records the current turn that the player is in and *guessCounter* records the number of buttons that the player has clicked correctly in **one** turn. `if(btn === pattern[progress])` compares the last button in the present sequence with the current button the player just entered, which is not what we want. Instead, `pattern[progress]` should be `pattern[guessCounter]` so that the corresponding button in the sequence will be compared with the button that the player just clicked.

In addition, I would also like to discuss one challenge that I encountered when I implemented the optional feature of adding images to the game buttons. After uploading the images into the `assets` folder and adding `<img>` tags into the index.html file, I added the attributes `class="hidden"` and `id="img#"`  inside every `<img>` tag to try to make those images disappear. And then I used `document.getElementById("img"+btn).classList.remove` and `add` functions to remove the  “hidden” attribute from the image tag when the corresponding button is lit up, and add the “hidden” attribute back into the class after. But it didn’t work out. I read through the instructions and noticed that we also need to change the CSS file. I thought about it for quite a while but still couldn’t figure out a way, so I searched it up online and came across [this Quora question](https://www.quora.com/How-do-I-make-an-image-appear-after-a-button-is-clicked-with-css). In the [example](https://codepen.io/WhatTheKit/pen/jbgzNP) shown, it uses “~” CSS selector to implement a similar feature. So I tried that as well, but it didn't work either. I looked further into this “~” (tilde) selector as I didn’t know what this means, so I found [this stackoverflow question](https://stackoverflow.com/questions/10782054/what-does-the-tilde-squiggle-twiddle-css-selector-mean), and one of the responses mentions “other combinators in the family” and gives a few examples with explanation. Then I decided to try use “>” instead of “~” because in the index.html file, each `<img>`tag is nested inside the `<button>`tag, and it worked! By using the “child selector”, the image is able to show up as the player clicks the button. However, I didn’t find a way to make the corresponding images appear as the clues show the sequence of buttons. 


3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)

I am curious to learn what kinds of frameworks are available to use in javaScript and what advantages do frameworks have in web development— do they make web dev more efficient and more accessible? I was also wondering how the back-end and database play a role in web development. Obviously, they are meant for storing data and information but I am curious about the process of developing it. Take Glitch IDE for example, how does the web-based integrated development environment work and how would it be able to host a live site, does it act as a front-end and a back-end developing tool at the same time? I doubt if those questions make any sense but this assignment taught me that it is a totally different story when you create something entirely on your own than writing a few lines of codes to add a component into a web page. 


4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)

If I have a few more hours to work on this project, I would add some more features to make it more complex. For example, I would add a countdown timer, a scoreboard for the player and multiple levels into the game with increasing difficulty. Every time when the player guesses one sequence correctly, a number of points (determined by the difficulty of the sequence pattern) is rewarded, meaning the player doesn’t have to pass the entire level to gain points.  There are still three chances for the player to make a mistake, but when the player guesses a sequence wrong, a certain number of points (determined by the difficulty of the sequence pattern) will also be deducted from the scoreboard. The first five levels would be this basic version of the game with only four buttons, monotones, and increasingly speed up playback;  the following five levels could have six buttons and a even faster speed up clue playback starting from the beginning; and the third following five levels could have two more buttons and tones that sounds more similar so it is hard to differentiate. 


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
