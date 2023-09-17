import express from "express";

const app = express();
const port = 3000;

let workItems = [];
let personalItems = [];
let newId = 1;

app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("today.ejs", {
        personalItems: personalItems
    });
})

app.post("/", (req, res) => {
    console.log(req.body);
    personalItems.push({id: newId++, done: false, label: req.body.newItem});
    console.log(personalItems);
    res.redirect("/");
})
app.post("/delete", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        personalItems = personalItems.filter(item => {
            return item.id != element;
        })

    });
    console.log(personalItems);

    res.redirect("/");
})

app.post("/done", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        let currenIndex = personalItems.findIndex(item => {
            return item.id == element;
        })
        personalItems[currenIndex].done = true;
    });
    console.log(personalItems);

    res.redirect("/");
})

app.post("/notdone", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        let currenIndex = personalItems.findIndex(item => {
            return item.id == element;
        })
        personalItems[currenIndex].done = false;
    });
    console.log(personalItems);

    res.redirect("/");
})

app.get("/work", (req, res) => {
    res.render("work.ejs", {
        workItems: workItems
    });
})

app.post("/work", (req, res) => {
    console.log(req.body);
    workItems.push({id: newId++, done: false, label: req.body.newItem});
    console.log(workItems);
    res.redirect("/work");
})
app.post("/work/delete", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        workItems = workItems.filter(item => {
            return item.id != element;
        })

    });
    console.log(workItems);

    res.redirect("/work");
})

app.post("/work/done", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        let currenIndex = workItems.findIndex(item => {
            return item.id == element;
        })
workItems[currenIndex].done = true;
    });
    console.log(workItems);

    res.redirect("/work");
})

app.post("/work/notdone", (req, res) => {
    console.log(req.body);
    if (typeof req.body.selected == "string") req.body.selected = [req.body.selected];
    req.body.selected.forEach(element => {
        let currenIndex = workItems.findIndex(item => {
            return item.id == element;
        })
workItems[currenIndex].done = false;
    });
    console.log(workItems);

    res.redirect("/work");
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });