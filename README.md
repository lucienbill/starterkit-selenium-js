# Vrac

Il faut que j'écrive un article sur mon site
Une liste de trucs et astuces pour js/ts + selenium :

- upload : path.resolve
- mocha + capture d'écran auto
- headless
- page object model expliqué simplement
- chromedriver dans le path
- mocha, describe et it (but : lisibilité du rapport)
  - note : j'aurais pu utiliser cucumber, je ne l'ai pas fait. La Terre tourne toujours
- ouvrir une page HTML locale

# Selenium + NodeJS : trucs et astuces

Bonjour 👋

Si vous tombez sur cet article, c'est probablement parce que vous cherchez à automatiser des choses (des tests, une suite d'actions) avec Selenium et NodeJS.
J'utilise ces technologies quasi-quotidiennement en ce moment, et j'ai noté quelques astuces qui pourraient vous servir et qui ne sont pas si simples à trouver sur StackOverflow.

## Les bases : de quoi je parle ?

Selenium = ? Node JS = ? Ce que j'en fait = automatisation de tests
Il existe d'autres outils Watir, RoboFramework, UIPath, Squish...

## Mes conseils

### Typescript

Si possible : faites du typescript. TS Handbook -> lisez le, vous apprendrez à minima à faire du JS plus robuste.
Pk TS ?

### Organisez votre code

- Organisez votre code -> mocha. Utile au dela des tests : rapport d'exécution HTML -> même pour du RPA ça sert
- Mocha, describe et it (but : lisibilité du rapport)
  - note : j'aurais pu utiliser cucumber, je ne l'ai pas fait. La Terre tourne toujours
- Mocha + capture d'écran auto
- page object model expliqué simplement

### Trucs techniques communs

- chromedriver dans le path
- headless
- upload : path.resolve
- ouvrir une page HTML locale

### Bonus

Projet Boilerplate : Selenium + mocha + chai + mochawesome

- avec tous les trucs implémentés ci dessus
- version JS, et TS

package.json : chromedriver : la version doit matcher celle de votre machine pour fonctionner.
