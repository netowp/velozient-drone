# About
This algorithm chooses the drone with the higher capacity to make sure that it can make as many deliveries with the fewest number of trips as possible. 

Since time and distance does not matter, and the cost of refueling and restocking is the same between all drones, it’s not deploying multiple drones at the same time to make sure the one with the most capacity is always doing more deliveries with the least amount of trips.

The algorithm consists of sorting drones and locations by capacity, in decreasing order. This way, the largest done is selected and it starts a best fit algorithm to make sure each trip will have the least amount of space left as possible. Each new location will trigger a check for existing trips that can fit this delivery leaving as little space as possible. If none is found, it will create a new trip. After that, a reducer is used to transform the arrays of trips into a string following the output guidelines. It will be logged to the terminal.

# How to run it
First of all, you should have NodeJS installed (the version 20.11.0 was used to code this solution). After that, you can run it with the following terminal command:

```
npm start
```

It will use the file `files/Input.txt` as the default input file. If you need to use a different file to run the algorithm, edit the `npm start` script or run:

```
node index.js files/new-file-name.txt
```

Make sure that the file follows the expected input format.

# Technical Dependencies, Libraries and Coding environment

To code this challenge, I used Visual Studio Code and Node version 20.11.0. No external lib was used to parse the input file, so I created a function (inside the `utils.js` file) to transform it into a JavaScript object.