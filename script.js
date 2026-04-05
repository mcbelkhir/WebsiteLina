// ------------------------
// Functie om reviews te valideren en plaatsen
// ------------------------
function geldigeEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function voegReviewToe() {
    let reviewNaam = document.getElementById("reviewNaam");
    let reviewEmail = document.getElementById("reviewEmail");
    let reviewTekst = document.getElementById("reviewTekst");
    let reviewSterren = document.getElementById("reviewSterren");

    if (!reviewNaam || !reviewEmail || !reviewTekst || !reviewSterren) return;

    let naam = reviewNaam.value;
    let email = reviewEmail.value;
    let tekst = reviewTekst.value;
    let sterren = reviewSterren.value;

    if (!naam || !email || !tekst) {
        alert("Vul alles in!");
        return;
    }

    if (!geldigeEmail(email)) {
        alert("Geen geldig e-mailadres!");
        return;
    }

    // Max 2 reviews per dag
    let vandaag = new Date().toDateString();
    let data = JSON.parse(localStorage.getItem("review_dag")) || { datum: vandaag, aantal: 0 };

    if (data.datum !== vandaag) {
        data = { datum: vandaag, aantal: 0 };
    }

    if (data.aantal >= 3) {
        alert("Maximum 2 reviews per dag toegestaan.");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({ naam, tekst, sterren });
    localStorage.setItem("reviews", JSON.stringify(reviews));

    data.aantal++;
    localStorage.setItem("review_dag", JSON.stringify(data));

    toonReviews();
}

// ------------------------
// Toon reviews op pagina
// ------------------------
function toonReviews() {
    let container = document.getElementById("reviews");
    if (!container) return;

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    if (reviews.length === 0) {
        container.innerHTML = "Nog geen reviews.";
        return;
    }

    container.innerHTML = "";
    reviews.forEach(r => {
        let sterren = "⭐".repeat(r.sterren);
        container.innerHTML += `
            <p>
                <b>${r.naam}</b><br>
                ${sterren}<br>
                ${r.tekst}
            </p>
            <hr>
        `;
    });
}
// ------------------------
// Functie voor reservatie
// ------------------------
function reserveer() {
	
    let naamElem = document.getElementById("naam");
    let personenElem = document.getElementById("personen");
    let emailElem = document.getElementById("email");
   
    let tijdElem = document.getElementById("tijd").value;  // Haal de tijd op	
    if (tijdElem < "07:00" || tijdElem > "23:00") {
        alert("Kies een tijd tussen 07:00 en 23:00");
        return;
    }
		
	
    let datumElem = document.getElementById("datum"); // Haal de datum op
    let meldingElem = document.getElementById("melding");

    if (!naamElem || !personenElem || !emailElem || !meldingElem || !tijdElem || !datumElem) return;

    let naam = naamElem.value.trim();
    let personen = personenElem.value.trim();
    let email = emailElem.value.trim();
    let tijd = tijdElem.value.trim();
    let datum = datumElem.value.trim();

    if (!naam || !personen || !email || !tijd || !datum) {  // Controleer of alle velden zijn ingevuld
        meldingElem.innerText = "Vul alle velden in!";
        return;
    }

    if (!geldigeEmail(email)) {
        meldingElem.innerText = "Geen geldig e-mailadres!";
        return;
    }

    // Controleer of de datum in de toekomst ligt
    let huidigeDatum = new Date();
    let geselecteerdeDatum = new Date(datum);
    
    // Zet de tijd van de geselecteerde datum op 00:00 om alleen de datum te vergelijken
    geselecteerdeDatum.setHours(0, 0, 0, 0);

    if (geselecteerdeDatum < huidigeDatum) {
        meldingElem.innerText = "De geselecteerde datum moet in de toekomst liggen!";
        return;
    }

    // Controleer of de tijd in de toekomst ligt
    let geselecteerdeTijd = new Date(geselecteerdeDatum);  // Gebruik de geselecteerde datum als basis
    let tijdArray = tijd.split(":");
    geselecteerdeTijd.setHours(tijdArray[0]);
    geselecteerdeTijd.setMinutes(tijdArray[1]);

    if (geselecteerdeTijd <= huidigeDatum) {
        meldingElem.innerText = "De geselecteerde tijd moet in de toekomst liggen!";
        return;
    }

    meldingElem.innerText = "Reservatie bevestigd voor " + naam + 
                            " (" + personen + " personen) op " + datum + " om " + tijd + ".";
}

// ------------------------
// Init: toon reviews als element bestaat
// ------------------------
document.addEventListener("DOMContentLoaded", () => {
    toonReviews();
});
let slideIndex = 0;

function toonSlides() {
    let slides = document.getElementsByClassName("slide");

    if (slides.length === 0) return;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(toonSlides, 3000); // wissel elke 3 sec
}

document.addEventListener("DOMContentLoaded", toonSlides);