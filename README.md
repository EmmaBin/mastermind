# Mastermind Game

Mastermind is a code-breaking game played against the computer. Players can choose from three difficulty levels to guess a combination of 4, 5, or 6 numbers.


## Technologies Used

- JavaScript
- React
- CSS
- Jest

## Features

- Guess Field and Previous Hints
- Visual Cues for Remaining Rounds
- Input Error Handling
- Restart Game Option
- Game Instruction
- Three Difficulty Levels(extension)
- Track Least Time Used to win a game at each difficulty level(extension)
- Testing with Jest

## Future Improvements
- Display Game Result with Popup
- Visual Representation using Pegs instead of numbers
- Transition to a full-stack application with a backend data persistence

## To run the code
- Download this repository
- ``` npm install```
- ``` npm start```
- Go to http://localhost:3000/ in your browser

## Thought Process

Upon receiving this challenge, my initial thought was to think about the tech stacks I wanted to use and outline the MVP version I aimed to build. Initially, I thought about building a command line program with Python. However, considering the potential for more user interactions, I decided to leverage my ongoing coursework from React.gg and practice my React skills. In the end, I opted for JS+React as my chosen tech stack.


For the MVP, I followed instructions to create a guessing field, provide feedback, and display results at the end. Utilizing React allowed me to maintain state values across different components. I encountered some challenges during this phase, particularly regarding whether to use controlled or uncontrolled forms and determining the appropriate placement of certain state values within components.

After doing some research and careful consideration, I chose to use uncontrolled forms to store user guesses and put the state closest to its respective component, rather than consolidating all state values in the parent component. This minimized the amount of state and props being passed around between components. 


Upon completing the MVP, I incorporated two additional extension features: different difficulty levels and tracking the best time to win a game at each difficulty level. I utilized state values to store the user's choice and passed them down as parameters to the API URL. For tracking the least time used, I leveraged localStorage to persist the information. During this phase, I encountered various considerations, such as determining the factors that start and stop the timer and cleaning up timers to ensure the timer functioned accurately.


Overall, completing this project brought me a sense of fulfillment. I dedicated myself to refining the code within the given timeframe, including features such as displaying "Loading" during the fetching of secret codes and highlighting selected difficulty levels.
Although there are additional features I would have liked to incorporate, I made the most of my time since I was in the middle of the trip to visit my family. I'm proud to say that my ability to manage multitasking projects has improved considerably. 



## Game Overview

![Game Overview](/src/images/mastermind_overview.png)
![Game Instruction](/src/images/game_rule.png)
![Wining a game](/src/images/game_win.png)


## About Me

[Portfolio](https://www.emmacancode.com/)