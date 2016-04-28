function Search(){
	// Run function to erase previous searched results.
	Delete_Prev_Search();
	var search_url = "https://www.mangaeden.com/api/list/0/";
	var search_text = document.getElementById("search_m").value;
	// Ajax request
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var myArr = JSON.parse(xhttp.responseText);
			var img_url = "https://cdn.mangaeden.com/mangasimg/";
			for(var key in myArr["manga"]){
				var result = myArr["manga"][key]["a"].indexOf(search_text) > -1;
				if (result == true){
					// Print the searched image.
					var img = new Image();
					var div = document.getElementById('pics');
					if (myArr["manga"][key]["im"] != null){
						// Main Div file.
						var Main_Div = document.createElement("div");
						var CreateA = document.createElement("a");
						CreateA.href = "pages/manga.html?fname=Test&id=" + myArr["manga"][key]["i"];
						Main_Div.className = "wrapper";

						img.src = img_url + myArr["manga"][key]["im"];
						// Create the thumbnail for each images.
						img.className = "img-thumbnail";
						CreateA.appendChild(img);
						
						// Create div for the description.
						var divDesc = document.createElement("p");
						divDesc.innerHTML = myArr["manga"][key]["t"]; // Name of the Manga
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

function Delete_Prev_Search(){
	// Hide the front page element.
	$("#front").empty();

	// Erase everything in the pics element.
	$("#pics").empty();
}

function Search_M(){
	window.location.replace("../index.html");
}
