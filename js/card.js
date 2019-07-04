class elements {
  // class have name and cards div
  constructor(_name, _card) {
    this.name = _name;
    this.card = _card;
  }
}
var $clone,
  j = 0,
  el;
var $clone = $(".card").clone(); //clone div card
var arr = [], //array have data from api
  arrCards = []; // array of object elements
arr = {
  //initial array 2 d to save data from api
  name: [],
  email: [],
  gender: [],
  phone: [],
  urlIMG: [],
  dob: [],
  location: [],
  pw: [],
  username: []
};
ajax();
var state = true ;
$(window).scroll(function() {
    var scroll = $(this).scrollTop() ,
bodyHeight=$("body").height(),
windowHeight=$(window).height();
  if (scroll >= (bodyHeight -windowHeight )*0.75 && state) {
    // $("body").height($("body").height()+1812);
    console.log($(this).scrollTop() + "__" + ($("body").height() - $(window).innerHeight()));
    state = false 
    ajax();
    setTimeout(function() {
        state = true;
    },500);
  }
})
// request to loads data from api
function ajax() {
  $.ajax({
    url: "https://randomuser.me/api/?results=9",
    dataType: "json",
    success: function(data) {
      $("#txt").on("keyup", search);
      $.each(data.results, function(key, value) {
        el = new elements();
        if (j != 0) {
          buildArray(value);
          $clone = $clone.clone();
          $clone.prop("id", "card" + j);
          el.card = $clone;
          $clone.appendTo($(".row"));
          $clone.find("[id]").each(function() {
            this.id = this.id.substring(0, getID(this.id)) + j;
          });
          addCard(j);
          arrCards.push(el);
          j++;
        } else {
          console.log(j);
          buildArray(value);
          addCard(0);
          el.card = $clone;
          arrCards.push(el);
          ++j;
        }
      });
      $("#des").click(Descending);
      $("#asc").click(Ascending);
    }
  });
}
//add elements to arr
function buildArray(op) {
  arr["gender"][j] = op.gender;
  arr["name"][j] = op.name.first + " " + op.name.last;
  arr["phone"][j] = op.phone;
  arr["urlIMG"][j] = op.picture.medium;
  arr["dob"][j] = op.dob.date;
  arr["location"][j] = op.location.city + "/" + op.location.state;
  arr["pw"][j] = op.login.password;
  arr["username"][j] = op.login.username;
  arr["email"][j] = op.email;
  el.name = op.name.first + " " + op.name.last;
}
// edit to cards to be active
function addCard(key) {
  let id = key;
  $("#profile" + id).attr("src", arr["urlIMG"][id]);
  $("#title" + id).html("name and Gender :");
  $("#info" + id).html(arr["name"][id] + "<br/>" + arr["gender"][id]);
  $(document).ready(function() {
    $("li > img").mouseenter(function() {
      id = this.id;
      id = id.substring(getID(id), id.length);
      if ($(this).hasClass("user")) {
        $("#title" + id).html("name and Gender :");
        $("#info" + id).html(arr["name"][id] + "<br/>" + arr["gender"][id]);
      }
      if ($(this).hasClass("phone")) {
        $("#title" + id).html("phone:");
        $("#info" + id).text(arr["phone"][id]);
      }
      if ($(this).hasClass("location")) {
        $("#title" + id).html("Address:");
        $("#info" + id).text(arr["location"][id]);
      }
      if ($(this).hasClass("dob")) {
        $("#title" + id).html("Date of birthday :");
        $("#info" + id).text(arr["dob"][id]);
      }
      if ($(this).hasClass("email")) {
        $("#title" + id).html("Email:");
        $("#info" + id).text(arr["email"][id]);
      }
      if ($(this).hasClass("lock")) {
        $("#title" + id).html("User name and Password:");
        $("#info" + id).html(arr["username"][id] + "<br/>" + arr["pw"][id]);
      }
    });
  });
}
// search by any data
function search() {
  let vr = "";
  vr = $("#txt").val();
  let hide = false;
  $.each(arr, function(key, value) {
    console.log(value);
    for (let j = 0; j < arr["name"].length - 1; j++) {
      console.log(value[j].search(vr));
      if (vr == "") {
        $("#main0 > .card").show();
        break;
      } else if (value[j].search(vr) == 0) {
        if (!hide) {
          $("#main0 > .card").hide();
          hide = true;
        }
        $("#card" + j).show();
      }
    }
  });
}
//  Descending sort
function Descending() {
  arrCards.sort(compare);
  arrCards.reverse();
  $("#main0").empty();
  $.each(arrCards, function(key, value) {
    value.card.appendTo($("#main0"));
    addCard(key);
  });
}
// Ascending sort
function Ascending() {
  arrCards.sort(compare);
  $("#main0").empty();
  $.each(arrCards, function(key, value) {
    value.card.appendTo($("#main0"));
    addCard(key);
  });
  $("#profile0").attr("src", arr["urlIMG"][0]);
}
// compare by name
function compare(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
//get number from id
function getID(id) {
  for (let i = 0; i < id.length; i++) {
    if (!isNaN(id[i])) {
      return i;
    }
  }
}
