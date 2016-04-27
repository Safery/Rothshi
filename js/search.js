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
						Main_Div.className = "wrapper";

						img.src = img_url + myArr["manga"][key]["im"];
						// Create the thumbnail for each images.
						img.className = "img-thumbnail";
						Main_Div.appendChild(img);
						
						// Create div for the description.
						var divDesc = document.createElement("p");
						divDesc.innerHTML = "Hello";
						divDesc.className = "desc_content";
						Main_Div.appendChild(divDesc);
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
	// Erase everything in the pics element.
	$("#pics").empty();
}