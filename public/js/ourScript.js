window.onload = function () {

    // load players available in the market
    if (document.querySelector('#showPlayerMarket') != null) {
        let playerListTemplate = Handlebars.compile(`
        {{#each on_request}}   
            <div class="card player-card">
                <img class="card-img-top img-fluid" src="{{img}}" width='220px' height='220px'alt="Player picture">
                <div class="card-block">
                    <h4 class="card-title">{{username}}</h4>
                    <p class="card-text">Position: {{position}}</p>
                    <p class="card-text">Location: {{location}}</p>
                    <form class="sendRequest" name="myform">
                        <input type="text" name="player" value={{email}} class="d-none">
                        <input type="submit" class="btn btn-danger btn-block" value="Cancel request" id="message">
                    </form>    
                </div>
            </div>       
        {{/each}}    
        {{#each non_request}}   
            <div class="card player-card">
                <img class="card-img-top img-fluid" src="{{img}}" width='220px' height='220px'alt="Player picture">
                <div class="card-block">
                    <h4 class="card-title">{{username}}</h4>
                    <p class="card-text">Position: {{position}}</p>
                    <p class="card-text">Location: {{location}}</p>
                    <form class="sendRequest" name="myform">
                        <input type="text" name="player" value={{email}} class="d-none">
                        <input type="submit" class="btn btn-primary btn-block" value="Invite to join" id="message">
                    </form>    
                </div>
            </div>       
        {{/each}}
       
            `);


        let playerlist = document.querySelector('#playerslist');

        function loadPlayerMarket(players) {
            playerlist.innerHTML = playerListTemplate({
                non_request: players.non_request,
                on_request: players.on_request
            });

        }
        function clearPlayerMarket() {
            playerlist.innerHTML = "";
        }
        let counter = 1;
        let playerMarket = document.querySelector('#showPlayerMarket');
        playerMarket.addEventListener('click', (e) => {
            e.preventDefault();

            if (counter % 2 == 1) {
                counter++;
                playerMarket.innerHTML = "Hide players";
                fetch('/api/players')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log("daaataaaa", data);
                        loadPlayerMarket(data);
                    })
                    .then(() => {
                        sendRequestToJoin();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                counter++;
                playerMarket.innerHTML = "Show available players";
                clearPlayerMarket();
            }
        })


        // send request to join
        function sendRequestToJoin() {
            let sendRequest = document.querySelectorAll('.sendRequest');


            console.log("send request,", sendRequest);
            for (let i = 0; i < sendRequest.length; i++) {

                sendRequest[i].addEventListener('submit', (e) => {
                    e.preventDefault();

                    if (sendRequest[i].querySelector('#message').value == "Invite to join") {

                        const data = new URLSearchParams();
                        for (const pair of new FormData(sendRequest[i])) {
                            data.append(pair[0], pair[1]);
                        }
                        fetch("/sendRequest/", {
                            method: 'POST',
                            body: data
                        }).then((response) => {
                            sendRequest[i].querySelector('#message').value = "Cancel request";
                            sendRequest[i].querySelector('#message').classList.remove("btn-primary");
                            sendRequest[i].querySelector('#message').classList.add("btn-danger");
                            console.log(response);
                        }).catch((err) => console.log(err));
                    }
                    // cancel request to join
                    else {

                        const data = new URLSearchParams();
                        for (const pair of new FormData(sendRequest[i])) {
                            data.append(pair[0], pair[1]);
                        }
                        console.log("cancel request", sendRequest[i]);
                        fetch("/cancelRequest/", {
                            method: 'POST',
                            body: data
                        }).then((response) => {
                            sendRequest[i].querySelector('#message').value = "Invite to join";
                            sendRequest[i].querySelector('#message').classList.remove("btn-danger");
                            sendRequest[i].querySelector('#message').classList.add("btn-primary");

                        })
                            .catch((err) => console.log(err));
                    }
                })
            }
        }

    }
    // end of loading players in market..

}




