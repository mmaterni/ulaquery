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

var cmd_wait_start = function () {
  const bd = document.querySelector("body");
  bd.classList.add("wait");
};

var cmd_wait_stop = function () {
  document.querySelector("body").classList.remove("wait");
};

var sleep = function (delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  });
};

var UlaQuery = {
  open: async function () {
    cmd_wait_start();
    // DICT_FORM_ID = document.getElementById("dict_form_id");
    // UaLog.setXY(-300, 0).setZ(11).new();
    // const lst = await DataManger.load_dict_form_rows();
    DictForm.open();
    cmd_wait_stop();
    // FormLpmx.scroll_top();
  }
};
