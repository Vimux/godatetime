document.addEventListener('DOMContentLoaded', function(){
  let mapping = {
    "%a": "Mon",
    "%A": "Monday",
    "%b": "Jan",
    "%B": "January",
    "%d": "02",
    "%e": "_2",
    "%m": "01",
    "%y": "06",
    "%Y": "2006",
    "%H": "15",
    "%I": "03",
    "%l": "3",
    "%M": "04",
    "%P": "pm",
    "%p": "PM",
    "%S": "05",
    "%Z": "MST",
    "%z": "-0700",
    "%%": "%",

    // Go doesn't support that strftime codes
    "%j": "%j",
    "%U": "%U",
    "%W": "%W",
    "%w": "%w",
    "%x": "%x",
    "%X": "%X",
    "%c": "%c"
  }

  function strftime(str) {
    let res = "";
    for (let i = 0; i < str.length; i++) {
      let f = mapping[str.substr(i, 2)];
      if (f) {
        res += f;
        i++;
      } else {
        res += str[i];
      }
    }

    return res;
  }

  function update(cb) {
    let input = document.querySelector("#strftime").value;
    let output = strftime(input);
    document.querySelector("#output").value = output;

    if (cb) {
      cb();
    }
  }

  function appendCode() {
    let inputEl = document.querySelector("#strftime");
    let code = this.textContent;

    document.querySelector("#strftime").value = document.querySelector("#strftime").value + " " + code;

    let event = document.createEvent("HTMLEvents");
    event.initEvent("update", true, false);
    inputEl.dispatchEvent(event);
  }

  function highlight() {
    this.setSelectionRange(0, this.value.length);
  }

  document.querySelector("#strftime").addEventListener("keyup", update);
  document.querySelector("#strftime").addEventListener("update", update);
  document.querySelector("#output").addEventListener("click", highlight);

  definitions = document.querySelector("#definitions").querySelectorAll(".definition__name");
  for(let i = 0; i<definitions.length; i++){
    definitions[i].onclick = appendCode;
  }

  update(function() {
    let el = document.querySelector("#strftime");

    el.focus();
    el.selectionStart = el.selectionEnd = el.value.length;
  });
}, false);
