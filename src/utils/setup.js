import axios from 'axios';
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });

const API_BASE = 'http://localhost:8080';
const NUM_VACUNADORES = 10;
const VACUNACIONES_POR_USUARIO = 10;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const nombres = ['Carlos', 'María', 'Luis', 'Ana', 'Pedro', 'Lucía', 'Andrés', 'Laura', 'José', 'Camila'];
const apellidos = ['González', 'Rodríguez', 'Martínez', 'López', 'Hernández', 'Díaz', 'Moreno', 'Romero', 'Vargas', 'Silva'];
const nombresFincas = ['El Paraíso', 'San Isidro', 'La Esperanza', 'Santa Marta', 'La Palma', 'Altamira', 'Monteverde', 'Las Margaritas', 'El Edén', 'La Aurora'];

function generarNombreAleatorio() {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)];
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
  return `${nombre} ${apellido}`;
}

function generarNombreFinca() {
  const finca = nombresFincas[Math.floor(Math.random() * nombresFincas.length)];
  return `Finca ${finca}`;
}

function fechaAleatoriaUltimos10Meses() {
  const hoy = new Date();
  const mesesRestar = Math.floor(Math.random() * 10);
  const diasRestar = Math.floor(Math.random() * 28); // Aseguramos que siempre sea un día válido
  const fecha = new Date(hoy.getFullYear(), hoy.getMonth() - mesesRestar, hoy.getDate() - diasRestar);
  return fecha.toISOString();
}

const main = async () => {
  const adminToken = prompt('🔑 Ingresa el token del administrador: ').trim();
  if (!adminToken) {
    console.error('❌ Token inválido. Terminando el script.');
    return;
  }

  const vacunadores = [];

  for (let i = 1; i <= NUM_VACUNADORES; i++) {
    const nombre = generarNombreAleatorio();
    const email = `vacunador${i}@example.com`;
    const contraseña = `123456`;

    try {
      await axios.post(`${API_BASE}/registro`, {
        nombre,
        email,
        contraseña,
        rol: 'vacunador'
      }, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });

      vacunadores.push({ email, contraseña });
      console.log(`✔️ Registrado: ${nombre} (${email})`);
    } catch (err) {
      console.error(`❌ Error al registrar ${email}: ${err.message}`);
    }
  }

  for (const [index, vac] of vacunadores.entries()) {
    try {
      const loginRes = await axios.post(`${API_BASE}/auth/login`, {
        email: vac.email,
        password: vac.contraseña
      });

      const token = loginRes.data.token;

      const perfil = await axios.get(`${API_BASE}/perfil`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const idVacunador = perfil.data.id;

      for (let j = 1; j <= VACUNACIONES_POR_USUARIO; j++) {
        await axios.post(`${API_BASE}/vacunaciones`, {
          idVacunador,
          finca: generarNombreFinca(),
          campaign: 'Campaña 2025',
          fecha: fechaAleatoriaUltimos10Meses(),
          tipoVacuna: 'Vacuna contra aftosa',
          observaciones: `Dosis ${j} aplicada correctamente`
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      console.log(`✅ Vacunaciones registradas para ${vac.email}`);
      await delay(300); // Pausa entre usuarios

    } catch (error) {
      console.error(`❌ Error con ${vac.email}:`, error.message);
    }
  }

  console.log('\n🧪 Ejemplo de vacunador creado:');
  console.log(`Email: ${vacunadores[0].email}`);
  console.log(`Contraseña: ${vacunadores[0].contraseña}`);
};

main();
