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

				cell1.innerHTML = myArr["chapters"][key][2];
				cell2.innerHTML = myArr["chapters"][key][0];
				cell3.innerHTML = myArr["chapters"][key][3];
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
