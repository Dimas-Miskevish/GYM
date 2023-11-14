const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://gestionInmo:gestionInmo@gestioninmo-phvty.mongodb.net/turnos_app_demo_dimas?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//settings
app.set('json spaces',2);

//middlewares
app.use(express.json({limit: '50mb'}));
app.use(cors());

// Import and use your route handlers
const authRoutes = require('./routes/auth');
const turnosRoutes = require('./routes/turnos');
const usersRoutes = require('./routes/users');
const sportsRoutes = require('./routes/sports');
const turnoAsignacionRoutes = require('./routes/turno_asignacion');
app.use('/auth', authRoutes);
app.use('/turnos', turnosRoutes);
app.use('/users', usersRoutes);
app.use('/sports', sportsRoutes);
app.use('/turno_asignacion', turnoAsignacionRoutes);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
