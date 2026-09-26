/* ===============================
   FANTASY WORLD
   PREMIER LEAGUE 2030
================================ */

const clubs = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Leeds United",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sunderland",
    "Tottenham",
    "West Ham",
    "Wolverhampton",
    "Burnley"
];


/* ===============================
   TABLE DATA
================================ */

const tableData = clubs.map((club, index) => {

    const points = Math.max(0, 60 - index * 2);

    return {
        position: index + 1,
        club: club,
        played: 20,
        wins: Math.floor(points / 3),
        draws: 3,
        losses: 20 - Math.floor(points / 3) - 3,
        gd: 25 - index,
        points: points
    };
});


/* ===============================
   OPEN TABLE
================================ */

function openTable() {

    const table = document.getElementById("leagueTable");

    table.innerHTML = "";

    tableData.forEach(team => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${team.position}</td>

            <td>
                ${team.club}
            </td>

            <td>${team.played}</td>

            <td>${team.wins}</td>

            <td>${team.draws}</td>

            <td>${team.losses}</td>

            <td>${team.gd > 0 ? "+" : ""}${team.gd}</td>

            <td class="points">
                ${team.points}
            </td>
        `;

        table.appendChild(row);
    });

    document
        .getElementById("tableModal")
        .classList.add("active");
}


/* ===============================
   FIXTURE DATA
================================ */

const fixtures = [
    ["16 AUG", "Arsenal", "Chelsea"],
    ["23 AUG", "Manchester City", "Liverpool"],
    ["30 AUG", "Manchester United", "Tottenham"],
    ["13 SEP", "Newcastle United", "Arsenal"],
    ["20 SEP", "Chelsea", "Manchester City"],
    ["27 SEP", "Liverpool", "Manchester United"],
    ["04 OCT", "Aston Villa", "Everton"],
    ["18 OCT", "Tottenham", "Brighton"],
    ["25 OCT", "Manchester City", "Arsenal"],
    ["01 NOV", "Chelsea", "Liverpool"]
];


/* ===============================
   OPEN FIXTURES
================================ */

function openFixtures() {

    const container = document.getElementById("fixturesList");

    container.innerHTML = "";

    fixtures.forEach(match => {

        const fixture = document.createElement("div");

        fixture.className = "fixture";

        fixture.innerHTML = `
            <div class="fixture-date">
                ${match[0]}
            </div>

            <div class="fixture-teams">
                ${match[1]}
                <span class="fixture-vs">VS</span>
                ${match[2]}
            </div>

            <div class="fixture-status">
                MATCHWEEK
            </div>
        `;

        container.appendChild(fixture);
    });

    document
        .getElementById("fixturesModal")
        .classList.add("active");
}


/* ===============================
   CLOSE MODALS
================================ */

function closeModals() {

    document
        .getElementById("tableModal")
        .classList.remove("active");

    document
        .getElementById("fixturesModal")
        .classList.remove("active");
}


/* ===============================
   CLOSE WHEN CLICKING OUTSIDE
================================ */

window.addEventListener("click", function(event) {

    if (
        event.target.id === "tableModal" ||
        event.target.id === "fixturesModal"
    ) {
        closeModals();
    }

});


/* ===============================
   ESC KEY
================================ */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModals();
    }

});


/* ===============================
   SCROLL TO CLUBS
================================ */

function scrollToClubs() {

    document
        .getElementById("clubs")
        .scrollIntoView({
            behavior: "smooth"
        });

}
