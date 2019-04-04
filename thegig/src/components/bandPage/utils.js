export const artistEventsFilter = (attractionsArrays, originalArray, band) => {
  return attractionsArrays.reduce(
    (acc, attractionsArray, indexOfAttractionsArray) => {
      for (let i = 0; i < attractionsArray.length; i++) {
        if (
          attractionsArray[i].name.toLowerCase() ===
          band.toLowerCase()
        ) {
          acc.push(originalArray[indexOfAttractionsArray]);
        }
      }
      return acc;
    },
    []
  );
};

export const adder = (a,b) => {
  return a+b
};