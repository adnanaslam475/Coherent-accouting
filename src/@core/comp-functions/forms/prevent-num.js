export function preventNum(e) {
  if (e.target.value.includes(".")) {
    e.target.value =
      e.target.value.split(".")[0] +
      "." +
      e.target.value.split(".")[1].slice(0, 1);
  }
}
