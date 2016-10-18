$("#searchFor").autocomplete({
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                 response(data[1]);
            }
        })
      },
//      after: $('#mainDisp'),
//    appendTo: $('#mainDisp'), 
//    position: {my:"left top", at: 'left bottom', of: "#mainDisp"},
    select: function(event, ui){
      var fistOfFirst = ui.item.label;
      console.log(fistOfFirst);
      $("#mainDisp").empty();
      searchFx();
}
})

$("#searchBtn").on('click', function(event){
  $("#mainDisp").empty();
  searchFx()
  });
                   
function searchFx(){
    var searchInput = $('#searchFor').val();
    var tgtSite = "https://en.wikipedia.org/w/api.php?action=opensearch&list=search&srwhat=text&srprop=snippet&utf8=1&continue=&format=json&search=" + searchInput;
    sendRequest(tgtSite);
}

function sendRequest(tgtSite){
    $.ajax({
      url: tgtSite,
      dataType: 'jsonp',
      data: { 
        q:{}, 
        format: 'json' },
        success: organizeData })
}

function organizeData(data){
  if (typeof(data) != "object") {
    updateView("Please retry term");
  }
  var title, snippet, hLink, replyLength, singleReply;
  title = data[1];
  snippet = data[2];
  hLink = data[3];
  replyLength = title.length;
  singleReply = [];
  
  for (var i = 0; i < replyLength; i++){
    singleReply.push(title[i]);
    singleReply.push(snippet[i]);
    singleReply.push(hLink[i]);
    updateView(singleReply);
    singleReply = [];
  }
}

function updateView(queryReply){
  var mainDisp = document.getElementById('mainDisp');
  
  var titleMessageElement = document.createElement('p');
  var titleDisp = document.createTextNode(queryReply[0]);
  titleMessageElement.className = "retTitle";
  
  var snippetMessageElement = document.createElement('p');
  var snippetDisp = document.createTextNode(queryReply[1]);
  
  var linkMessageElement = document.createElement('a');
  linkMessageElement.setAttribute('href', queryReply[2]);
  linkMessageElement.innerHTML = queryReply[2];
  linkMessageElement.className = 'linkFormat';
  
  var outShell = document.createElement('div');
  var innShell = document.createElement('div'); 
  outShell.className = "outerShell";
  innShell.className = 'innerShell';
  
  titleMessageElement.appendChild(titleDisp);
  snippetMessageElement.appendChild(snippetDisp);
  
  innShell.appendChild(titleMessageElement);
  innShell.appendChild(snippetMessageElement);
  innShell.appendChild(linkMessageElement);
  
  outShell.appendChild(innShell);
  
  mainDisp.appendChild(outShell);
}


