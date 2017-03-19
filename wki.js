$("#searchBtn").on('click', function(event){
  console.log("clicked the button");
  $("#mainDisp").empty();
  searchFx()
  })

$("#searchFor").keypress(function(e){
  if (e.which == 13){
    $("#searchBtn").click();
  }
})
                   
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
  
  for (var i =0; i < replyLength; i++){
    updateView(title[i], snippet[i], hLink[i]);
  }
}

function updateView(title, snippet, hLink){
  var mainDisp = document.getElementById('mainDisp');
  
  var titleMessageElement = document.createElement('p');
  var titleDisp = document.createTextNode(title);
  titleMessageElement.className = "retTitle";
  
  var snippetMessageElement = document.createElement('p');
  var snippetDisp = document.createTextNode(snippet);
  
  var linkMessageElement = document.createElement('a');
  linkMessageElement.setAttribute('href', hLink);
  linkMessageElement.innerHTML = hLink;
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


