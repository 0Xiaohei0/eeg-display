const MaxLength = 400;

export const TestData = Array(MaxLength).fill({ label: "", data: 0 });

const USING_BACKEND_DATA = true;

let inputQueue = [];
let inputValue = 0;
export let prevValue = 0;

export function setDataInput(input) {
  //console.log(`input: ${input.length}`);
  //console.log(`adding to inputQueue ${inputQueue}`);
  if (inputQueue.length <= 10) {
    for (let i = input.length - 1; i >= input.length - 10; i--)
      inputQueue.push(input[i]);
    // console.log(`added to inputQueue ${inputQueue}`);
  }
}

export function getPreviousValue() {
  return Math.abs(inputValue) - Math.abs(prevValue);
}

export function updateTestData() {
  TestData.splice(0, 1);
  //console.log(TestData.length);

  prevValue = TestData.at(TestData.length - 1).data;
  console.log(prevValue);
  if (USING_BACKEND_DATA) {
    inputValue = parseFloat(inputQueue.splice(0, 1));
    if (isNaN(inputValue)) inputValue = prevValue;
  } else {
    inputValue = prevValue + (Math.random() - 0.5) / 10;
  }
  TestData.push({ label: "", data: Math.abs(inputValue) });

  // console.log(
  //   `TestData: ${TestData.map((i) => {
  //     return i.data;
  //   })}`
  // );
  //console.log(inputQueue);
  //console.log(TestData.length);
  window.dispatchEvent(new Event("dataChange"));
}
