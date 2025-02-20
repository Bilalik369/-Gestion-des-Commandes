const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const orderRoutes = require('./routes/orderRoutes');


// const dotenv = require('dotenv');
// dotenv.config();


// if (!process.env.MONGODB_URI) {
//   console.error(" Erreur : La variable d'environnement MONGODB_URI est manquante.");
//   process.exit(1);
// }


const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log(' MongoDB connecté'))
  .catch((err) => {
    console.error(' Erreur de connexion à MongoDB:', err);
    process.exit(1);
  });


app.use('/api/orders', orderRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: "Route non trouvée" });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Erreur interne du serveur" });
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(` Serveur démarré sur http://localhost:${PORT}`);
});
