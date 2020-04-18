var application = Stimulus.Application.start();

class TimeController extends Stimulus.Controller {
  connect() {
    this.update();
  }

  update() {
    this.element.innerHTML =
      "30 years 9 months 9 days 12 hours 30 minutes and 50 seconds";
  }
}

application.register("time", TimeController);
