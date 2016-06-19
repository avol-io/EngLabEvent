# Ciao 
Questo è il repository che sarà usato per gli esercizi. Per ora trovate la struttura base del progetto da scaricare e su cui potete fare degli esperimenti.

##Compiti per casa
Per svolgere i compiti per casa dovete fare un branch del progetto effettuare le modifiche richieste e fare una pull request. La migliore soluzione proposta sarà considerata e inclusa nel progetto.
Vi ricordo che avete 2weekend dopo ogni lab per poter effettuare gli esercizi.

### Lab1: I controller

1. Realizzare una pagina che visualizza gli eventi e da cui è possibile svolgere piccole operazioni (esempio elimina)
2. Realizzare una pagina con cui un utente può registrarsi
3. Quello che pensate possa essere utile


### Lab2: Filtri & Routing

1. L’utente loggato si iscrive ad un evento
2. Vista edit evento a parte
3. Visualizzazione utenti iscritti al sito come vista a parte
4. Filtri di ricerca su utenti ed eventi
5. Quello che pensate possa essere utile

### Lab3: Direttive
Vi ricordo che per facilitarmi il compito di fare il merge conviene che fate le pull appena avete fatto una modifica e non alla fine di tutti gli esercizi. Vi consiglio inoltre di restare sincronizzati con le modifiche che man mano vengono aggiunte per evitare che le vostre modifiche vadino troppo in contrasto con le funzioni già implementate nel frattempo dagli altri e che quindi sia costretto a scartarle apriori. 

1. Realizzare una direttiva (nome: 'lista-eventi') che rappresenti una lista di eventi generica.  (la useremo sia per visualizzare gli eventi disponibili all'interno della pagina eventi sia, ad esempio, gli eventi a cui l'utente sarà registrato quando faremo una pagina con questa funzione)
`<lista-eventi eventi="..."></lista-eventi>`

2. Realizzare una direttiva (nome: 'only-admin') che visualizza l'elemento su cui viene applicata solo se l'utente loggato è un amministratore. (date una sbirciata a come funzione ng-if per fare una cosa simile) `<div only-admin>sono admin</div>` o `<qualsiasi-elemento only-admin>visualizzato solo se admin</qualsiasi-elemento>`.

3. se avete altre idee o dubbi scrivetemi.

##Tools
Vi consiglio di usare Atom come editor con i seguenti plugins:

```
- atom-beautify
- file-icons
- linter
- linter-csslint
- linter-htmlhint
- linter-jscs
- linter-jshint
- linter-sass-lint
- pigments
```

Invece se non avete un server http a disposizione potete usare http-server di node. I passi da seguire sono:

```
1. Installare node (https://nodejs.org/en/)
2. Installare http-server con il comando da terminale npm install -g http-server
3. Aprire nel terminale la cartella contenente gli esercizi ed eseguire il comando http-server
4. Aprire il browser su http://localhost:8080
```

