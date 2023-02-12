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
  
  inputValue = parseFloat(inputQueue.splice(0, 1));
  if(isNaN(inputValue) )
    inputValue = Math.random() * 100;
  //console.log("value: " +  isNaN(inputValue));
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
