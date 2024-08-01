const progressBar = document.getElementById("progress__bar");
const progressCircle = document.getElementById("progress-arc");
const progressSvg = document.getElementById("progress__svg");
const valueInput = document.getElementById("value-input");
const animateCheckbox = document.getElementById("animate-check");
const hideCheckbox = document.getElementById("hide-check");
//const error = document.getElementById("value-input-error");




  function describeArc(centerX, centerY, radius, startAngle, endAngle) {
    const start = {
      x: centerX + radius * Math.cos((((endAngle - 90) * Math.PI) / 180.0)),
      y: centerY + radius * Math.sin((((endAngle - 90) * Math.PI) / 180.0)),
    } 
    
    const end = {
      x: centerX + radius * Math.cos((((startAngle - 90) * Math.PI) / 180.0)),
      y: centerY + radius * Math.sin((((startAngle - 90) * Math.PI) / 180.0)),
    }
  
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    const d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }



  function updateProgress() {
    const value = parseInt(valueInput.value, 10);

    if (!valueInput.validity.valid) {
      valueInput.classList.add("border");
    //  error.textContent = "value is invalid";
      
      return;
    } else {
      valueInput.classList.remove("border");
      valueInput.setAttribute("border-color", "#ccc")
      //error.textContent = "";
    }  

    const endAngle = (value / 100) * 360;
    const d = describeArc(50, 50, 45, 0, endAngle === 360 ? 359.99 : endAngle);
    
    progressCircle.setAttribute("d", d);
  }



  function toggleAnimation() {
    toggleActivity(this);
    if (this.classList.contains('active')) {
      progressSvg.classList.add("animated");
    } else {
      progressSvg.classList.remove("animated");
      void progressSvg.offsetWidth;
    }
  }
  function toggleActivity(checkbox){
    if(!checkbox.classList.contains('active')){
        checkbox.classList.add('active');
    }else{
        checkbox.classList.remove('active');
    }
  }

  function toggleVisibility() {
    toggleActivity(this);
    progressBar.style.display = this.classList.contains('active') ? "none" : "flex";
  }

    animateCheckbox.addEventListener("click", toggleAnimation);
    valueInput.addEventListener("input", updateProgress);
    hideCheckbox.addEventListener("click", toggleVisibility);