(function ($) {
  console.log($.fn.jquery);

  //   $("#movieName").on("change", function (e) {
  //     console.log(e.target.value);
  //   });

  $("#search").on("click", () => {
    let input = $("#movieName").val();
    if (input === "") {
      console.log("Empty user input");
      return;
    }

    $.ajax("http://www.omdbapi.com/?t=" + input + "&apikey=d099ceab")
      .done(function (resp) {
        console.log(resp);

        let formattedRating = Number(resp.imdbRating) * 10;

        let { Poster, Title, Plot, imdbRating } = resp;

        if (Poster && Title && Plot && imdbRating) {
          $("#searchResult").html(`
            <div class="col-sm">
            <div class="card" style="width: 18rem">
            <img src="${Poster}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${Title}</h5>
                <p class="card-text">
                ${Plot}
                </p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" style="width: ${formattedRating}%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">${formattedRating}%</div>
                </div>
            </div>
            </div>
        </div>
            `);
        } else {
          $("#searchResult").html(`
                <div class="col-sm">
                    Nothing found
                </div>
            `);
        }
      })
      .fail(function (err) {
        console.log(err);
      })
      .always(function () {
        console.log("Api call done");
      });
  });

  //   fetch("http://www.omdbapi.com/?t=titanic&apikey=d099ceab")
  //     .then((resp) => resp.json())
  //     .then((json) => console.log(json));
})(window.jQuery);
