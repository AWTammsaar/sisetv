//Default configuration. Will be overwritten with the values in config.json
var config = {
  //Location of the content definition
  contentURL: "/api/getContent",

  configURL: "/api/getConfig",

  // Default duration of slides
  defaultDelay: 3,

  // Default duration of slide transitions
  defaultDuration: 0.5,

  // Default slide transition
  defaultTransition: "none",

  //Number of cycles to run before checking for new content again
  checkCycles: 20
};

$.getJSON(config.configURL, function (data) {
  for (var k in data) {
    if (!data.hasOwnProperty(k)) continue;
    if (!data[k]) {
      console.log("Warning: Non-standard configuration parameter: " + k + ":" + data[k]);
    }
    config[k] = data[k];
  }
});


var loaders = {};

loaders.img = {
  preLoad: function (c) {
    return $('<img />').attr("src", c.url);
  },
  onShown: function (c, elem) {

  },
  onHidden: function (c, elem) {

  }
};
loaders.page = {
  preLoad: function (c) {

  }
};
loaders.video = {
  preLoad: function (c) {
    var jqel = $('<video />').attr("src", c.url).attr("preload", "auto").attr("muted", true);
    var elem = jqel.get(0);
    elem.addEventListener('loadedmetadata', function () {
      c.delay = elem.duration;
    });
    return jqel;
  },
  onShown: function (c, elem) {
    var video = elem.children("video").get(0);
    video.play();

  },
  transitionIn: function (c, elem) {
    var video = elem.children("video").get(0);
    video.pause();
    video.currentTime = 0;
  },
  transitionOut: function (c, elem) {
    var video = elem.children("video").get(0);
    video.pause();
  },

  onHidden: function (c, elem) {
    var video = elem.children("video").get(0);
    video.pause();
  }
};

var transitions = {};
transitions.none = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemOut.addClass("hidden");
    elemIn.removeClass("hidden");
    completed();
  }
};

transitions.fade = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemIn.css("opacity", "0");
    elemIn.removeClass("hidden");
    elemIn.animate({
      opacity: "1"
    }, duration);
    elemOut.animate({
      opacity: "0"
    }, duration, function () {
      elemOut.addClass("hidden");
      elemOut.css("opacity", "");
      elemIn.css("opacity", "");
      completed();
    });
  }
};
transitions.slideLeft = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemIn.css("left", "100%");
    elemIn.removeClass("hidden");
    elemIn.animate({
      left: "0%"
    }, duration);
    elemOut.animate({
      left: "-100%"
    }, duration, function () {
      elemOut.addClass("hidden");
      elemOut.css("left", "");
      elemIn.css("left", "");
      completed();
    });
  }
};

transitions.slideRight = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemIn.css("right", "100%");
    elemIn.removeClass("hidden");
    elemIn.animate({
      right: "0%"
    }, duration);
    elemOut.animate({
      right: "-100%"
    }, duration, function () {
      elemOut.addClass("hidden");
      elemOut.css("right", "");
      elemIn.css("right", "");
      completed();
    });
  }
};

transitions.slideTop = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemIn.css("top", "100%");
    elemIn.removeClass("hidden");
    elemIn.animate({
      top: "0%"
    }, duration);
    elemOut.animate({
      top: "-100%"
    }, duration, function () {
      elemOut.addClass("hidden");
      elemOut.css("top", "");
      elemIn.css("top", "");
      completed();
    });
  }
};

transitions.slideBottom = {
  transition: function (elemIn, elemOut, duration, completed) {
    elemIn.css("bottom", "100%");
    elemIn.removeClass("hidden");
    elemIn.animate({
      bottom: "0%"
    }, duration);
    elemOut.animate({
      bottom: "-100%"
    }, duration, function () {
      elemOut.addClass("hidden");
      elemOut.css("bottom", "");
      elemIn.css("bottom", "");
      completed();
    });
  }
};