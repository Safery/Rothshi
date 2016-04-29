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
		cato_set.href = "gen.html?fname=Rothshi&type=cat&Cat=" + json["categories"][key];
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

function Random_Create(){
	alert("hi");
}

function GenerateAns(type){
	if (type == "random"){
		$("#secret").empty();
		var search_url = "https://www.mangaeden.com/api/list/0/";
		// Ajax request
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var myArr = JSON.parse(xhttp.responseText);
			var img_url = "https://cdn.mangaeden.com/mangasimg/";
			var count = 1;
			var div = document.getElementById('front');
			while (count <= 10){
				var img = new Image();
				var key = Math.floor(Math.random() * 16950) + 1;
				// Main Div file.
				var Main_Div = document.createElement("div");
				var CreateA = document.createElement("a");
				CreateA.href = "manga.html?fname=Rothshi&id=" + myArr["manga"][key]["i"];
				Main_Div.className = "wrapper";
				img.src = img_url + myArr["manga"][key]["im"];
				// Create the thumbnail for each images.
				img.className = "img-thumbnail";
				CreateA.appendChild(img);				
				// Create div for the description.
				var divDesc = document.createElement("p");
				divDesc.innerHTML = myArr["manga"][key]["t"].slice(0, 20); // Name of the Manga
				divDesc.className = "desc_content";
				CreateA.appendChild(divDesc)
				Main_Div.appendChild(CreateA);
				// Insert the images inside the main div picture element.
				div.appendChild(Main_Div);
				count = count + 1;
				}
			}
		};
	xhttp.open("GET", search_url, true);
	xhttp.send();
	}
	else if (type == "fav"){
		$("#secret").empty();
		var key = Math.floor(Math.random() * 8) + 1;
		var counter = 0;
		while (counter <= key){
			var h1 = document.createElement("h1");
			var get_div = document.getElementById("front");
			h1.innerHTML = "<center>WE LOVE ALL THE MANGA</center>";
			get_div.appendChild(h1);
			counter = counter + 1;
		}

	}
	else if (type == "EC"){
		$("#secret").show();
	}
	else if (type == "cat"){
		$("#secret").empty();
		Delete_Prev_Search();
		var search_url = "https://www.mangaeden.com/api/list/0/";
		var get_cat = getQueryVariable("Cat");
			// Ajax request
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					var myArr = JSON.parse(xhttp.responseText);
					var img_url = "https://cdn.mangaeden.com/mangasimg/";
					var counter = 0;
					for(var key in myArr["manga"]){
						if (counter == 30){
							break;
						}
						counter = counter + 1;
						var result = myArr["manga"][key]["c"].indexOf(get_cat) > -1;
						if (result == true){
							// Print the searched image.
							var img = new Image();
							var div = document.getElementById('pics');
							if (myArr["manga"][key]["im"] != null){
								// Main Div file.
								var Main_Div = document.createElement("div");
								var CreateA = document.createElement("a");
								CreateA.href = "manga.html?fname=Rothshi&id=" + myArr["manga"][key]["i"];
								Main_Div.className = "wrapper";

								img.src = img_url + myArr["manga"][key]["im"];
								// Create the thumbnail for each images.
								img.className = "img-thumbnail";
								CreateA.appendChild(img);
								
								// Create div for the description.
								var divDesc = document.createElement("p");
								divDesc.innerHTML = myArr["manga"][key]["t"].slice(0, 20); // Name of the Manga
								divDesc.className = "desc_content";
								CreateA.appendChild(divDesc)
								Main_Div.appendChild(CreateA);
								// Insert the images inside the main div picture element.
								div.appendChild(Main_Div);
							}
						}
					}
				}
			};
			xhttp.open("GET", search_url, true);
			xhttp.send();


	}
}
