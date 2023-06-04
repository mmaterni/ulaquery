"use strict"

;(function(){


}.call(this));

function gestisciScrollConTastiCtrl(event) {
    if (event.ctrlKey) {
      switch (event.key) {
        case "t": // Ctrl + T verso l'alto
          window.scrollTo({
            top: window.scrollY - window.innerHeight,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "b": // Ctrl + B verso il basso
          window.scrollTo({
            top: window.scrollY + window.innerHeight,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "l": // Ctrl + L a sinistra
          window.scrollTo({
            left: window.scrollX - window.innerWidth,
            behavior: "smooth"
          });
          event.preventDefault();
          break;
        case "r": // Ctrl + R a destra
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
  