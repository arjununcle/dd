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
    this.element.addEventListener("mouseenter", this.handleMouseEnter, true);
    this.element.addEventListener("mouseleave", this.handleMouseLeave, true);
    this.element.addEventListener("mousemove", this.handleMouseMove);

    this.hoverElement = document.createElement("img");
    this.hoverElement.style.position = "fixed";
    this.hoverElement.style.top = 0;
    this.hoverElement.style.left = 0;
    this.hoverElement.style.maxHeight = "100vh";
    this.hoverElement.style.pointerEvents = "none";

    this.image = null;
  }

  disconnect() {
    this.element.removeEventListener("mouseenter", this.handleMouseEnter);
    this.element.removeEventListener("mouseleave", this.handleMouseLeave);
    this.element.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseEnter(event) {
    if (event.target.matches("img")) {
      this.image = event.target;
      this.hoverElement.src = this.image.src;
      document.body.appendChild(this.hoverElement);
      this.size = this.element.getBoundingClientRect();
    }
  }

  handleMouseMove(event) {
    if (!this.image) {
      return;
    }

    const xOffset = clamp(
      this.size.left,
      event.clientX - this.hoverElement.width / 2,
      this.size.right
    );

    const yOffset = clamp(
      this.size.top,
      event.clientY - this.hoverElement.height / 2,
      this.size.bottom
    );

    this.hoverElement.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  }

  handleMouseLeave(event) {
    if (this.image === event.target) {
      document.body.removeChild(this.hoverElement);
      this.image = null;
    }
  }
}

function clamp(min, x, max) {
  return Math.min(max, Math.max(min, x));
}

application.register("hover-image", HoverImageController);
