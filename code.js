import axios from "axios";
import express from "express";
import anyanime from "anyanime";


const app = express();

const port = 6070;
const hostname = "127.0.0.1";

app.use(express.urlencoded({extended: false}))
app.use(express.json());

async function getJoke() {
    const response = await axios.get("https://api.api-ninjas.com/v1/dadjokes", {
    headers: {
      "X-Api-Key": "1VHCsewtqLFYq3rYvoPfcA==jlGJpmcL3PVCRWSp",
    },
    });
    
    // console.log(response.data[0].joke);
    const joke = response.data[0].joke;
    console.log(joke);
    return joke;
}

async function anime() {
const resultImg = await anyanime.getAnime({});
    console.log(resultImg[0]);
    return resultImg[0];
}

// anime();



app.get("/", async(request, response) => {
    
    const joke = await getJoke();
    const randomImages = await anime();
    console.log(joke);
    response.status(200).send(joke,randomImages);

})


app.listen(port, hostname, () => {
    console.log("server is started " + port);
})



all i want is a anime image and a joke to send into response
