"use strict";

if (typeof loaders === 'undefined' || typeof transitions === 'undefined' || typeof config === 'undefined') {
  throw new Error("Config is not loaded!");
}
var content;
var current = 0;

//New content on standby?
var standby = false;
var lastStandby = -1;
var standbyContent = null;
var cycles = 0;

function nextContent() {
  var oldContent = content[current];
  var transition;

  //Transition out the old content
  //noinspection JSJQueryEfficiency
  var oldElem = $("#content-" + current);
  var last = current;
  current += 1;
  // Fetch new content
  if (current >= content.length) {
    current = 0;
    cycles += 1;
  }

  if (cycles >= config.checkCycles) {
    cycles = 0;
    getNewestData();
  }

  var newContent = content[current];
  //noinspection JSJQueryEfficiency
  var newElem = $("#content-" + current);
  var duration = newContent.duration ? newContent.duration : config.defaultDuration;
  duration *= 1000;

  if (newContent.transition)
    transition = transitions[newContent.transition];
  else
    transition = transitions[config.defaultTransition];
  if (loaders[newContent.type].transitionIn)
    loaders[newContent.type].transitionIn(newContent, newElem);

  if (oldContent && loaders[oldContent.type].transitionOut)
    loaders[oldContent.type].transitionOut(oldContent, oldElem);
  //Do the transition
  transition.transition(newElem, oldElem, duration, function () {
    if (oldContent && loaders[oldContent.type].onHidden)
      loaders[oldContent.type].onHidden(oldContent, oldElem);

    if (loaders[newContent.type].onShown)
      loaders[newContent.type].onShown(newContent, newElem);
    var delay = config.defaultDelay;
    if (newContent.delay) delay = newContent.delay;

    delay *= 1000;
    setTimeout(nextContent, delay);
  });
}
function getNewestData() {
  $.getJSON(config.contentURL, function (data) {
    var timeout = content === undefined;
    content = data;
    //Preload everything
    $(".container").empty();
    for (var i in content) {
      if (!content.hasOwnProperty(i)) continue;
      var c = content[i];
      var elem = loaders[c.type].preLoad(c);
      var slide = $('<div class="slide"></div>').append(elem);
      if (i != 0)
        slide.addClass("hidden");
      slide.attr("id", "content-" + i);
      slide.appendTo($(".container"));
    }
    if (timeout) setTimeout(nextContent, (content[current].delay ? content[current].delay : config.defaultDelay) * 1000);
  });
}

$(function () {
  $(document).idleTimer(3000);

  $(document).on("idle.idleTimer", function (event, elem, obj) {
    $("body").css("cursor", "none");
  });

  $(document).on("active.idleTimer", function (event, elem, obj, triggerevent) {
    $("body").css("cursor", "");
  });
  getNewestData();
});