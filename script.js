/* =====================================================
   FANTASY WORLD
   PREMIER LEAGUE 2030
   20 CLUBS • 38 MATCHWEEKS • 380 MATCHES
===================================================== */


/* ===============================
   CLUB DATABASE
================================ */

const clubs = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Chelsea",
    "Coventry", 
   "Crystal Palace",
    "Everton",
    "Fulham",
    "Hull",
    "Ipswich",
   "Leeds United",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sunderland",
    "Tottenham",
    
    
];


/* =====================================================
   2030 MATCHWEEK DATES
===================================================== */

const matchweekDates = [

    // FIRST HALF
    "05 AUG",
    "12 AUG",
    "19 AUG",
    "26 AUG",
    "02 SEP",
    "09 SEP",
    "16 SEP",
    "23 SEP",
    "30 SEP",
    "07 OCT",
    "14 OCT",
    "21 OCT",
    "28 OCT",
    "04 NOV",
    "11 NOV",
    "18 NOV",
    "25 NOV",
    "16 DEC",
    "30 DEC",

    // SECOND HALF
    "03 JAN",
    "10 JAN",
    "17 JAN",
    "24 JAN",
    "31 JAN",
    "07 FEB",
    "14 FEB",
    "21 FEB",
    "28 FEB",
    "07 MAR",
    "14 MAR",
    "21 MAR",
    "28 MAR",
    "04 APR",
    "11 APR",
    "18 APR",
    "25 APR",
    "09 MAY",
    "30 MAY"
];


/* =====================================================
   CREATE A TRUE ROUND-ROBIN FIXTURE LIST
=====================================================

20 teams
19 rounds in first half
19 rounds in second half

Every team:
- plays once per matchweek
- faces every opponent once in MW1-19
- faces every opponent again in MW20-38
===================================================== */


function generateFirstHalfFixtures(teamList) {

    let teams = [...teamList];

    const rounds = [];

    for (let round = 0; round < teams.length - 1; round++) {

        const matches = [];

        for (let i = 0; i < teams.length / 2; i++) {

            const home = teams[i];
            const away = teams[teams.length - 1 - i];

            matches.push({
                home: home,
                away: away
            });

        }

        rounds.push(matches);

        // Circle method
        const fixed = teams[0];

        const rotating = teams.slice(1);

        rotating.unshift(rotating.pop());

        teams = [fixed, ...rotating];
    }

    return rounds;
}


/* ===============================
   FIRST HALF
================================ */

const firstHalf = generateFirstHalfFixtures(clubs);


/* ===============================
   SECOND HALF
   Reverse every fixture
================================ */

const secondHalf = firstHalf.map(round => {

    return round.map(match => {

        return {
            home: match.away,
            away: match.home
        };

    });

});


/* ===============================
   COMBINE ALL 38 MATCHWEEKS
================================ */

const allMatchweeks = [
    ...firstHalf,
    ...secondHalf
];


/* =====================================================
   VERIFY FIXTURE SYSTEM
===================================================== */

function verifyFixtures() {

    console.log("Fantasy World fixture verification");

    console.log(
        "Matchweeks:",
        allMatchweeks.length
    );

    console.log(
        "Total matches:",
        allMatchweeks.length * 10
    );

    clubs.forEach(club => {

        let appearances = 0;

        allMatchweeks.forEach(round => {

            round.forEach(match => {

                if (
                    match.home === club ||
                    match.away === club
                ) {
                    appearances++;
                }

            });

        });

        console.log(
            club + ": " + appearances + " matches"
        );

    });

}


/* =====================================================
   TABLE
   EVERYTHING STARTS AT ZERO
===================================================== */

const tableData = clubs.map((club, index) => {

    return {
        position: index + 1,
        club: club,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0
    };

});


/* =====================================================
   OPEN TABLE
===================================================== */

function openTable() {

    const table = document.getElementById("leagueTable");

    table.innerHTML = "";


    tableData.forEach(team => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td>
                ${team.position}
            </td>

            <td>
                ${team.club}
            </td>

            <td>
                ${team.played}
            </td>

            <td>
                ${team.wins}
            </td>

            <td>
                ${team.draws}
            </td>

            <td>
                ${team.losses}
            </td>

            <td>
                ${team.gf}
            </td>

            <td>
                ${team.ga}
            </td>

            <td>
                ${team.gd}
            </td>

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


/* =====================================================
   OPEN FIXTURES
===================================================== */

function openFixtures() {

    const container =
        document.getElementById("fixturesList");

    container.innerHTML = "";


    allMatchweeks.forEach((round, index) => {

        const matchweek = index + 1;

        const date = matchweekDates[index];


        const week = document.createElement("div");

        week.className = "matchweek";


        week.innerHTML = `

            <div class="matchweek-header">

                <div>

                    <small>
                        PREMIER LEAGUE 2030
                    </small>

                    <h3>
                        MATCHWEEK ${matchweek}
                    </h3>

                </div>

                <strong>
                    ${date}
                </strong>

            </div>

        `;


        round.forEach(match => {

            const fixture =
                document.createElement("div");

            fixture.className = "fixture";


            fixture.innerHTML = `

                <div class="fixture-teams">

                    <span>
                        ${match.home}
                    </span>

                    <strong>
                        VS
                    </strong>

                    <span>
                        ${match.away}
                    </span>

                </div>

                <div class="fixture-status">
                    UPCOMING
                </div>

            `;


            week.appendChild(fixture);

        });


        container.appendChild(week);

    });


    document
        .getElementById("fixturesModal")
        .classList.add("active");
}


/* =====================================================
   CLOSE MODALS
===================================================== */

function closeModals() {

    document
        .getElementById("tableModal")
        .classList.remove("active");


    document
        .getElementById("fixturesModal")
        .classList.remove("active");

}


/* =====================================================
   CLICK OUTSIDE MODAL
===================================================== */

window.addEventListener("click", function(event) {

    if (
        event.target.id === "tableModal" ||
        event.target.id === "fixturesModal"
    ) {

        closeModals();

    }

});


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModals();

    }

});


/* =====================================================
   SCROLL TO CLUBS
===================================================== */

function scrollToClubs() {

    document
        .getElementById("clubs")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   RUN FIXTURE CHECK
===================================================== */

verifyFixtures();
