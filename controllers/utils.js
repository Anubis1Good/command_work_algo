export default function isBetween(number,a, b, inclusive) {
    var min = Math.min(a, b),
        max = Math.max(a, b);
  
    return inclusive? number >= min && number <= max : number > min && number < max;
  };

