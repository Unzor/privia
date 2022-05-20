var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    generator = require("./ip-generator");
app.use(express.json()), app.use(require("express-all-allow")());
var fetch = require("node-fetch");

function method(e) {
    var a = "";
    a = "get" == e ? "" : "req.body", app[e]("/" + e, async function(t, r) {
        var s = generator.generate();
        if ("" !== a) fetch(atob(t.query.url), {
            method: e.toUpperCase(),
            body: a,
            headers: {
                "x-forwarded-for": s,
                "x-client-ip": s
            }
        }).then(e => e.text()).then(async e => {
            var a = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + s);
            a = await a.json(), r.send({
                data: e,
                ip_data: a
            })
        }).catch(e => {
            r.status(400).send({
                error: !0,
                message: e.message
            })
        });
        else fetch(atob(t.query.url), {
            method: e.toUpperCase(),
            headers: {
                "x-forwarded-for": s,
                "x-client-ip": s
            }
        }).then(e => e.text()).then(async e => {
            var a = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + s);
            a = await a.json(), r.send({
                data: e,
                ip_data: a
            })
        }).catch(e => {
            r.status(400).send({
                error: !0,
                message: e.message
            })
        })
    })
}
method("get"), method("post"), method("put"), method("delete");
const PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`)
});
