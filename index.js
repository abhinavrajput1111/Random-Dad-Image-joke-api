import axios from "axios";
import express from "express";
import anyanime from "anyanime";

const app = express();

const port = 6070;
const hostname = "127.0.0.1";

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

async function getJoke() {
  const response = await axios.get("https://api.api-ninjas.com/v1/dadjokes", {
    headers: {
      "X-Api-Key": "1VHCsewtqLFYq3rYvoPfcA==jlGJpmcL3PVCRWSp",
    },
  });

  const joke = response.data[0].joke;
  return joke;
}

async function anime() {
  const resultImg = await anyanime.getAnime({});
  return resultImg[0];
}

app.get("/", async (req, res) => {
  try {
    const joke = await getJoke();
    const randomImage = await anime();

    res.send(`
      <html>
        <head>
          <title>Joke and Anime</title>
        </head>
        <body style="text-align: center;">
          <h1>Here's a joke for you:</h1>
          <p>${joke}</p>
          <h2>And a random anime image:</h2>
          <img src="${randomImage}" alt="Anime Image" style="max-width: 100%; height: auto;" />
        </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, hostname, () => {
  console.log("server is started on " + port);
});
