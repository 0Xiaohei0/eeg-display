const MaxLength = 100;

export const TestData = Array(MaxLength).fill({ label: "", data: 0 });

let inputQueue = [];
let inputValue = 0;

export function setDataInput(input) {
  //console.log(`input: ${input}`);
  if (inputQueue.length === 0) {
    inputQueue = input;
    //console.log(`adding to inputQueue ${inputQueue.length}`);
  }
}

export function updateTestData() {
  TestData.splice(0, 1);
  inputValue = Math.random() * 100;
  inputValue = inputQueue.splice(0, 1);
  //console.log("value: " + typeof parseFloat(inputValue));
  TestData.push({ label: "", data: parseFloat(inputValue) });
  // console.log(
  //   `TestData: ${TestData.map((i) => {
  //     return i.data;
  //   })}`
  // );
  //console.log(inputQueue);
  //console.log(TestData.length);
  window.dispatchEvent(new Event("dataChange"));
}
