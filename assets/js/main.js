$(document).ready(function() {
  // search field for staff members
  $("#staff_search").on("focusin", function() {
    if ($(this).val() == "Search by name") {
      $(this).val('');
    }
  });

  $("#staff_search").on("focusout", function() {
    if ($(this).val() == "") {
      $(this).val("Search by name");
    }
  });

  // every time we write something into the search field
  $("#staff_search").on("keyup", function() {
    var search_value = $(this).val().toLowerCase();
    console.log("changed!" + search_value);
    $("#staff li").each(function() {
      var member_name = $(this).find("h3").html().toLowerCase();
      console.log(member_name + " 1");
      if (member_name.includes(search_value)) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });

  // build quick-jump menu
  var hs = $("#content h2");
  if (hs.length > 1) {
    var qa = '<nav><b>Quick access:</b> <ul>';
    hs.each(function(index) {
      qa = qa + '<li><a href="#h' + index + '">' + $(this).text() + '</a></li>';
      $(this).attr('id', 'h' + index);
    });
    qa = qa + '</ul></nav>';
    // alert(qa);
    $("#quick_access").append(qa);
  }

  // smooth scroll if scroll destinations are fixed DOM IDs
  $("#quick_access a").click(function(e) {
    if (this.hash !== "") {
      // get the destination and prevent default reaction
      var hash = this.hash;
      e.preventDefault();

      // now smoothly scroll
      $('html, body').animate({
        'scrollTop': $(hash).offset().top - 25
      }, 300);
    }
  });

  // menu icon for mobile design
  $("#menu_icon").on("click", function() {
    $("#main_nav").toggle();
    $(this).toggleClass("active");
  });

  // dynamics for list of publications
  const name_mapping = new Map();
  name_mapping.set('Trautmann, Heike', 'htrautmann');
  name_mapping.set('Bossek, Jakob', 'jbossek');
  name_mapping.set('Preuß, Oliver', 'opreuss');
  name_mapping.set('Preuss, Oliver', 'opreuss');
  name_mapping.set('Preuss, Oliver Ludger', 'opreuss');
  name_mapping.set('Grimme, Britta', 'bgrimme');
  name_mapping.set('Rook, Jeroen', 'jrook');

  $(".publications li span").each(function() {
    for (const [key, value] of name_mapping) {
      // $(this).html($(this).html().replace(key, '<a href="/staff_members/' + value + '.html">' + key + '</a>'));
      $(this).html($(this).html().replace(key, '<b title="MALEO staff member">' + key + '</b>'));
    }
  });

    // smooth on-hover tooltips
  $("a[title], b[title], abbr[title], img[title]").tooltip();
});

