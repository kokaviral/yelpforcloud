var mongoose    =   require("mongoose");
var campgrounds =   require("./models/campgrounds");
var comment     =   require("./models/comment");   

var data    =   [
    {
        name: "Seed Data 1",
        image:  "https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg",
        description:    "Seeding description"
    },
    {
        name: "Seed Data 2",
        image:  "https://media-cdn.tripadvisor.com/media/photo-s/0d/af/56/87/p-20161120-082658-largejpg.jpg",
        description:    "Seeding description"
    },
    {
        name: "Seed Data 3",
        image:  "https://www.camping.hr/cmsmedia/katalog/724/140-camp-turist-indian-tents.jpg",
        description:    "Seeding description"
    }

]

function seedDB(){
    campgrounds.remove({},function(err){
        if(err)
        {
            console.log(err);
        }
        console.log("Removed Campgrounds");
        data.forEach(function(seed){
            campgrounds.create(seed,function(err,data){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    console.log("created campground");
                }
                //creating a comment
                comment.create({
                    text:   "Seed Comment",
                    author: "Lax"
                }, function(err,comment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        data.comment.push(comment);
                        data.save();
                        console.log("Created a new comment");
                    }
                    
                });
                
            });
        });
    });
    
}



module.exports  =   seedDB;