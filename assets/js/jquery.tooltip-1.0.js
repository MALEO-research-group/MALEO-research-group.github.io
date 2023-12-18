/*
 * jQuery plugin tooltip
 *
 * @author: Jakob Bossek (http://www.jakobbossek.de/)
 * @version: 1.0
 *
 * Replaces the boring beige/yellow tooltips offered by the operating system
 * with nice JS tooltips.
 */
;(function($) {
  jQuery.fn.tooltip = function(arg) {
    var options = $.extend(
      {},
      $.fn.tooltip.defaults,
      arg
    );

    return this.each(function() {
      // save title and remove from element
      var theTitle = $(this).attr("title");
      $(this).attr("title", "");

      $(this).hover(function(e) {
        // remove tooltip if already active
        if($('#tooltip').length > 0) {
          $('#tooltip').stop().remove();
        }

        // add tooltip window
        $('<div id="tooltip"></div>')
          .html(theTitle)
          .append(options.appendHTML)
          .css({display: "none", position: "absolute", 'z-index': "10000", top: e.pageY + options.offsetToPointer, left: e.pageX + options.offsetToPointer}).appendTo('body')
          .fadeIn(options.fadeInTime);
      }, function() {
        $('#tooltip')
          .fadeOut(options.fadeOutTime,
            function(e) {
              $(this).remove();
            }
          );
      });

      // sticky tooltips do not move
      if(!options.sticky) {
        $(this).mousemove(function(e) {
          $('#tooltip')
            .css({top: e.pageY + options.offsetToPointer, left: e.pageX + options.offsetToPointer});
        });
      }

    });
  };

  $.fn.tooltip.defaults = {
    // if sticky tooltip appears and does not move with the pointer
    sticky: false,
    // offset of the tooltip window to the mouse pointer
    offsetToPointer: 20,
    // time in milliseconds for fade in
    fadeInTime: 250,
    // time in milliseconds for fade out
    fadeOutTime: 250,
    // some html stuff to append to the tooltip window
    appendHTML: '<span id="tooltipInner"></span>'
  };
})(jQuery);
