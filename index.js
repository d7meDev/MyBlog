import express from "express"; 

const app = express();
const port = 3000;
let posts = [
  {
    id: 1,
    title: "Express Refactor",
    body: `
Split the monolithic server into feature-based routers, introduced
layered middleware for logging, sanitizing, and validation, and added a
central async error handler. Response times fell by 18 % and the code
base finally feels modular. Split the monolithic server into feature-based
routers, introduced layered middleware for logging, sanitizing, and
validation, and added a central async error handler. Response times fell
by 18 % and the code base finally feels modular.
Split the monolithic server into feature-based routers, introduced
layered middleware for logging, sanitizing, and validation, and added a
central async error handler. Response times fell by 18 % and the code
base finally feels modular. Split the monolithic server into feature-based
routers, introduced layered middleware for logging, sanitizing, and
validation, and added a central async error handler. Response times fell
by 18 % and the code base finally feels modular.
    `.trim(),
    date: new Date("2025-05-16"),
  },
  {
    id: 2,
    title: "Postgres ETL",
    body: `
Wrote a Node script that streams legacy MySQL CSV dumps, converts field
names to snake_case, and bulk-loads them into PostgreSQL via COPY.
Four million rows imported in under two minutes; new B-tree indexes cut
query latency almost in half.
    `.trim(),
    date: new Date("2025-05-15"),
  },
  {
    id: 3,
    title: "Async Patterns",
    body: `
Revisited the event loop, rewrote callback-heavy utilities with
async/await, and wrapped promises so rejected tasks bubble to a single
error boundary. Benchmarked Promise.allSettled against a custom
throttled pool for 1 000 concurrent HTTP requests.
    `.trim(),
    date: new Date("2025-05-14"),
  },
  {
    id: 4,
    title: "JWT Auth",
    body: `
Implemented stateless authentication with JSON Web Tokens, rotating
refresh tokens, and HTTP-only cookies. Added middleware to verify
scopes, plus a revoke-all endpoint that blacklists compromised tokens
in Redis.
    `.trim(),
    date: new Date("2025-05-13"),
  },
  {
    id: 5,
    title: "Unit Testing",
    body: `
Integrated Vitest, reached 92 % line coverage, and mocked external
services with MSW. Snapshot tests now guard against accidental EJS
markup changes, and a pre-commit hook blocks merges below 90 %.
    `.trim(),
    date: new Date("2025-05-12"),
  },
  {
    id: 6,
    title: "Tailwind Tweaks",
    body: `
Upgraded to Tailwind CSS v4, introduced logical properties for RTL
support, and replaced magic numbers with clamp() for truly fluid
typography. Lighthouse audit shows 100 % on accessibility.
    `.trim(),
    date: new Date("2025-05-11"),
  },
  {
    id: 7,
    title: "Docker Setup",
    body: `
Containerized the app with multi-stage builds: one image for
development (hot reload, nodemon) and a slim Alpine image for
production. Added health-check endpoints so Kubernetes restarts sick
pods automatically.
    `.trim(),
    date: new Date("2025-05-10"),
  },
  {
    id: 8,
    title: "CI Pipeline",
    body: `
Created a GitHub Actions workflow that lints, tests, and builds Docker
images on every push. A staging deploy runs end-to-end Cypress tests
against live containers before hitting the production branch.
    `.trim(),
    date: new Date("2025-05-09"),
  },
  {
    id: 9,
    title: "GraphQL Intro",
    body: `
Spiked a GraphQL API alongside REST, implemented schema stitching for
modularity, and compared query performance under DataLoader caching.
Early results show 30 % fewer network round-trips on complex views.
    `.trim(),
    date: new Date("2025-05-08"),
  },
  {
    id: 10,
    title: "Caching Wins",
    body: `
Added a Redis layer with cache-aside strategy for the busiest endpoints,
invalidating keys via PostgreSQL LISTEN/NOTIFY. API p95 latency dropped
from 220 ms to 60 ms under load test.
    `.trim(),
    date: new Date("2025-05-07"),
  },
];




app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use("/EditBlogs", express.static("public"));

app.get("/" ,(req,res) => {

    res.render("index.ejs",{
        posts:posts
    })

})

app.get("/NewBlog",(req,res) =>{
      
  res.render("NewBlog.ejs");

})
app.post("/NewBlog/create",(req,res) =>{
      
    const post = {
      id: posts.length + 1,            
      title: req.body.title,
      body: req.body.body.trim(),
      date: new Date()
      
    };

    posts.unshift(post);
    res.redirect("/");

})


app.get("/EditBlogs",(req,res) =>{
      
  res.render("EditBlogs.ejs",{posts:posts});

})

app.post("/EditBlogs/Delete",(req,res) =>{
      
  let id = Number(req.body.id);

  posts = posts.filter((post) => post.id !== id);

  res.redirect("/EditBlogs");
})

app.post("/EditBlogs/EditBlog",(req,res) =>{
     
     let id = Number(req.body.id);

     let post = posts.find((post) => post.id === id);

     res.render("EditBlog.ejs",{post:post});
   
})

app.post("/EditBlogs/EditBlog/Edit",(req,res) =>{
     
     let id = Number(req.body.id);
      
     let post = posts.find((post) => post.id === id);

     post.title = req.body.title;
     post.body = req.body.body.trim();

     res.redirect("/EditBlogs");

   
})

app.listen(port, ()=>{
    console.log("server is running....");
})


