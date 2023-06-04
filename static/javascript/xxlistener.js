
function scrollWindow(event) {
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
      case "r":
        window.scrollTo({
          left: window.scrollX + window.innerWidth,
          behavior: "smooth"
        });
        event.preventDefault();
        break;
    }
  }
}

function scrollElem(event) {
  const elem = document.getElementById('myTable');
  if (event.ctrlKey) {
    event.preventDefault();
    switch (event.key) {
      case "t":
        elem.scrollTop -= 50;
        break;
      case "b":
        elem.scrollTop += 50;
        break;
      case "l":
        elem.scrollLeft -= 50;
        break;
      case "r":
        elem.scrollLeft += 50;
        break;
    }
  }
}



