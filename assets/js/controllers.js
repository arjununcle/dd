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

    let date = new Date(date);

    if (date === "Invalid Date") {
      return;
    }

    this.element.innerHTML = countdown(date);
  }
}

application.register("time", TimeController);
