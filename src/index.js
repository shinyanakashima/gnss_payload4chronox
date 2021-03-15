/**
 * @return integer part - may be negative
 */
Math.trunc = function (n) {
  return n < 0 ? Math.ceil(n) : Math.floor(n);
};
Math.frac = function (n) {
  return n - Math.trunc(n);
};
Math.modf = function (n) {
  return {
    integer_part: Math.trunc(n),
    decimal_part: Math.frac(n)
  };
};

function parse_gpgaa(logger_lonlat) {
  // let spval = logger_lat.split(".");
  // let integer_part = spval[0];
  // let decimal_part = spval[1];

  //decimal, integer = math.modf(logger_latitude/100.0)
  //gps_latitude = integer + decimal / 60.0 * 100.0

  console.log("lat=", logger_lat);
  console.log("整数部分", integer_part);
  console.log("小数部分", decimal_part);

  let { integer_part, decimal_part } = Math.modf(
    parseFloat(logger_lonlat) / 100
  );
  return integer_part + (decimal_part / 60) * 100;
}

let payload = "343235352e37353631343330392e3537";
let parsed_payload = payload
  .match(/.{1,2}/g)
  .map((chara, idx) => String.fromCharCode(parseInt(chara, 16)))
  .join("");
let logger_lat = parsed_payload.slice(0, 8);
let logger_lon = parsed_payload.slice(8, 16);

// 4255.766　14309.59　←GPGGA 緯度経度
// 42.92943333, 143.15983333 ←10進変換
console.log("変換後 緯度", parse_gpgaa(logger_lat));
console.log("変換後 経度", parse_gpgaa(logger_lon));
