/**
 * @file app.js
 * @author Samuel Beaulac
 * @date 19/10/2025
 * @brief Application principale Express
 */

const express = require('express');
const path = require('path');

const app = express();

const port = 3000;
const url = `http://localhost:${port}/`

const routes = {
    root : {
        path : '/',
        router : require('./routes/index')
    },
    about : {
        path : '/about',
        router : require('./routes/about')
    },
    contact : { 
        path : '/contact',
        router : require('./routes/contact')
    },
    requete1 : { 
        path : '/requete1',
        router : require('./routes/requete1')
    },
    requete2 : { 
        path : '/requete2',
        router : require('./routes/requete2')
    },
    requete3 : { 
        path : '/requete3',
        router : require('./routes/requete3')
    },
    requete4 : { 
        path : '/requete4',
        router : require('./routes/requete4')
    },
    requete5 : { 
        path : '/requete5',
        router : require('./routes/requete5')
    },
    requete6 : { 
        path : '/requete6',
        router : require('./routes/requete6')
    },
    insert : { 
        path : '/insert',
        router : require('./routes/insert')
    },
    delete : { 
        path : '/delete',
        router : require('./routes/delete')
    }
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

for(const key in routes) 
{
    const obj = routes[key];
    const path = obj.path;
    const route = obj.router;
    app.use(path, route);
}

app.use(function(req, res) {
    res.status(404).render('404');
});

app.listen(port, function() {
    console.log(`Server is running on : ${url}`);
});