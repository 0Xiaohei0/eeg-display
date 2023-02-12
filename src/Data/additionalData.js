let additionalData = [];

export function setAdditionalDataInput(input) {
  //console.log(`input: ${input.length}`);
  //console.log(`adding to inputQueue ${inputQueue}`);
  additionalData = input;
  // console.log(`added to inputQueue ${inputQueue}`);
}

export function getAdditionalData(index) {
  return additionalData[index];
}
