/*
 * jQuery Character Justify plugin 0.1
 *
 * http://heychinaski.com
 *
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

  /*
   * Calculates the spacing required for a given element.
   * current - element to calculate
   * width - width to aim to justify at
   */
  var calculateSpacing = function(current, width) {

      // Don't let word spacing screw us up
      current.css("word-spacing", "0px");

      // create a hidden clone
      var clone = current.clone();
      clone.hide();

      var text = clone.text();  
      clone.text(text.replace(/\s+/g, "_"));

      // Temporarily insert the clone so we can measure it
      current.before(clone);

      // Reset the letter spacing while we measure the span
      clone.css("letter-spacing", "0px");
      clone.css("float", "left");
      var noSpaceText = clone.text();
      var normalWidth = clone.innerWidth();

      // Work out the difference between the current size of text
      // and the size we should be at
      var widthDifference = (width) - normalWidth;

      //  How many letters in the text?

      var textLength = (text.length);
      textLength -= 1;

      var letterSpacing = (widthDifference) / (textLength);

      // Remove the clone again
      clone.remove();

      return letterSpacing;
  }

  jQuery.fn.characterJustify = function(width, speed, easing, callback) {

    var maxSpacing = 0;

    var last = this.get(this.length - 1);

    var actualWidth = this.innerWidth();
    var widthToUse = actualWidth;
    // If nothing is passed in use the current width
    if(typeof(width) != "undefined" && !isNaN(width) && width > 0) {
      widthToUse = width;
    }

    // For each element
    this.each(function() {
      if($(this).text().split(/\s+/).length > 1) {
        maxSpacing = Math.max(calculateSpacing($(this), actualWidth), maxSpacing);
      }
    });

    widthToUse = Math.min(actualWidth - (2 * maxSpacing), widthToUse);

    // For each element
    this.each(function() {
    
      var letterSpacing = calculateSpacing($(this), widthToUse);

      // Not animating?
      if(typeof(speed) == "undefined" || speed <= 0) {
        $(this).css({letterSpacing: letterSpacing + "px"});
      } else if($(this).get(0) == last) {
        // Only callback on the last element
        $(this).animate({letterSpacing: Math.round(letterSpacing) + "px"}, speed, easing, callback);
      } else {
        $(this).animate({letterSpacing: Math.round(letterSpacing) + "px"}, speed, easing);
      }
    });
  };

  jQuery.fn.characterUnjustify = function(spacing, speed, easing, callback) {

    var last = this.get(this.length - 1);

    $(this).each(function() {
      var toSpace;
      if(typeof(spacing) == "undefined" || isNaN(spacing) || spacing <= 0) {
        toSpace = 1;
      } else {
        toSpace = spacing;
      }

      if(typeof(speed) == "undefined" || speed <= 0) {
        $(this).css({letterSpacing: "" + toSpace + "px"});
      } else {
        if($(this).get(0) == last) {
          alert("Last");
          $(this).animate({letterSpacing: "" + toSpace + "px"}, speed, easing, callback);
        } else {
          $(this).animate({letterSpacing: "" + toSpace + "px"}, speed, easing);
        }
      }
    });
  };
}(jQuery));
