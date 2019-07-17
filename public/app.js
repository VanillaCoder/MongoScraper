$.getJSON("/articles", function (data) {
    for (let i = 0; i < 20; i++) {
        console.log(data[i])
        $("#articles").append("<p data-id=" + data[i]._id + ">" + data[i].title + "<br/>" + data[i].link + "</p>" +  "<div class=\"input-group mb-3\"> <div class=\"input-group-prepend\"><button data-id" + data[i]._id + "class=\"btn btn-outline-secondary\" type=\"button\" id=\"button-addon1\">Button</button></div><input type=\"text\" class=\"form-control\" placeholder=\"\" aria-label=\"Example text with button addon\" aria-describedby=\"button-addon1\"></div>");
    }
});

