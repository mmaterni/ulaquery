"use strict"

;(function(){


}.call(this));

function gestisciScrollConTastiCtrl(event) {
    if (event.ctrlKey) {
      switch (event.key) {
        case "t": 
          window.scrollTo({
            top: window.scrollY - window.innerHeight,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "b": 
          window.scrollTo({
            top: window.scrollY + window.innerHeight,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "l": 
          window.scrollTo({
            left: window.scrollX - window.innerWidth,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "r": /
          window.scrollTo({
            left: window.scrollX + window.innerWidth,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
      }
    }
  }
  
  // Aggiungi l'ascoltatore dell'evento keydown al documento
  document.addEventListener("keydown", gestisciScrollConTastiCtrl);
  