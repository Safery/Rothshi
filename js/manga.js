function getQueryVariable(variable){ 
	var query = window.location.search.substring(1); 
	var vars = query.split("&"); 
	for (var i=0;i<vars.length;i++){ 
		var pair = vars[i].split("="); 
		if (pair[0] == variable){ 
			return pair[1]; 
		} 
	}
	return -1; //not found 
}

function Gen_desc(json){
	var div = document.getElementById('cover_desc');
	// Generate Picture
	var new_img = new Image();
	new_img.src = json["imageURL"];
	new_img.id = "cover_image";
	div.appendChild(new_img);
	
	// Generate title and description.
	var title = document.createElement("h1");
	title.innerHTML = json["title"];
	var desc = document.createElement("p");
	desc.innerHTML = json["description"]
	var size = document.createElement("p");
	size.innerHTML = "<b>Total Chapters: </b>" + json["chapters_len"];
	var release = document.createElement("p");
	release.innerHTML = "<b>Release Date: </b>" + json["released"];
	
	var cato = document.createElement("div");
	for(var key in json["categories"]){
		cato_set = document.createElement("a");
		cato_set.innerHTML = " " + json["categories"][key] + " ";
		cato.appendChild(cato_set);
	}
	cato.id = "categories";
	div.appendChild(title);
	div.appendChild(size);
	div.appendChild(release);
	div.appendChild(desc);
	div.appendChild(cato);

}

function Detail(url){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var myArr = JSON.parse(xhttp.responseText);
			var img_url = "https://cdn.mangaeden.com/mangasimg/";
			// Insert all the Chapters
			var row_counter = 1;
			for(var key in myArr["chapters"]){
				var table_sel = document.getElementById('table table-condensed');
				// Insert chapter name
				var table = document.getElementById("table");
				var row = table.insertRow(1);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);

				cell1.innerHTML = "<a href='view.html?fname=Rothshi&id=" + myArr["chapters"][key][3] + "'><b>" + myArr["chapters"][key][2] + "</b></a>";
				cell2.innerHTML = myArr["chapters"][key][0];
				// Get Publish time.
				var get_time = convertTimestamp(myArr["chapters"][key][1]);


				cell3.innerHTML = get_time;
				row_counter = row_counter + 1;
			}
			// Function to create generate all the descriptions.
			Gen_desc(myArr);
			
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

function GenerateFunct(){
	var get_id = getQueryVariable('id');
	// Create all the chapters table.
	var manga_detail = Detail("https://www.mangaeden.com/api/manga/" + get_id);
}

// Function to create all the Manga picture when users chooses a chapter.
function CreateMangas(){
	var get_id = getQueryVariable('id');
	var url = "https://www.mangaeden.com/api/chapter/" + get_id;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var myArr = JSON.parse(xhttp.responseText);
			var img_url = "https://cdn.mangaeden.com/mangasimg/";
			// Tell user to choose a page to read.
			var myDiv = document.getElementById("sel");
			var selectList = document.createElement("option");
			selectList.innerHTML = "Please choose a page to read from this list."
			selectList.value = "stop";
			myDiv.appendChild(selectList);

			// Insert all the chapters and picture
			for (key in myArr["images"]){
				//Create and append select list
				var selectList = document.createElement("option");
				selectList.innerHTML = myArr["images"][key][0];
				selectList.value = myArr["images"][key][1];
				myDiv.appendChild(selectList);
			}
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send();
}

// Function to generate chapter images.
function update_manga(got_id){
	var CreateImg = new Image();
	var getDiv = document.getElementById("manga_pics");
	$("#manga_pics").empty() // Empty the previous image.
	if (got_id == "stop"){
		var CreateH1 = document.createElement("h1");
		CreateH1.innerHTML = "<center>Please select page to read from the top drop-down box.</center>"
		getDiv.appendChild(CreateH1);

	}
	else{
		CreateImg.src = 'https://cdn.mangaeden.com/mangasimg/' + got_id;
		CreateImg.id = "chapter_img";
		getDiv.appendChild(CreateImg);
	}
}

function Prev_Page(){
	$('#sel option:selected').next().attr('selected', 'selected');
	if ($('#sel').val() != "stop"){
		update_manga($('#sel').val());
	}

}

function Next_Page(){
	$('#sel option:selected').prev().attr('selected', 'selected');
	if ($('#sel').val() != "stop"){
		update_manga($('#sel').val());
	}

}

function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
		yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
		hh = d.getHours(),
		h = hh,
		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
		ampm = 'AM',
		time;
			
	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	}
	
	// ie: 2013-02-18, 8:35 AM	
	time = yyyy + '-' + mm + '-' + dd;
		
	return time;
}
