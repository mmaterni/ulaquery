"use strict"

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

function wait_start() {
  const b = document.querySelector('body');
  if (!!b)
    b.classList.add("wait");
};

function wait_stop() {
  document.querySelector("body").classList.remove("wait");
};

function sleep(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  });
};

var show_windows = function () {
  FormLemma.show();
  Funct.show();
  Sigl.show();
  PosMsd.show();
};

var resetXY_windows = function () {
  FormLemma.resetXY();
  Sigl.resetXY();
  Funct.resetXY();
  PosMsd.resetXY();
};



var UlaQuery = {
  open: async function () {
    wait_start();
    await sleep(10);
    await dm_.load_dict();
    await DictForm.open();
    await FormLemma.open();
    await Sigl.open();
    await Funct.open();
    await PosMsd.open();
    UaLog.setXY(-300, 0).setZ(11).new().log_show();
    wait_stop();
  }
};

// UlaQuery.open();