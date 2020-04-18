var application = Stimulus.Application.start();

class TimeController extends Stimulus.Controller {
  connect() {
    const now = new Date()
    const then = new Date(this.data.get("date"));
    this.update(now.getTime() - then.getTime());
  }

  update(ms) {
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);
    const month = Math.round(day / 30);
    const year = Math.round(month / 12);

    console.log({ year, month, day, hr, min, sec });

    this.element.innerHTML =
      "30 years 9 months 9 days 12 hours 30 minutes and 50 seconds";
  }
}

application.register("time", TimeController);
