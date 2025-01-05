


function fetchData(){


    let cardContainer = document.getElementById("card-container");

    let input = document.getElementById("fetchData").value;
    const url = `https://www.codewars.com/api/v1/users/${input}`;

    fetch(url)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)


        cardContainer.innerHTML += `<div class="card">Username: ${json.username}<br>Name: ${json.name}<br>Clan: ${json.clan}<br>Javascript Rank:${json.ranks.languages.java.rank}</div>`;


    }

    );
}