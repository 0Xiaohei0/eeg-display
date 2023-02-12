const MaxLength = 300;

export const TestData = Array(MaxLength).fill({ label: "", data: 0 });

const USING_BACKEND_DATA = true;

let inputQueue = [];
let inputValue = 0;
export let prevValue = 0;

export function setDataInput(input) {
  console.log(`input: ${input}`);
  if (inputQueue.length === 0) {
    inputQueue = input;
    //console.log(`adding to inputQueue ${inputQueue.length}`);
  }
}

export function getPreviousValue() {
  return inputValue - prevValue;
}

export function updateTestData() {
  TestData.splice(0, 1);
  prevValue = TestData.at(TestData.length - 1).data;
  if (USING_BACKEND_DATA) {
    inputValue = parseFloat(inputQueue.splice(0, 1));
    if (isNaN(inputValue)) inputValue = prevValue;
  } else {
    inputValue = prevValue + (Math.random() - 0.5) / 10;
  }
  //console.log("value: " + prevValue);
  TestData.push({ label: "", data: inputValue });
  // console.log(
  //   `TestData: ${TestData.map((i) => {
  //     return i.data;
  //   })}`
  // );
  //console.log(inputQueue);
  //console.log(TestData.length);
  window.dispatchEvent(new Event("dataChange"));
}
