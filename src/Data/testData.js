const MaxLength = 300;

export const TestData = [
  { label: 1, data: Math.random() },
  { label: 1, data: Math.random() },
  { label: 1, data: Math.random() },
  { label: 1, data: Math.random() },
  { label: 1, data: Math.random() },
];

export function updateTestData() {
  if (TestData.length >= MaxLength) {
    TestData.splice(0, 1);
  }
  TestData.push({ label: 1, data: Math.random() });
  window.dispatchEvent(new Event("dataChange"));
}
