const firstName = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Magenta",
  "Black",
  "White",
  "Orange",
];
const lastName = [
  "Fox",
  "Apple",
  "Bunny",
  "Cherry",
  "Tree",
  "Mouse",
  "Bear",
  "Star",
];

export const generateName = () =>
  `${firstName[(Math.random() * firstName.length) | 0]} ${
    lastName[(Math.random() * lastName.length) | 0]
  }`;
