const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = process.env.port || 5000;

// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://road-user:maeyVptWhJBoIb7k@cluster0.65qq53i.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();

    const database = client.db("digital-road");
    const movies = database.collection("car");

    app.get("/car-data", async (req, res) => {
      const car = req.query.number.toUpperCase();
      console.log(car);
      const query = { numberEng: car };
      const qursor = await movies.findOne(query);

      res.send(qursor);
    });

    app.post("/disposal-report", async (req, res) => {
      const status = req.body.status;
      const carNumber = req.query.number.toUpperCase();
      const newStatus = parseInt(status);
      const query = { numberEng: carNumber };
      const qursor = await movies.findOne(query);

      if (qursor) {
        const filter = { numberEng: carNumber };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            status: newStatus,
          },
        };
        const result = await movies.updateOne(filter, updateDoc, options);
        res.send(result);
      } else {
        res.send({ error: true });
      }

      console.log(carNumber, newStatus);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server is ok", port);
});

const data = [
  {
    owner: {
      nameEng: "Rehana Aktar",
      nameBng: "রেহানা আক্তার ",
      jobEng:
        "Officials of the Government of the People's Republic of Bangladesh",
      jobBng: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের কর্মকর্তা",
      nid: "xxxxxxxxx",
      mobile: "01713353300",
      img: "https://file-dhaka.portal.gov.bd/uploads/c744821c-aa9f-44f9-a403-07fc560350c2//64c/5d9/fe0/64c5d9fe0ada7864557354.jpg",
    },
    name: "Toyota Prado",
    status: 100,
    model: "2006 Toyota Land Cruiser Prado VX",
    colorEng: "white",
    colorBng: "সাদা",
    numberEng: "DH7340",
    numberBng: "ঢাকা মেট্রো হ- ৭৩-৪০",
    fuelTank: 87,
    engine: {
      type: "V6",
      displacement: "3.5 liters",
      horsepower: 278,
      torque: "265 lb-ft",
    },
    dimensions: {
      length: "188.8 inches",
      width: "74.4 inches",
      height: "71.1 inches",
      wheelbase: "109.8 inches",
    },
    seatingCapacity: 7,
    cargoSpace: {
      behindThirdRow: "16.1 cubic feet",
      maximumCargoSpace: "83.7 cubic feet",
    },
    towingCapacityKg: 2268,
    weight: {
      curbWeightKg: 2175, // Curb weight in kilograms
      grossVehicleWeightRatingKg: 2767, // Gross vehicle weight rating in kilograms
    },

    transmission: {
      type: "8-speed automatic",
      driveType: "4WD",
    },
  },
  {
    owner: {
      nameEng: "Sukla Sharkar",
      nameBng: "শুক্লা সরকার ",
      jobEng:
        "Officials of the Government of the People's Republic of Bangladesh",
      jobBng: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের কর্মকর্তা",
      nid: "xxxxxxxxx",
      mobile: "01713353295",
      img: "https://file-dhaka.portal.gov.bd/uploads/c744821c-aa9f-44f9-a403-07fc560350c2//64f/11e/d68/64f11ed685545777168660.jpg",
    },
    name: "Toyota Premio",
    status: 100,
    model: "2006 Toyota Land Cruiser Prado VX",
    colorEng: "white",
    colorBng: "সাদা",
    numberEng: "DH7344",
    numberBng: "ঢাকা মেট্রো হ- ৭৩-৪৪",
    fuelTank: 60,
    engine: {
      type: "Inline-4",
      displacement: "1.5 - 2.0 liters",
      horsepower: "110 - 150 hp",
      torque: "100 - 140 lb-ft",
    },
    transmission: {
      type: "CVT",
      driveType: "Front-wheel drive",
    },
    dimensions: {
      length: "181.1 - 183.3 inches",
      width: "66.7 - 66.9 inches",
      height: "58.1 - 58.7 inches",
      wheelbase: "106.3 - 109.4 inches",
    },
  },

  {
    owner: {
      nameEng: "Md. Quamruzzaman",
      nameBng: "	মো: কামরুজ্জামান ",
      jobEng: "Principal",
      jobBng: "অধ্যক্ষ",
      nid: "xxxxxxxxx",
      mobile: "01552496177",
      img: "https://file-dhaka.portal.gov.bd/uploads/7aef600d-961f-4d8e-845f-5940e9af41a8//65a/774/13a/65a77413a0e93439496326.jpg",
    },
    model: "Toyota Noah",
    year: 2024,
    colorEng: "white",
    colorBng: "সাদা",
    numberEng: "DH7344",
    numberBng: "ঢাকা মেট্রো হ- ৭৩-৪৪",
    fuelTank: 60,
    engine: {
      type: "Inline-4",
      displacement: "2.0 - 2.2 liters",
      horsepower: "150 - 170 hp",
      torque: "140 - 160 lb-ft",
    },
    transmission: {
      type: "CVT",
      driveType: "Front-wheel drive / All-wheel drive",
    },
    dimensions: {
      length: "176.0 - 181.1 inches",
      width: "66.9 - 69.3 inches",
      height: "75.2 - 76.8 inches",
      wheelbase: "106.3 - 118.1 inches",
    },
    seatingCapacity: 7,
  },

  {
    owner: {
      nameEng: "Md. Quamruzzaman",
      nameBng: "	মো: আবু মুছা ",
      jobEng: "Teacher",
      jobBng: "শিক্ষক",
      nid: "xxxxxxxxx",
      mobile: "01914908543",
      img: "https://file-dhaka.portal.gov.bd/uploads/7aef600d-961f-4d8e-845f-5940e9af41a8//657/6a7/b12/6576a7b1296ad983172109.png",
    },
    status: 100,
    name: "Nissan Sunny",
    colorEng: "white",
    colorBng: "সাদা",
    numberEng: "DH7345",
    numberBng: "ঢাকা মেট্রো হ- ৭৩-৪৫",
    model: "Nissan Sunny",
    year: 2024,
    engine: {
      type: "Inline-4",
      displacement: "1.6 - 2.0 liters",
      horsepower: "110 - 150 hp",
      torque: "100 - 140 lb-ft",
    },
    transmission: {
      type: "CVT",
      driveType: "Front-wheel drive",
    },
    dimensions: {
      length: "175.0 - 177.5 inches",
      width: "67.7 - 68.5 inches",
      height: "58.7 - 59.1 inches",
      wheelbase: "101.6 - 102.4 inches",
    },
    seatingCapacity: 5,
  },
];
