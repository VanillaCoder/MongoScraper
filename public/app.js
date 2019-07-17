$.getJSON("/articles", function (data) {
    for (let i = 0; i < 20; i++) {
        console.log(data[i])
        $("#articles").append("<p data-id=" + data[i]._id + ">" + data[i].title + "<br/>" + data[i].link + "</p>" + "<button data-id=" + data[i]._id + "\" type=\"button\" class=\"btn btn-dark\">Add Note</button>");
    }
});

