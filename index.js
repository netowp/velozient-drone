/* 
  The solution

  This algorithm choses 
*/

const fileArg = process.argv.slice(2)?.[0] || 'files/Input.txt';
const { sortByWeightDecreasing, parseWeightToNumber, readFileAsync } = require('./utils');

/**
 * Description
 * @param {array} drones - A list of drones and the weight they can transport
 * @param {array} locations - A list of locations and the weight they expect to be delivered
 * @returns {string} - A string with the expected output format.
 */
const bestFitDecreasing = (drones, locations) => {
  let [largestDrone] = drones.sort(sortByWeightDecreasing);
  let locationsSorted = locations.sort(sortByWeightDecreasing);

  const maxDroneWeight = largestDrone[1];

  let trips = [];

  const addToBestFit = (newLocation) => {
    trips = trips.sort((a, b) => (a.remaining < b.remaining) ? -1 : 1)

    /* 
      Finds the index of the best trip that can actually fit this location's weight.
      It means that it will add this to the trip that will have the least amount
      of weight left. 
    */
    let existingFittingTrip = trips.findIndex(trip => trip.remaining >= newLocation[1]);

    if (existingFittingTrip > -1) {
      trips[existingFittingTrip].locations.push(newLocation);
      trips[existingFittingTrip].remaining -= newLocation[1]
    } else {
      // If no trip can fit this delivery, it will create a brand new trip.
      trips.push({
        remaining: maxDroneWeight - newLocation[1],
        locations: [newLocation]
      })
    }
  }

  for (let location of locationsSorted) {
    addToBestFit(location)
  }

  let output = trips.reduce((acc, cur, index) => {
    acc += `Trip #${index + 1}\n${cur.locations.map(([n]) => n).join(', ')}\n`
    return acc;
  }, `${largestDrone[0]}\n`)

  return output;
}

/**
 * Receives a string where the first line is a sequence of names and the weight a drone can carry,
 * followed by a list of locations, split by lines. Numbers should be written between '[' and ']'.
 * Example:
 * [DroneA], [200], [DroneB], [250]
 * [LocationA], [200]
 * [LocationB], [150]
 * 
 * @param {string} inputTxt - The text content of the input file.
 * @returns {Object} - An object containing the properties drones and locations. Each property is an array [name, weight].
 */
let buildInputStructure = (inputTxt) => {
  const [droneHeader, ...locations] = inputTxt.split('\n').filter(content => !!content);

  const dronesList = droneHeader.split(',')
  let dronesParsed = [];

  for (let i = 0; i < dronesList.length - 1; i += 2) {
    dronesParsed.push([dronesList[i].trim(), parseWeightToNumber(dronesList[i + 1])])
  }

  const locationsParsed = locations.map(location => {
    const [name, weight] = location.split(',').map(prop => prop.trim())
    return [name.trim(), parseWeightToNumber(weight)];
  })

  return {
    drones: dronesParsed,
    locations: locationsParsed,
  }
}

/**
 * Receives a string where the first line is a sequence of names and the weight a drone can carry,
 * followed by a list of locations, split by lines. Numbers should be written between '[' and ']'.
 * Example:
 * [DroneA], [200], [DroneB], [250]
 * [LocationA], [200]
 * [LocationB], [150]
 * 
 * @param {string} inputFile - The text content of the input file.
 * @returns {string} - The expected Output result in the following format:
 * [DroneA]
 * Trip #1
 * [LocationA], [LocationC]
 * 
 * [DroneB]
 * Trip #1
 * [LocationB]
 * 
 */
async function buildTrips(inputFile) {
  const input = await readFileAsync(inputFile)
  const structuredInput = buildInputStructure(input);

  return bestFitDecreasing(structuredInput.drones, structuredInput.locations);
}


/**
 * Runs the @buildTrips function and logs it's result or error response.
 * @returns {undefined}
 */
const start = async () => {
  try {
    const result = await buildTrips(fileArg);
    console.log(result)
  } catch (error) {
    console.error(error)
  }
}

start();