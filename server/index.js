var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    generator = require("./ip-generator");
app.use(express.json()), app.use(require("express-all-allow")());
var fetch = require("node-fetch");

function method(e) {
    var t;
    t = "get" == e ? "" : "req.body", app[e]("/" + e, async function(a, r) {
        var o = generator.generate();
        "" !== t ? fetch(atob(a.query.url), {
            method: e.toUpperCase(),
            body: t,
            headers: {
                "x-forwarded-for": o,
                "x-client-ip": o
            }
        }).then(e => e.text()).then(async e => {
            var t = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + o);
            t = await t.json(), r.send({
                data: e,
                ip_data: t
            })
        }).catch(e => {
            r.status(400).send({
                error: !0,
                message: e.message
            })
        }) : fetch(atob(a.query.url), {
            method: e.toUpperCase(),
            headers: {
                "x-forwarded-for": o,
                "x-client-ip": o
            }
        }).then(e => e.text()).then(async e => {
            var t = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + o);
            t = await t.json(), r.send({
                data: e,
                ip_data: t
            })
        }).catch(e => {
            r.status(400).send({
                error: !0,
                message: e.message
            })
        })
    })
}

function ipMethod(e) {
    app[e]("/ip/" + e, async function(t, a) {
        var r = e;
        "get" == r.toLowerCase() || "head" == r.toLowerCase() ? fetch(atob(t.query.url), {
            method: r.toUpperCase(),
            headers: {
                "x-forwarded-for": t.query.ip,
                "x-client-ip": t.query.ip
            }
        }).then(e => e.text()).then(async e => {
            var r = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + t.query.ip);
            r = await r.json(), a.send({
                data: e,
                ip_data: r
            })
        }).catch(e => {
            a.status(400).send({
                error: !0,
                message: e.message
            })
        }) : fetch(atob(t.query.url), {
            method: r.toUpperCase(),
            headers: {
                "x-forwarded-for": t.query.ip,
                "x-client-ip": t.query.ip
            },
            body: t.body
        }).then(e => e.text()).then(async e => {
            var r = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=" + process.env.API_KEY + "&ip=" + t.query.ip);
            r = await r.json(), a.send({
                data: e,
                ip_data: r
            })
        }).catch(e => {
            a.status(400).send({
                error: !0,
                message: e.message
            })
        })
    })
}

method("get"), method("post"), method("options"), method("put"), method("patch"), method("delete"), method("head"), ipMethod("get"), ipMethod("post"), ipMethod("options"), ipMethod("put"), ipMethod("patch"), ipMethod("delete"), ipMethod("head");

const PORT = process.env.PORT || 3e3;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`)
});
