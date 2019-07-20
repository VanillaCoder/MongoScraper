$.getJSON("/articles", function (data) {
    for (let i = 0; i < 20; i++) {
        $("#articles").append("<p data-id=" + data[i]._id + ">" + data[i].title + "<br/>" + data[i].link + "</p> <button data-id=" + data[i]._id + "  type=\"submit\" class=\"btn btn-primary\">Add note</button> <input id=" + data[i]._id + ">")
        if (data[i].note) {
            $("#articles").append("<p> Note: " + data[i].note.body + "</p>")
        }
    }
});


$(function () {

    $(document).on("click", ".btn", function () {
        console.log($(this).data("id"))
        var id = $(this).data("id")
        var notething = $("#" + id).val()
        console.log(notething)
        var note = {
            body: notething
        }
        console.log(note)
        $.ajax("/article/" + id, {
            type: "POST",
            data: note
        })
            .then(location.reload())
    })

})




// "<form class=\"comment\" method=\"post\" action=\"/article/" + data[i]._id + "\" >" + "<div class=\"form-group\"><input name=\"note\" class=\"form-control\" aria-describedby=\"addNote\" placeholder=\"Enter note\"> </div> <button type=\"submit\" class=\"btn btn-primary\">Submit</button> </form>