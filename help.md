1. Index Route
--> /campgrounds    [get]
--> Showing all the campgrounds.
--> Using find() fro mongoose to get all the items in the collection.
--> collectionname.find({},function(err,allcamps){
    if(!error)
    {
        res.render("allcamps.ejs",{campgs:allcamps});
    }
});
--> So allcamps is the array kind of thing returned from the database that stores the info
We pass it into ejs file which uses it

2. New Route
--> /newcamp
--> res.render an ejs file containing the form
--> form has action as a /campgrounds and method as POST

3. Create Route
--> /campgrounds [post] 
--> Gets all the info from the form using the req parameter passed into the callback 
function of post request.
--> Saves the info into variables and add the info into Database using create()
--> Also redirect to index page after adding a new Campground

4. Show Route
--> /campgrounds/:id
--> Shows information about campgrounds specific to their ids
--> res. renders to a show page
--> first we search for the particular entry in the database by their ID using collectionname.findById
--> We get the id as a request using the button on index page.
--> Code for Button:-
<a href="/campgrounds/<%=campgs._id%>" class="btn btn.....">More Info</a>
Here, campgs is the parameter in the .forEach function().
--> Now the id is available to the SHOW route through req.params.id

--> After getting ID apply findById(req.params.id,RESPONSE_FROM_DB){
    res.render("showpage.ejs",{campbyid:RESPONSE_FROM_DB});
};

--> After this the ejs page uses RESPONSE_FROM_DB to get title, description, image url, etc....

in short

INDEX ------> ADD NEW ROUTE -------> FORM -------> DATABASE -------> RETREIVED THAT DATA -------> DISPLAY ON INDEX --------> ADD BUTTON FOR MORE INFO --------> REDIRECT TO URL WITH THE ID ---------> EXTRACT THE ID --------->
APPLY FINDBYID ----------> GET THE DESIRED ELE FROM THE COLLECTION ----------> SEND IT INTO EJS FILE FOR MORE INFO ---------> DISPLAY THE CONTENTS.