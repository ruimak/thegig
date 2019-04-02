export const bandRemover = (bandsInState, band) => {
  for (let i = bandsInState.length - 1; i >= 0; i--) {
    if (bandsInState[i] === band) {
      bandsInState.splice(i, 1);
      break; //<-- Uncomment  if only the first term has to be removed
    }
  }
};
