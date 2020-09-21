# Tresorit - Secure Communication



## Használt technológiák

-  Front-end: Angular  9.1
-  Backend: NodeJS
-  Kommunikáció: Socket.io 
    - OK: Egyszerű kommunikáció a kliensek között.
-  Titkosítás: CryptoJS
    - OK: A library támogatja az AES256 CFB-t, illetve a HMAC SHA1-et. Nem kellett külön IV-et, salt-ot számolni, mert a lib automatikusan megcsinálja.
-  Extra: ngx-clipboard
    - OK: Gombnyomásra vágólapra tud másolni szöveget

## Megvalósítás

- A specifikációt követve a CryptoJS segítségével generáltam 256bites kulcsot. A biztonság érdekében 2-t is generáltam. Az egyik segítségével titkosításra kerül az üzenet, a másik segítségével pedig biztosítva van az integritásvédelem. 
- Ezután a fogadó félnek elküldődik az üzenet, illetve a HMAC. 
- A fogadó fél a kulcs segítségével kiszámolja újra a hash-t és ha az megegyezik a kapott hash-el akkor kititkosítja az üzenetet és megjeleníti a képernyőn.

## TODO

-   Enter küldés implementálása
-   Mivel a feladatkiírás szerint egy időben csak 1 küldő és egy fogadó félre kell felkészülni, ezért a Specifikációnak megfelel az alkalmazás. Ha tovább kellene fejleszteni, akkor a szerver oldali kommunikációt szükséges javítani, ugyanis esetleges több fél kommunikációja közben minden fogadónak minden módosítást elküld az alkalmazás és csak kliens oldalon kerül eldobásra a felesleges információt.


