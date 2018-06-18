var subjects = ["Mexican Soccer", "Brazilian Soccer", "German Soccer"];
var searchkey;

// Giphy.com Api Key:
var apiKEY = 'Gm3tQOLOqdjDefZBvFMEykpANaK1W3Zz';

function makebuttons() {
$("#buttonSection").html("");
for (i = 0; i < subjects.length; i++) {
       // $("#buttonSection").append('<button  CLASS="GifButton">' + subjects[i] + '</button>');
    $("#buttonSection").append("<a href='#' class ='GifButton btn btn-success' id='" + subjects[i] + "'>"
        + subjects[i] + "</a>");
    $("#buttonSection").append( "&nbsp;&nbsp;");
       
}
}

    makebuttons(); 

$(document).on("click", '.GifButton', setTopic);
$(document).on("click", '.GifButtonForm', setTopicForm);

function setTopicForm() {
    searchkey = $("#addTopic").val().trim();
    console.log(searchkey);
    if (searchkey !== "") {
    subjects.push(searchkey);
    makebuttons();
    // $("#buttonSection").append("<a href='#' class ='GifButton btn btn-success' id='" + searchkey + "'>"
    // + searchkey + "</a>");
    // $("#buttonSection").append( "&nbsp;&nbsp;");
    getGIFs();   
    }
    else alert("please enter a valid new topic")
}

function setTopic() {
    searchkey=this.text;
    getGIFs();
}



function getGIFs() {

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchkey + "&api_key=" + apiKEY + "&limit=10";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (answer) {

        arrayBack = answer;
        console.log("i just got results");
        console.log(arrayBack);

        var results = answer.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r") {
                var rating = results[i].rating;
                var gifs = $("<div>");
                
                var p = $("<p>").text("Rated: " + rating);

                var imagehere = $("<img>");

                imagehere.attr("src", results[i].images.fixed_height.url);

                gifs.append(p);
                gifs.append(imagehere);

                $("#gifContainer").prepend(imagehere);
                $("#gifContainer").prepend(p);
            }
        }
    });
}
