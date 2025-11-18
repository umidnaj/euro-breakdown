# Euro-Stückelung

Dieses Projekt ist im Rahmen eines Bewerbungsprozesses entstanden.
Die Anwendung berechnet für einen eingegebenen Euro-Betrag eine Stückelung in Scheine und Münzen. Dabei werden immer die größtmöglichen Denominationen zuerst verwendet. Zusätzlich wird bei jeder neuen Berechnung die Differenz zur vorherigen Stückelung angezeigt.

Die Berechnung kann wahlweise im Frontend (Angular) oder im Backend (Spring Boot) erfolgen; die Umschaltung erfolgt über die Oberfläche.

## Tech-Stack

* Angular (Standalone Components, TypeScript)
* Spring Boot (Java, Maven)
* REST-API für die Kommunikation zwischen Frontend und Backend

## Projektstruktur

* euro-app/ – Angular-Frontend
* euro-backend/ – Spring-Boot-Backend

## Starten

Backend:

cd euro-backend
mvn spring-boot:run

Frontend:

cd euro-app
npm install
ng serve


Frontend: http://localhost:4200
Backend-API: http://localhost:8080/api/breakdown
