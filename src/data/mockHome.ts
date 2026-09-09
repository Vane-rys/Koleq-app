// Datos de prueba para el flujo de apoderado — reemplazar por datos reales
// cuando el backend (a cargo de tu hermana) esté disponible.

export const mockApoderado = {
  nombre: 'Vanessa',
  apellido: 'Reyes',
  correo: 'vanessa.reyes@gmail.com',
  rut: '15.234.567-8',
  hijos: [
    { id: 'e1', iniciales: 'E', nombre: 'Emilia Reyes', curso: '6° Básico B', promedio: '6.4' },
    { id: 'm1', iniciales: 'M', nombre: 'Mateo Reyes', curso: '2° Básico A', promedio: '6.1' },
  ],
  rachaDias: 5,
  notaNueva: { ramo: 'Matemática', detalle: 'Prueba fracciones', nota: '6.4' },
  hojaDeVida: {
    titulo: 'Ayudó a una compañera nueva',
    autor: 'Rodrigo Salas · Lenguaje',
  },
};

export const mockProfesor = {
  nombre: 'Carla',
  apellido: 'Fuentes',
  correo: 'carla.fuentes@colegiolosaromos.cl',
  cargo: 'Prof. Matemática',
  evaluacionesSemana: [
    { dia: 'Miércoles', detalle: 'Prueba fracciones · 6° Básico B' },
    { dia: 'Viernes', detalle: 'Control geometría · 5° Básico A' },
  ],
  mensajeNuevo: {
    iniciales: 'V',
    de: 'Apoderado de Emilia Reyes',
    curso: '6° Básico B',
    preview: 'Gracias por avisar, hablaré con ella. ¿Todo bien igual?',
  },
};

export const mockEstudiante = {
  nombre: 'Emilia',
  apellido: 'Reyes',
  curso: '6° Básico B',
  rachaDias: 5,
  medallas: [
    { key: 'buena-onda', label: 'Buena onda', ganada: true },
    { key: 'top-esfuerzo', label: 'Top esfuerzo', ganada: true },
    { key: 'constancia', label: 'Constancia', ganada: false },
  ],
  proximaEvaluacion: 'Prueba de Matemática el miércoles',
  notaNueva: { ramo: 'Matemática', detalle: 'Prueba fracciones', nota: '6.4' },
};

// --- Notas (Emilia) — tabs Sem. 1 / Sem. 2 / Final ---
type EvaluacionDetalle = { label: string; nota: string };
type Materia = {
  nombre: string;
  profesor: string;
  evaluaciones: number;
  nota: string;
  detalle?: EvaluacionDetalle[];
};
type Semestre = { promedio: string | null; materias: Materia[] };

// El primer semestre ya se cursó (marzo-julio) y tiene notas registradas;
// el segundo semestre recién empieza, así que aún no hay notas — y el
// promedio final se calcula al cierre del año. Por eso el orden es
// sem1 (con datos) -> sem2 (vacio) -> final (vacio).
export const mockNotas: { sem1: Semestre; sem2: Semestre; final: Semestre } = {
  sem1: {
    promedio: '6.4',
    materias: [
      {
        nombre: 'Matemática',
        profesor: 'Prof. Carla Fuentes',
        evaluaciones: 3,
        nota: '6.4',
        detalle: [
          { label: 'Prueba fracciones · 12 abr', nota: '6.4' },
          { label: 'Trabajo en grupo · 26 abr', nota: '6.8' },
          { label: 'Control geometría · 10 may', nota: '5.9' },
        ],
      },
      {
        nombre: 'Lenguaje',
        profesor: 'Prof. Rodrigo Salas',
        evaluaciones: 2,
        nota: '6.7',
        detalle: [
          { label: 'Ensayo comprensión lectora · 8 abr', nota: '6.5' },
          { label: 'Disertación · 22 may', nota: '6.9' },
        ],
      },
      {
        nombre: 'Ciencias',
        profesor: 'Prof. Paula Vergara',
        evaluaciones: 2,
        nota: '5.8',
        detalle: [
          { label: 'Guía ecosistemas · 15 abr', nota: '5.6' },
          { label: 'Laboratorio · 29 may', nota: '6.0' },
        ],
      },
    ],
  },
  sem2: { promedio: null, materias: [] },
  final: { promedio: null, materias: [] },
};

// --- Hoja de vida (Emilia) ---
export const mockHojaDeVida = {
  positivas: 2,
  seguimiento: 1,
  anotaciones: [
    {
      id: 'a1',
      tipo: 'positiva' as const,
      titulo: 'Ayudó a una compañera nueva',
      autor: 'Rodrigo Salas',
      autorIniciales: 'R',
      ramo: 'Lenguaje',
      fecha: '3 sep',
      fechaHora: '3 sep, 11:20',
      detalle:
        'Emilia acompañó durante toda la semana a una compañera que se integró al curso, mostrándole el colegio y ayudándola con las tareas de lenguaje.',
    },
    {
      id: 'a2',
      tipo: 'seguimiento' as const,
      titulo: 'Llegó atrasada a la primera hora',
      autor: 'Carla Fuentes',
      autorIniciales: 'C',
      ramo: 'Matemática',
      fecha: '28 ago',
      fechaHora: '28 ago, 08:20',
      detalle: 'Emilia llegó 15 minutos atrasada a la primera hora de clases. Se conversó con ella al respecto.',
    },
    {
      id: 'a3',
      tipo: 'positiva' as const,
      titulo: 'Excelente participación en el laboratorio',
      autor: 'Paula Vergara',
      autorIniciales: 'P',
      ramo: 'Ciencias',
      fecha: '20 ago',
      fechaHora: '20 ago, 10:05',
      detalle: 'Emilia mostró mucho interés y participó activamente durante la actividad práctica de laboratorio.',
    },
  ],
};

// --- Mensajes ---
export const mockMensajes = {
  conversaciones: [
    {
      id: 'c1',
      nombre: 'Carla Fuentes',
      iniciales: 'C',
      cargo: 'Prof. Matemática',
      destacado: true,
      preview: 'Emilia llegó atrasada hoy...',
      hora: '10:32',
      noLeido: true,
    },
    {
      id: 'c2',
      nombre: 'Rodrigo Salas',
      iniciales: 'R',
      cargo: 'Prof. Lenguaje',
      destacado: false,
      preview: 'Gracias por avisar, quedó...',
      hora: 'ayer',
      noLeido: false,
    },
    {
      id: 'c3',
      nombre: 'Dirección',
      iniciales: 'D',
      cargo: 'Colegio Los Aromos',
      destacado: false,
      preview: 'Reunión de apoderados, martes...',
      hora: 'lun',
      noLeido: false,
    },
  ],
};

// --- Pagos ---
export const mockPagos = {
  pendiente: { titulo: 'Mensualidad Octubre', venceDias: 3, monto: '$85.000' },
  historial: [
    { mes: 'Septiembre', estado: 'Pagado · 5 sep', monto: '$85.000' },
    { mes: 'Agosto', estado: 'Pagado · 3 ago', monto: '$85.000' },
  ],
  datosTransferencia: {
    banco: 'Banco Estado',
    tipoCuenta: 'Cuenta corriente',
    numeroCuenta: '00-123-45678-9',
    rut: '76.123.456-7',
    nombre: 'Colegio Los Aromos SpA',
  },
};

// --- Vista del profesor (Carla Fuentes) ---
export const mockCursos = [
  { id: 'c1', nombre: '6° Básico B', ramo: 'Matemática', estudiantes: 28 },
  { id: 'c2', nombre: '5° Básico A', ramo: 'Matemática', estudiantes: 26 },
  { id: 'c3', nombre: '7° Básico C', ramo: 'Matemática', estudiantes: 24 },
];

export const mockAlumnos = [
  { id: 'al1', cursoId: 'c1', iniciales: 'E', nombre: 'Emilia Reyes' },
  { id: 'al2', cursoId: 'c1', iniciales: 'J', nombre: 'Joaquín Pizarro' },
  { id: 'al3', cursoId: 'c1', iniciales: 'M', nombre: 'Martina Soto' },
  { id: 'al4', cursoId: 'c1', iniciales: 'B', nombre: 'Benjamín Rojas' },
];

export const mockAnotacionesAlumno = [
  {
    id: 'h1',
    tipo: 'positiva' as const,
    titulo: 'Ayudó a una compañera nueva',
    autor: 'Rodrigo Salas',
    ramo: 'Lenguaje',
    fecha: '3 sep',
  },
  {
    id: 'h2',
    tipo: 'seguimiento' as const,
    titulo: 'Llegó atrasada a la primera hora',
    autor: 'Carla Fuentes',
    ramo: 'Matemática',
    fecha: '28 ago',
  },
];

export const mockMensajesProfesor = [
  {
    id: 'p1',
    nombre: 'Apoderado de Emilia Reyes',
    curso: '6° Básico B',
    iniciales: 'V',
    preview: '¿Todo bien igual con Emilia?',
    hora: '10:40',
    noLeido: true,
  },
  {
    id: 'p2',
    nombre: 'Apoderado de Martina Soto',
    curso: '6° Básico B',
    iniciales: 'P',
    preview: '¿Qué entra en la prueba del viernes?',
    hora: 'ayer',
    noLeido: false,
  },
];

export const mockMedallas = [
  { key: 'buena-onda', label: 'Buena onda' },
  { key: 'top-esfuerzo', label: 'Top esfuerzo' },
  { key: 'constancia', label: 'Constancia' },
];

export const mockGruposTarea = [
  {
    id: 'g1',
    nombre: 'Grupo 1',
    integrantes: ['Emilia Reyes', 'Joaquín Pizarro'],
    entregado: true,
    archivo: 'maqueta_grupo1.jpg',
    fechaEntrega: '4 sep, 18:20',
  },
  {
    id: 'g2',
    nombre: 'Grupo 2',
    integrantes: ['Martina Soto', 'Benjamín Rojas'],
    entregado: false,
  },
];

// --- Vista del estudiante (Emilia) ---
export const mockAgenda = {
  estaSemana: [
    { fecha: '10', dia: 'MIÉ', titulo: 'Prueba fracciones', ramo: 'Matemática', profesor: 'Prof. Carla Fuentes' },
    { fecha: '12', dia: 'VIE', titulo: 'Control lectura', ramo: 'Lenguaje', profesor: 'Prof. Rodrigo Salas' },
  ],
  proximaSemana: [
    { fecha: '18', dia: 'JUE', titulo: 'Salida a terreno', ramo: 'Ciencias', profesor: 'Prof. Paula Vergara' },
  ],
};

// Profesores con los que Emilia puede escribirse — uno por ramo, igual que
// en mockNotas. El estudiante no tiene bandeja con Dirección (eso es un
// canal solo para apoderados en el handoff).
export const mockMensajesEstudiante = {
  conversaciones: [
    {
      id: 'e1',
      nombre: 'Carla Fuentes',
      iniciales: 'C',
      cargo: 'Prof. Matemática',
      destacado: true,
      preview: 'Recuerda traer la guía resuelta mañana.',
      hora: '09:15',
      noLeido: true,
    },
    {
      id: 'e2',
      nombre: 'Rodrigo Salas',
      iniciales: 'R',
      cargo: 'Prof. Lenguaje',
      destacado: false,
      preview: 'Buen trabajo en la disertación de hoy.',
      hora: 'ayer',
      noLeido: false,
    },
    {
      id: 'e3',
      nombre: 'Paula Vergara',
      iniciales: 'P',
      cargo: 'Prof. Ciencias',
      destacado: false,
      preview: 'Cualquier duda del laboratorio me escribes.',
      hora: 'lun',
      noLeido: false,
    },
  ],
};

type Trabajo = {
  id: string;
  titulo: string;
  meta: string;
  entregado: boolean;
  ramo?: string;
  instrucciones?: string;
};

export const mockTrabajos: { grupal: Trabajo[]; individual: Trabajo[] } = {
  grupal: [
    {
      id: 't1',
      titulo: 'Maqueta sistema solar',
      meta: 'Con Joaquín + 2 · entrega 15 sep',
      entregado: true,
    },
  ],
  individual: [
    {
      id: 't2',
      titulo: 'Guía de fracciones',
      meta: 'Matemática · entrega 11 sep',
      entregado: false,
      ramo: 'Matemática',
      instrucciones: 'Resuelve los ejercicios 1 al 10 de la guía y sube una foto de tu cuaderno.',
    },
  ],
};
