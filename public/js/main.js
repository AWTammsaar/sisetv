"use strict";

if (typeof loaders === 'undefined' || typeof transitions === 'undefined' || typeof config === 'undefined') {
  throw new Error("Config is not loaded!");
}
var content;
var lastmodified = 0;
var current = 0;
var contentBuffer;

function nextContent() {
  var oldContent = content[current];
  var transition;

  //Transition out the old content
  //noinspection JSJQueryEfficiency
  var oldElem = $("#content-" + current);
  current += 1;

  if (current >= content.length) {
    current = 0;
    //Grab new content from buffer
    if (contentBuffer) {
      content = contentBuffer;
      contentBuffer = undefined;
      loadContent();
    }
  }


  var newContent = content[current];
  //noinspection JSJQueryEfficiency
  var newElem = $("#content-" + current);
  //We don't currently have any content
  if (!newContent) {
    setTimeout(nextContent, 5000);
    return;
  }
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
function getNewestData(cb) {
  $.getJSON(config.contentURL, function (data) {
    if (lastmodified == data.lastmodified && content !== undefined) return;
    //Put new content into buffer
    contentBuffer = data.content;
    lastmodified = data.lastmodified;
    if (cb) cb();
  });
}

function loadContent() {
  var $container = $(".container");
  $container.empty();
  for (var i in content) {
    if (!content.hasOwnProperty(i)) continue;
    var c = content[i];
    var elem = loaders[c.type].preLoad(c);
    var slide = $('<div class="slide"></div>').append(elem);
    slide.attr("id", "content-" + i);
    slide.appendTo($container);
    if (i != 0)
      slide.addClass("hidden");
    else {
      if (loaders[c.type].onShown)
        loaders[c.type].onShown(c, slide);
    }
  }
}

$(function () {
  $(document).idleTimer(3000);

  $(document).on("idle.idleTimer", function () {
    $("body").css("cursor", "none");
  });

  $(document).on("active.idleTimer", function () {
    $("body").css("cursor", "");
  });
  getNewestData(function () {
    content = contentBuffer;
    contentBuffer = undefined;
    loadContent();
    nextContent();
  });
  setInterval(getNewestData, 10000);
});