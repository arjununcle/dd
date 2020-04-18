var application = Stimulus.Application.start();

class TimeController extends Stimulus.Controller {
  connect() {
    const now = new Date();
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

    const duration = [];

    if (year > 0) {
      duration.push(year + " " + plural(year, "year"));
    }

    const months = month % 12;
    if (months > 0) {
      duration.push(months + " " + plural(months, "month"));
    }

    const days = day % 31;
    if (days > 0) {
      duration.push(days + " " + plural(days, "day"));
    }

    const hours = hr % 24;
    if (hours > 0) {
      duration.push(hours + " " + plural(hours, "hour"));
    }

    const minutes = min % 60;
    if (minutes > 0) {
      duration.push(minutes + " " + plural(minutes, "minute"));
    }

    const seconds = sec % 60;
    if (seconds > 0) {
      duration.push(seconds + " " + plural(seconds, "second"));
    }

    this.element.innerHTML = humanize(duration);
  }
}

function plural(count, word) {
  return word + (count === 1 ? "" : "s");
}

function humanize(list) {
  if (list.length === 1) {
    return list[0];
  }

  return [
    list.slice(0, list.length - 1).join(", "),
    list[list.length - 1]
  ].join(" and ");
}

application.register("time", TimeController);
