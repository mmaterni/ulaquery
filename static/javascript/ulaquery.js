// jshint esversion: 11

var cmd_close = function () {
  if (confirm("Chiudi Applicazione ?")) window.close();
};

var cmd_log_toggle = function () {
  UaLog.toggle();
};

var cmd_log = function (...args) {
  UaLog.log(...args);
};

var cmd_log_show = (...args) => {
  UaLog.log_show(...args);
};

var wait_start = function () {
  const bd = document.querySelector("body");
  bd.classList.add("wait");
};

var wait_stop = function () {
  document.querySelector("body").classList.remove("wait");
};

var sleep = function (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  });
};


var UlaQuery = {
  open: async function () {
    wait_start();
    try {
      await sleep(3000);
      wait_stop();
      const e = document.getElementById("query_id");
      e.innerHTML = "<h1>Pippo</h1>";
    } catch (error) {
      console.error(error);
      wait_stop();
      alert("errore");
    }
  }
};

