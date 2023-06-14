const Encode = (phrase, symbols) => {
  let bottom = 0;
  let top = 1;
  let len = top - bottom;
  let progress = bottom;

  for (var i = 0; i < phrase.length; i++) {
    for (var j = 0; j < symbols.length; j++) {
      if (j === 0) {
        symbols[j].from = progress;
      } else if (j === symbols.length - 1) {
        symbols[j].from = progress;
        symbols[j - 1].to = progress;
        symbols[j].to = top;
      } else {
        symbols[j].from = progress;
        symbols[j - 1].to = progress;
      }
      progress += len * symbols[j].prob;
    }
    for (var k = 0; k < symbols.length; k++) {
      if (symbols[k].symbol === phrase[i]) {
        bottom = symbols[k].from;
        top = symbols[k].to;
        len = top - bottom;
        progress = bottom;
        break;
      }
    }
    //console.log(symbols);
  }
  return bottom;
};

const Decode = (enc_val, msg_len, symbols) => {
  let decoded = "";
  let bottom = 0;
  let top = 1;
  let len = top - bottom;
  let progress = bottom;

  for (var i = 0; i < msg_len; i++) {
    for (var j = 0; j < symbols.length; j++) {
      if (j === 0) {
        symbols[j].from = progress;
      } else if (j === symbols.length - 1) {
        symbols[j].from = progress;
        symbols[j - 1].to = progress;
        symbols[j].to = top;
      } else {
        symbols[j].from = progress;
        symbols[j - 1].to = progress;
      }
      progress += len * symbols[j].prob;
    }
    for (var k = 0; k < symbols.length; k++) {
      if (symbols[k].from <= enc_val && symbols[k].to > enc_val) {
        bottom = symbols[k].from;
        top = symbols[k].to;
        len = top - bottom;
        progress = bottom;
        decoded += symbols[k].symbol;
        break;
      }
    }
    //console.log(symbols);
  }
  return decoded;
};

const Main = () => {
  const input_string = "NASA";
  const symbol_prob = [
    { symbol: "A", prob: 0.5 },
    { symbol: "N", prob: 0.3 },
    { symbol: "S", prob: 0.2 },
  ];

  const encoded = Encode(input_string, symbol_prob);
  console.log(`Phrase ${input_string} is encoded as ${encoded}`);

  const decoded = Decode(encoded, input_string.length, symbol_prob);
  console.log(`Code ${encoded} with length ${input_string.length} is decoded as ${decoded}`);
};

Main();
