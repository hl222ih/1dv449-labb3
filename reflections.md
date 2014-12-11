##Reflektioner##

Vad finns det för krav du måste anpassa dig efter i de olika API:erna?
Googles API har krav på hur API-nyckeln hanteras och en maxgräns på antal förfrågningar.
Sveriges Radio vill att man ska vara "snäll" mot deras API.

Hur och hur länge cachar du ditt data för att slippa anropa API:erna i onödan?
Jag cachar data 10 minuter på den egna servern så att anrop till Sveriges Radio
inte sker oftare än var 10:e minut oavsett hur många som använder applikationen.

Vad finns det för risker med din applikation?
Färre risker i och med att hantering av användaruppgifter inte behövs.

Hur har du tänkt kring säkerheten i din applikation?
Jag använder header-token för att undvika direktaccess till messages.php. Jag har configurerat Web.config för att
stänga för dirlisting och läsning av txt-filer. Jag lagrar googles api-nyckel i en fil på servern vilket jag inbillar
mig ger större säkerhet (renderas i <head>-taggen).

Hur har du tänkt kring optimeringen i din applikation?
Har tyvärr inte hunnit lägga så mycket tid på det. Jag använder Jquery och Bootstraps minifierade versioner via CDN,
annars består applikationen inte av några bilder e.d. som behöver komprimeras och mycket lite kod och få filer. Det mesta
är nog kommunikationen med Google Maps API.
