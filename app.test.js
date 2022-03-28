const MarsRover = require("./app");
const marsRover = new MarsRover([4, 2, "EAST"], "FLFFFRFLB");

it("To test if direction string all uppercase", () => {
  expect(marsRover.direction).toBe(marsRover.direction.toUpperCase());
});

// create match to check if index between 0 : 4
expect.extend({
  toBeBetween(received, start, end) {
    const pass = received >= start && received < end;
    if (pass) {
      return {
        message: () => `Expected ${received} To Be >= ${start} And < ${end}`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} To Be >= ${start} And < ${end}`,
        pass: false,
      };
    }
  },
});

describe("Test if index is a numder and index >= 0 OR < 4", () => {
  it("Check if index of direction is a number", () => {
    expect(isNaN(marsRover.findIndexElm())).toBeFalsy();
  });
  it("Check if index >= 0 OR index < 4", () => {
    expect(marsRover.findIndexElm()).toBeBetween(0, 4);
  });
});

describe("Test if current coordinates that are we expects", () => {
  it("Rover Current Coordinates", () => {
    expect(
      new MarsRover([4, 2, "EAST"], "FLFFFRFLB").printCurrentCoordinates
    ).toBe("(6, 4) NORTH");
    expect(
      new MarsRover([0, 0, "WEST"], "BRFFLBBRF").printCurrentCoordinates
    ).toBe("(3, 3) NORTH");
    expect(
      new MarsRover([6, 10, "SOUTH"], "LFFRFLBRF").printCurrentCoordinates
    ).toBe("(7, 8) SOUTH");
    expect(
      new MarsRover([5, 5, "NORTH"], "LFFFFFFRB").printCurrentCoordinates
    ).toBe("(4, 5) WEST STOPPED");
    expect(
      new MarsRover([-2, -2, "SOUTH"], "LFFLFFRFF").printCurrentCoordinates
    ).toBe("(2, 0) EAST");
    expect(
      new MarsRover([7, 5, "WEST"], "FFFLFLFFF").printCurrentCoordinates
    ).toBe("(6, 4) EAST STOPPED");
    expect(
      new MarsRover([1, 1, "SOUTH"], "FRBBRFFLB").printCurrentCoordinates
    ).toBe("(4, 2) WEST");
    expect(
      new MarsRover([0, 0, "NORTH"], "FFFRFLFFB").printCurrentCoordinates
    ).toBe("(1, 3) NORTH STOPPED");
  });
});
