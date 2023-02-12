const MaxLength = 300;

export const TestData = Array(MaxLength).fill({ label: "", data: 0 });

export function updateTestData() {
  if (TestData.length >= MaxLength) {
    TestData.splice(0, 1);
  }
  TestData.push({ label: "", data: Math.random() });
  window.dispatchEvent(new Event("dataChange"));
}
