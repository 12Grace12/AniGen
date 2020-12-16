// Year
var d = new Date();
var year = d.getFullYear();

$('#title-season').html('Anime');

if ( $(window).width() >= 1024 ) {
    $('#input-mobile').html('')
}




// Genre Function 
// function animeGenre(id) {
//     $('#middle-content').empty();
//     $.getJSON('https://api.jikan.moe/v3/genre/anime/'+ id, function(data) {
//         let result = data.anime;
//         // console.log(result);
//         var ani = [];

//         $.each(result, function(i, data) {
            
//             ani.push(data);
           



            
            

//             if( i >= 32 ) {
//                 return;
//             }
//             // $('#middle-content').append(`
//             // <div class="col-md-3 col-6 mb-4">
//             //     <div id="detail-anime" data-id="`+ data.mal_id +`" class="img-poster" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
//             //         background-image: url(`+ data.image_url +`);
//             //         background-position: center;
//             //         background-size: cover;
//             //     ">
//             //     </div>
//             //     <h3>`+ data.title +`</h3>
//             // </div>
//             // `);
//         });


//         x = random_item(ani);
//         $('#middle-content').append(`
//             <div class="col-md-3 col-6 mb-4">
//                 <div id="detail-anime" data-id="`+ x.mal_id +`" class="img-poster" data-toggle="modal" data-target=".bd-example-modal-lg" class="img-poster" style="
//                     background-image: url(`+ x.image_url +`);
//                     background-position: center;
//                     background-size: cover;
//                 ">
//                 </div>
//                 <h3>`+ x.title +`</h3>
//             </div>
//             `);
        


//         console.log(ani)
//         console.log(x)

//     });

// }






// Detail Anime
$('#body').on('click', '#detail-anime',function() {
    console.log("a");

    $('#modal-body').empty();
    console.log("b");

    let id = $(this).data('id');
    console.log("c");

    $.getJSON('https://api.jikan.moe/v3/anime/'+id, function(data) {
        console.log("d");

        if( data.episodes == null ) {
            data.episodes = 'unknow';
        }
        if( data.score == null ) {
            data.score = 'unknow';
        }
        console.log("e");
        
        $('#modal-body').append(`
            <div class="row detail-anime">
                <div class="col-md-4 text-center">
                    <img src="`+ data.image_url +`" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                    <h3 class="title-detail">
                        `+ data.title +`
                    </h3>
                    <p class="durasi">Status : <span>`+ data.status +`</span></p>
                    <p class="durasi">Duration : <span>`+ data.duration +`</span></p>
                    <div class="row mt-2 mb-2">
                        <div class="col-md-3 col-12">
                            <p class="score">Score : <span>`+ data.score +`</span></p>
                        </div>
                        <div class="col-md-4 col-12">
                            <p class="score">Type : <span>`+ data.type +`</span> <span>`+ data.episodes +` eps</span></p>
                        </div>
                        <div class="col-md-5 col-12">
                            <p class="score">Members : <span>`+ data.members +`</span></p>
                        </div>
                    </div>
                    <p class="score">Popularity : <span>`+ data.popularity +`</span></p>
                    <p class="score">Studio :  <span>`+ data.studios[0].name +`</span></p>
                    <div class="synopsis">
                        <p class="score">Synopsis</p>
                        <span>`+ data.synopsis +`</span>
                    </div>
                </div>
                <div class="col-12"> 
                    <div class="row preview">
                        <div class="col-md-12 trailer text-center">
                            <h4>Trailer</h4>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" src="`+ data.trailer_url +`" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        `);
        console.log("hi");
        var xmlhttp = new XMLHttpRequest();
        console.log("bye");
        xmlhttp.open("POST", "https://animegen.herokuapp.com", true);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(data);
        console.log("data has sent!");

    });

}
);




   




