var db = require("../models")
var path = require("path")
module.exports = function (app) {


  app.get("/scrape", function (req, res) {

    axios.get("http://www.foxnews.com/").then(function (response) {

    var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function (req, res) {
    // Grab every document in the Articles collection

    db.Article.find({})
      .populate("note")
      .then(function (dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/articles/:id", function (req, res) {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Route for saving/updating an Article's associated Note
  app.post("/article/:id", function (req, res) {

    let newNote = {};
    newNote.body = req.body.body;
    console.log(newNote)
    db.Note.create(newNote)
      .then(function (dbNote) {
        console.log(dbNote)

        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote }, { new: true });
      })
      .then(function (dbArticle) {

        res.send("Note added")
      })
      .catch(function (err) {

        res.json(err);
      });
  });



}