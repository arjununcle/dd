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
  connect() {
    this.element.addEventListener("mouseenter", this.handleMouseEnter.bind(this));
    this.element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
  }

  handleMouseEnter() {
    console.log("hello", this.element.src);
  }

  handleMouseLeave() {
    console.log("goodbye", this.element.src);
  }
}

application.register("hover-image", HoverImageController)
