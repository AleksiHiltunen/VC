var socket = io();

council_colors = {
  "environment":"#66FF66",
  "economy":"#66B2FF",
  "culture":"#FFB2FF"
}

//socket.emit('request councils update');

///////////////////////////////////////////
//CLICKS
//////////////////////////////////////////
$('#ETUSIVU').click(function(){
  home();
});

$('#Etusivu').click(function(){
  home();
});
$('#digiraati_logo').click(function(){
  home();
});

$('#REKISTER_IDY').click(function(){
  goToPage("/register");
});

$('#Rekister_idy').click(function(){
  goToPage("/register");
});

socket.on('councils update', function(all_councils){
  display_councils(all_councils);
});

function home(){
  goToPage("/");
}

function display_councils(councils){
  var councils_element = document.getElementById('list_of_councils');
  clear_child_elements(councils_element);
  for(i = 0; i < councils.length; ++i){
    var new_elem = document.createElement("a");
    new_elem.id = councils[i]["id"];
    new_elem.onclick = function(){ open_council_frontpage(this.id); }
    new_elem.innerHTML = "<h2>"+ councils[i]["name"]+"</h2>";
    new_elem.classList.add("council_element");
    councils_element.appendChild(new_elem);
  }
}

function create_new_council_clicked(){
  var modal = document.getElementById('new_council_modal');
  modal.style.display = "block";
  //create_test_raati();
}

function cancel_council_modal(){
  document.getElementById('council_name').value = "";
  document.getElementById('council_description').value = "";
  var modal = document.getElementById('new_council_modal');
  modal.style.display = "none";
}

function create_raati(){
  var id = makeid(10);
  var name = document.getElementById('council_name').value;
  var description = document.getElementById('council_description').value;
  var startdate = document.getElementById('council_start_date').value;
  var starttime = document.getElementById('council_start_time').value;
  var enddate = document.getElementById('council_end_date').value;
  var endtime = document.getElementById('council_end_time').value;
  var keywords = document.getElementById('council_keywords').value;
  if(name.length == 0){
    console.log("Give Council a name");
    return;
  }
  if(logged_in.length == 0){
    console.log("Log in to create a council");
    return;
  }

  var info = {"id":id, "name":name, "creator":logged_in,
              "description":description, "startdate":startdate,
              "starttime":starttime, "endtime":endtime,
              "enddate":enddate, "keywords":keywords };
  cancel_council_modal();
  socket.emit('council create attempt', info);

}
