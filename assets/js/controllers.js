var application = Stimulus.Application.start();

class TimeController extends Stimulus.Controller {
  connect() {
    this.update();
    this.interval = setInterval(this.update.bind(this), 1000);
  }

  disconnect() {
    clearInterval(this.interval);
  }

  update() {
    let date = this.data.get("date");

    if (!date) {
      return;
    }

    date = new Date(date);

    if (date === "Invalid Date") {
      return;
    }

    this.element.innerHTML = countdown(date);
  }
}

application.register("time", TimeController);

class HoverImageController extends Stimulus.Controller {
  initialize() {
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  connect() {
    this.element.addEventListener("mouseenter", this.handleMouseEnter);
    this.element.addEventListener("mousemove", this.handleMouseMove);
    this.element.addEventListener("mouseleave", this.handleMouseLeave);
  }

  handleMouseEnter() {
    if (!this.hoverElement) {
      this.hoverElement = document.createElement("img");
      this.hoverElement.style.position = "fixed";
      this.hoverElement.style.top = 0;
      this.hoverElement.style.left = 0;
      this.hoverElement.style.pointerEvents = "none";
      this.hoverElement.src = this.element.src;
    }
    document.body.appendChild(this.hoverElement);
  }

  handleMouseMove(event) {
    this.hoverElement.style.top = event.clientY + 'px';
    this.hoverElement.style.left = event.clientX - (this.hoverElement.width / 2) + 'px';
  }

  handleMouseLeave() {
    document.body.removeChild(this.hoverElement);
  }
}

application.register("hover-image", HoverImageController);
