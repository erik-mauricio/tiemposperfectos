use("app")

db.conjugations.drop()
db.createCollection("conjugations")

db.conjugations.insertMany([
  {
    sentence: "Yo _____ (comer)...",
    answer: "como",
    translation: "I eat...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (vivir)...",
    answer: "vives",
    translation: "You live...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (leer)...",
    answer: "lee",
    translation: "He reads...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (trabajar)...",
    answer: "trabajamos",
    translation: "We work...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (estudiar)...",
    answer: "estudian",
    translation: "They study...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (beber)...",
    answer: "bebe",
    translation: "She drinks...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (correr)...",
    answer: "corren",
    translation: "You all run...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (escribir)...",
    answer: "escribo",
    translation: "I write...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (hablar)...",
    answer: "hablas",
    translation: "You speak...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (viajar)...",
    answer: "viajamos",
    translation: "We travel...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (caminar)...",
    answer: "camina",
    translation: "He walks...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (abrir)...",
    answer: "abren",
    translation: "They open...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (mirar)...",
    answer: "miro",
    translation: "I watch...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (bailar)...",
    answer: "bailas",
    translation: "You dance...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (escuchar)...",
    answer: "escuchan",
    translation: "You all listen...",
    tense: "Presente",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (comer)...",
    answer: "comí",
    translation: "I ate...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (vivir)...",
    answer: "viviste",
    translation: "You lived...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (leer)...",
    answer: "leyó",
    translation: "He read...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (trabajar)...",
    answer: "trabajamos",
    translation: "We worked...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (estudiar)...",
    answer: "estudiaron",
    translation: "They studied...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (beber)...",
    answer: "bebió",
    translation: "She drank...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (correr)...",
    answer: "corrieron",
    translation: "You all ran...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (escribir)...",
    answer: "escribí",
    translation: "I wrote...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (hablar)...",
    answer: "hablaste",
    translation: "You spoke...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (viajar)...",
    answer: "viajamos",
    translation: "We traveled...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (caminar)...",
    answer: "caminó",
    translation: "He walked...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (abrir)...",
    answer: "abrieron",
    translation: "They opened...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (mirar)...",
    answer: "miré",
    translation: "I watched...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (bailar)...",
    answer: "bailaste",
    translation: "You danced...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (escuchar)...",
    answer: "escucharon",
    translation: "You all listened...",
    tense: "Pretérito Indefinido",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (comer)...",
    answer: "comía",
    translation: "I used to eat...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (vivir)...",
    answer: "vivías",
    translation: "You used to live...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (leer)...",
    answer: "leía",
    translation: "He used to read...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (trabajar)...",
    answer: "trabajábamos",
    translation: "We used to work...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (estudiar)...",
    answer: "estudiaban",
    translation: "They used to study...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (beber)...",
    answer: "bebía",
    translation: "She used to drink...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (correr)...",
    answer: "corrían",
    translation: "You all used to run...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (escribir)...",
    answer: "escribía",
    translation: "I used to write...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (hablar)...",
    answer: "hablabas",
    translation: "You used to speak...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (viajar)...",
    answer: "viajábamos",
    translation: "We used to travel...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (caminar)...",
    answer: "caminaba",
    translation: "He used to walk...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (abrir)...",
    answer: "abrían",
    translation: "They used to open...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (mirar)...",
    answer: "miraba",
    translation: "I used to watch...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (bailar)...",
    answer: "bailabas",
    translation: "You used to dance...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (escuchar)...",
    answer: "escuchaban",
    translation: "You all used to listen...",
    tense: "Imperfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (comer)...",
    answer: "comeré",
    translation: "I will eat...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (vivir)...",
    answer: "vivirás",
    translation: "You will live...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (leer)...",
    answer: "leerá",
    translation: "He will read...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (trabajar)...",
    answer: "trabajaremos",
    translation: "We will work...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (estudiar)...",
    answer: "estudiarán",
    translation: "They will study...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (beber)...",
    answer: "beberá",
    translation: "She will drink...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (correr)...",
    answer: "correrán",
    translation: "You all will run...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (escribir)...",
    answer: "escribiré",
    translation: "I will write...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (hablar)...",
    answer: "hablarás",
    translation: "You will speak...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (viajar)...",
    answer: "viajaremos",
    translation: "We will travel...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (caminar)...",
    answer: "caminará",
    translation: "He will walk...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (abrir)...",
    answer: "abrirán",
    translation: "They will open...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (mirar)...",
    answer: "miraré",
    translation: "I will watch...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (bailar)...",
    answer: "bailarás",
    translation: "You will dance...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (escuchar)...",
    answer: "escucharán",
    translation: "You all will listen...",
    tense: "Futuro",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (estudiar)...",
    answer: "he estudiado",
    translation: "I have studied...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (comer)...",
    answer: "ha comido",
    translation: "She has eaten...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (viajar)...",
    answer: "hemos viajado",
    translation: "We have traveled...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (leer)...",
    answer: "has leído",
    translation: "You have read...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (vivir)...",
    answer: "han vivido",
    translation: "They have lived...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (hacer)...",
    answer: "he hecho",
    translation: "I have done...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (ver)...",
    answer: "has visto",
    translation: "You have seen...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (abrir)...",
    answer: "hemos abierto",
    translation: "We have opened...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ella _____ (romper)...",
    answer: "ha roto",
    translation: "She has broken...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ustedes _____ (escribir)...",
    answer: "han escrito",
    translation: "You all have written...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Yo _____ (decir)...",
    answer: "he dicho",
    translation: "I have said...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Él _____ (trabajar)...",
    answer: "ha trabajado",
    translation: "He has worked...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Nosotros _____ (caminar)...",
    answer: "hemos caminado",
    translation: "We have walked...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Tú _____ (beber)...",
    answer: "has bebido",
    translation: "You have drunk...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
  {
    sentence: "Ellos _____ (jugar)...",
    answer: "han jugado",
    translation: "They have played...",
    tense: "Presente Perfecto",
    difficulty: "Beginner",
  },
]);

db.passages.drop()
db.createCollection("passages")

db.passages.insertMany([
  // Principiante
  {
    topic: "Nature",
    difficulty: "Beginner",
    title: "El Ciclo del Agua",
    content: `El agua siempre está en movimiento alrededor de nuestro planeta en lo que llamamos el ciclo del agua. Este proceso ha estado ocurriendo durante millones de años y es muy importante para toda la vida en la Tierra.

El ciclo del agua comienza cuando el sol calienta el agua de los océanos, lagos y ríos. Este calor convierte el agua en vapor de agua invisible que se eleva en el aire. Este proceso se llama evaporación.

Cuando el vapor de agua sube más alto en el cielo, se enfría. Cuando se enfría lo suficiente, el vapor de agua se convierte de nuevo en pequeñas gotas de agua. Esto se llama condensación. Estas pequeñas gotas se adhieren a las partículas de polvo en el aire y forman nubes.

Cuando las gotas de agua en las nubes se vuelven demasiado pesadas, caen de vuelta a la Tierra como lluvia, nieve o granizo. Esto se llama precipitación. El agua luego fluye hacia ríos y arroyos, o se filtra en el suelo para convertirse en agua subterránea.

Finalmente, toda esta agua regresa a los océanos, lagos y ríos, donde el ciclo comienza de nuevo. Las plantas también ayudan al ciclo del agua liberando vapor de agua a través de sus hojas en un proceso llamado transpiración.`,

    questions: [
      {
        question: "¿Qué inicia el ciclo del agua?",
        options: {
          A: "El viento soplando sobre el agua",
          B: "El sol calentando el agua",
          C: "Los peces nadando en el agua",
          D: "Las personas usando agua",
        },
        correct: "B",
      },
      {
        question:
          "¿Cómo se llama cuando el vapor de agua se convierte de nuevo en gotas de agua?",
        options: {
          A: "Evaporación",
          B: "Precipitación",
          C: "Condensación",
          D: "Transpiración",
        },
        correct: "C",
      },
      {
        question:
          "¿Qué se forma cuando las gotas de agua se adhieren a las partículas de polvo en el aire?",
        options: {
          A: "Ríos",
          B: "Nubes",
          C: "Lluvia",
          D: "Océanos",
        },
        correct: "B",
      },
      {
        question: "¿Qué es la precipitación?",
        options: {
          A: "El agua convirtiéndose en vapor",
          B: "Las nubes formándose en el cielo",
          C: "El agua cayendo de vuelta a la Tierra como lluvia, nieve o granizo",
          D: "Las plantas liberando vapor de agua",
        },
        correct: "C",
      },
      {
        question: "¿A dónde va el agua después de caer como precipitación?",
        options: {
          A: "Desaparece para siempre",
          B: "Solo va a los océanos",
          C: "Fluye hacia ríos y arroyos o se filtra en el suelo",
          D: "Se queda en las nubes",
        },
        correct: "C",
      },
      {
        question: "¿Qué es la transpiración?",
        options: {
          A: "El agua evaporándose de los océanos",
          B: "Las nubes formándose en el cielo",
          C: "La lluvia cayendo de las nubes",
          D: "Las plantas liberando vapor de agua a través de sus hojas",
        },
        correct: "D",
      },
      {
        question: "¿Por cuánto tiempo ha estado ocurriendo el ciclo del agua?",
        options: {
          A: "Por cientos de años",
          B: "Por miles de años",
          C: "Por millones de años",
          D: "Solo desde que existen los humanos",
        },
        correct: "C",
      },
      {
        question:
          "¿Qué le pasa al vapor de agua cuando sube más alto en el cielo?",
        options: {
          A: "Se calienta",
          B: "Se enfría",
          C: "Mantiene la misma temperatura",
          D: "Se convierte en hielo inmediatamente",
        },
        correct: "B",
      },
    ],
  },

  // Intermedio
  {
    topic: "Science",
    difficulty: "Medium",
    title: "El Cerebro Humano y la Memoria",
    content: `El cerebro humano es uno de los órganos más complejos del cuerpo, contiene aproximadamente 86 mil millones de neuronas que se comunican a través de señales eléctricas y químicas. Entre sus muchas funciones, la capacidad del cerebro para formar, almacenar y recuperar memorias es particularmente fascinante y crucial para la experiencia humana.

La formación de la memoria ocurre a través de un proceso llamado codificación, donde la información sensorial se convierte en una forma que puede ser almacenada en el cerebro. Esta información primero entra en la memoria sensorial, que retiene datos por solo unos segundos. Si se considera importante, se mueve a la memoria a corto plazo, que puede contener aproximadamente siete piezas de información durante unos 20-30 segundos.

Para que la información se vuelva permanente, debe transferirse a la memoria a largo plazo a través de la consolidación. Este proceso involucra el hipocampo, una estructura con forma de caballito de mar profunda dentro del cerebro, que actúa como un sitio de almacenamiento temporal antes de que las memorias se distribuyan a varias regiones corticales para almacenamiento permanente.

Existen diferentes tipos de memoria a largo plazo. La memoria explícita incluye la memoria episódica (experiencias personales) y la memoria semántica (hechos y conceptos). La memoria implícita involucra habilidades y hábitos que realizamos automáticamente, como andar en bicicleta o escribir en un teclado.

Curiosamente, las memorias no se almacenan como archivos en una computadora. En cambio, se reconstruyen cada vez que las recordamos, lo que significa que pueden ser influenciadas por nuestras emociones, conocimientos y experiencias actuales. Por esto el testimonio de testigos oculares puede ser poco confiable, y por qué nuestros recuerdos de la infancia pueden no ser completamente precisos.

El sueño juega un papel crucial en la consolidación de la memoria. Durante el sueño profundo, el cerebro reproduce las experiencias del día, fortaleciendo conexiones neuronales importantes y eliminando información innecesaria. Por esto dormir adecuadamente es esencial para el aprendizaje y la retención de memoria.`,

    questions: [
      {
        question:
          "¿Aproximadamente cuántas neuronas contiene el cerebro humano?",
        options: {
          A: "86 millones",
          B: "86 mil millones",
          C: "8.6 mil millones",
          D: "860 mil millones",
        },
        correct: "B",
      },
      {
        question:
          "¿Cuál es el papel del hipocampo en la formación de la memoria?",
        options: {
          A: "Almacena permanentemente todas las memorias",
          B: "Solo procesa información sensorial",
          C: "Actúa como almacenamiento temporal antes de distribuir memorias a regiones corticales",
          D: "Elimina memorias innecesarias",
        },
        correct: "C",
      },
      {
        question:
          "¿Por cuánto tiempo puede la memoria a corto plazo retener información típicamente?",
        options: {
          A: "5-10 segundos",
          B: "20-30 segundos",
          C: "2-3 minutos",
          D: "10-15 minutos",
        },
        correct: "B",
      },
      {
        question:
          "¿Cuáles son los dos tipos de memoria explícita mencionados en el pasaje?",
        options: {
          A: "Memoria visual y auditiva",
          B: "Memoria a corto y largo plazo",
          C: "Memoria episódica y semántica",
          D: "Memoria consciente e inconsciente",
        },
        correct: "C",
      },
      {
        question:
          "¿Qué tipo de memoria involucra habilidades y hábitos realizados automáticamente?",
        options: {
          A: "Memoria explícita",
          B: "Memoria episódica",
          C: "Memoria semántica",
          D: "Memoria implícita",
        },
        correct: "D",
      },
      {
        question:
          "¿Cómo se almacenan las memorias en el cerebro según el pasaje?",
        options: {
          A: "Como archivos en una computadora",
          B: "En una sola ubicación permanentemente",
          C: "Se reconstruyen cada vez que las recordamos",
          D: "Solo en el hipocampo",
        },
        correct: "C",
      },
      {
        question:
          "¿Por qué puede ser poco confiable el testimonio de testigos oculares?",
        options: {
          A: "Las personas tienen mala visión",
          B: "Las memorias pueden ser influenciadas por emociones y experiencias actuales",
          C: "El cerebro no puede almacenar información visual",
          D: "Las personas olvidan todo después de 24 horas",
        },
        correct: "B",
      },
      {
        question:
          "¿Qué sucede durante el sueño profundo que ayuda con la memoria?",
        options: {
          A: "El cerebro se apaga completamente",
          B: "Se crean nuevas neuronas",
          C: "El cerebro reproduce experiencias y fortalece conexiones neuronales",
          D: "Todas las memorias se eliminan",
        },
        correct: "C",
      },
    ],
  },
]);

db.prompts.drop();
db.createCollection("prompts");

db.prompts.insertMany([
  // Presentation Formal Speech - Beginner
  {
    title: "Introduce yourself and your background to a small group",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Present your favorite hobby for 2 minutes",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Explain a simple process you do daily",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Describe your dream job to colleagues",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Present a book recommendation to friends",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Explain why you chose your career path",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Give a brief tour of your workspace",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Present a simple how-to guide",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Introduce a guest speaker at a small event",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },
  {
    title: "Explain the benefits of a healthy habit",
    topic: "Presentation Formal Speech",
    difficulty: "Beginner",
  },

  // Presentation Formal Speech - Intermediate
  {
    title: "Deliver a 5-minute presentation on the impact of AI in education",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Present quarterly sales results to your team",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Give a product demo to potential clients",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Present your research findings to colleagues",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Deliver a training session on a new company policy",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Present a project proposal to management",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Give a presentation on industry trends",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Present budget recommendations to stakeholders",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Deliver a status update on a major initiative",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },
  {
    title: "Present solutions to a business problem",
    topic: "Presentation Formal Speech",
    difficulty: "Intermediate",
  },

  // Presentation Formal Speech - Advanced
  {
    title:
      "Deliver a keynote speech about sustainable business practices at a conference",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Present to a board of directors about strategic direction",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Give a TED-style talk on the future of remote work",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Present your business plan to venture capitalists",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Deliver a graduation commencement address",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Present complex research findings to a scientific committee",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Give an investor pitch for a startup",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Deliver a crisis communication address to stakeholders",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Present at an international conference to industry experts",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },
  {
    title: "Give a thought leadership presentation to C-suite executives",
    topic: "Presentation Formal Speech",
    difficulty: "Advanced",
  },

  // Casual Conversation - Beginner
  {
    title: "Introduce yourself to a new neighbor",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Talk about the weather with a cashier",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Ask for directions from a stranger",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Discuss your pets with other pet owners",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Talk about your commute with coworkers",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Share what you did last weekend",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Discuss your favorite local restaurant",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Talk about a recent movie you watched",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Ask about someone's day",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },
  {
    title: "Discuss seasonal activities and holidays",
    topic: "Casual Conversation",
    difficulty: "Beginner",
  },

  // Casual Conversation - Intermediate
  {
    title: "Discuss your weekend plans with colleagues",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Share your thoughts on current technology trends",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Talk about travel experiences and dream destinations",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Discuss your hobbies and interests at a social gathering",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Share cooking tips and favorite recipes",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Talk about books you've recently read",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Discuss fitness routines and health goals",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Chat about local events and community news",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Share opinions on popular TV shows or podcasts",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },
  {
    title: "Discuss career goals and professional development",
    topic: "Casual Conversation",
    difficulty: "Intermediate",
  },

  // Casual Conversation - Advanced
  {
    title: "Engage in nuanced discussions about current events",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Debate complex social or political topics respectfully",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Discuss philosophical questions about life and meaning",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Navigate sensitive conversations about personal beliefs",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Engage in deep conversations about relationships and family",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Discuss complex financial or investment strategies",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Talk about advanced technical concepts in your field",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Engage in cultural discussions about art, literature, or music",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Discuss ethical dilemmas and moral questions",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },
  {
    title: "Navigate difficult conversations about personal conflicts",
    topic: "Casual Conversation",
    difficulty: "Advanced",
  },

  // Storytelling - Beginner
  {
    title: "Tell about your first day at a new job or school",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Describe a funny thing your pet did",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Share a story about getting lost",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Tell about a time you tried something new",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Describe your best birthday ever",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Share a story about meeting someone famous",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Tell about a time you were really surprised",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Describe a memorable meal you had",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Share a story about bad weather",
    topic: "Storytelling",
    difficulty: "Beginner",
  },
  {
    title: "Tell about learning to drive or ride a bike",
    topic: "Storytelling",
    difficulty: "Beginner",
  },

  // Storytelling - Intermediate
  {
    title: "Tell the story of your most embarrassing moment",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Share a childhood memory that shaped who you are",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Narrate a travel experience that didn't go as planned",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Tell about a time when you overcame a fear",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Share the story of how you met your best friend",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Narrate a moment when you had to be brave",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Tell a family story that gets told at every gathering",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Share about a time you learned an important lesson",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Narrate an experience that changed your perspective",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },
  {
    title: "Tell about a time you helped someone in need",
    topic: "Storytelling",
    difficulty: "Intermediate",
  },

  // Storytelling - Advanced
  {
    title: "Narrate a complex life experience with multiple turning points",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Tell a story that weaves together multiple timelines",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Share a deeply personal story of transformation",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Narrate a story with moral complexity and ambiguity",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Tell a story that incorporates dialogue and character development",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Share a story that builds suspense and has a surprising twist",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title:
      "Narrate a story that connects personal experience to universal themes",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Tell a story using vivid sensory details and metaphors",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Share a story that demonstrates cause and effect over time",
    topic: "Storytelling",
    difficulty: "Advanced",
  },
  {
    title: "Narrate a story that reveals character through actions and choices",
    topic: "Storytelling",
    difficulty: "Advanced",
  },

  // Debate Argument - Beginner
  {
    title: "Should school uniforms be mandatory?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Is it better to read books or watch movies?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Should pets be allowed in all public places?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Is online shopping better than in-store shopping?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Should students get longer summer breaks?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Is it better to live in the city or the country?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Should everyone learn to cook?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Is social media more helpful or harmful for teens?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Should tipping at restaurants be mandatory?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },
  {
    title: "Is it better to exercise in the morning or evening?",
    topic: "Debate Argument",
    difficulty: "Beginner",
  },

  // Debate Argument - Intermediate
  {
    title: "Should remote work be the default for office jobs?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title:
      "Is artificial intelligence more beneficial or dangerous to society?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Should college education be free for everyone?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Are electric vehicles ready to replace gas cars?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Should social media platforms be regulated by government?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Is renewable energy feasible as our primary power source?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Should there be limits on CEO compensation?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Is the gig economy good or bad for workers?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Should genetic engineering be used to enhance human abilities?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },
  {
    title: "Are standardized tests an effective measure of education?",
    topic: "Debate Argument",
    difficulty: "Intermediate",
  },

  // Debate Argument - Advanced
  {
    title:
      "Should artificial general intelligence development be paused globally?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title:
      "Is universal basic income a solution to technological unemployment?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title:
      "Should we prioritize Mars colonization over Earth's climate crisis?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title: "Is privacy a fundamental right in the age of big data?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title:
      "Should democratic governments be able to override individual rights for collective good?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title: "Is economic growth compatible with environmental sustainability?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title:
      "Should human enhancement technologies be regulated or freely available?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title:
      "Is globalization ultimately beneficial or harmful to developing nations?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title: "Should we use geoengineering to combat climate change?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },
  {
    title: "Is moral relativism or moral absolutism more defensible?",
    topic: "Debate Argument",
    difficulty: "Advanced",
  },

  // Interview Responses - Beginner
  {
    title: "Tell me about yourself",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "Why are you interested in this job?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "What are your hobbies outside of work?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "Describe your ideal work environment",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "What motivates you to come to work each day?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "How do you like to spend your free time?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "What subjects did you enjoy most in school?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "Describe a typical day in your current/last job",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "What are you looking for in your next role?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },
  {
    title: "How did you hear about this position?",
    topic: "Interview Responses",
    difficulty: "Beginner",
  },

  // Interview Responses - Intermediate
  {
    title: "What are your greatest strengths and weaknesses?",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Describe a time when you had to work under pressure",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Tell me about a challenge you overcame at work",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "How do you handle constructive criticism?",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Where do you see yourself in five years?",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Describe a time you disagreed with your supervisor",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "What's your approach to working in a team?",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Tell me about a project you're particularly proud of",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "How do you prioritize multiple tasks and deadlines?",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },
  {
    title: "Describe a time you had to learn something new quickly",
    topic: "Interview Responses",
    difficulty: "Intermediate",
  },

  // Interview Responses - Advanced
  {
    title:
      "Describe a time you had to lead through significant organizational change",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title:
      "How would you handle a situation where you had to fire an underperforming employee?",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title:
      "Tell me about a time you made a decision with incomplete information",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title: "Describe your approach to managing conflict between team members",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title:
      "How do you balance competing priorities from different stakeholders?",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title: "Tell me about a time you failed and what you learned from it",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title: "How would you approach entering a new market with our product?",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title: "Describe your leadership philosophy and give specific examples",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title: "How do you measure success and ensure accountability in your team?",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },
  {
    title:
      "Tell me about a time you had to influence someone without direct authority",
    topic: "Interview Responses",
    difficulty: "Advanced",
  },

  // Impromptu Speaking - Beginner
  {
    title: "What's your favorite season and why?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "If you could have any superpower, what would it be?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "Describe your perfect weekend",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "What's the best gift you've ever received?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "If you could visit any place in the world, where would you go?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "What was your favorite subject in school?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "Describe your dream house",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "What's your favorite way to relax?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "If you could meet any celebrity, who would it be?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },
  {
    title: "What's the most useful thing you own?",
    topic: "Impromptu Speaking",
    difficulty: "Beginner",
  },

  // Impromptu Speaking - Intermediate
  {
    title:
      "If you could have dinner with any historical figure, who would it be and why?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "What would you do if you won the lottery tomorrow?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "If you could change one thing about your city, what would it be?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "What advice would you give to your 18-year-old self?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "If you could master any skill instantly, what would you choose?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "What's the most important lesson you've learned from failure?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "Describe what leadership means to you",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "If you could solve one world problem, which would you choose?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "What does success mean to you personally?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },
  {
    title: "If you could start any business, what would it be?",
    topic: "Impromptu Speaking",
    difficulty: "Intermediate",
  },

  // Impromptu Speaking - Advanced
  {
    title: "How would you redesign the education system from scratch?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "If you were leading a country, what would be your first three policies?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "How do you think human consciousness works and could it be replicated?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title: "What would you do if you discovered you only had one year to live?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title: "How would you convince a skeptic that your biggest belief is true?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "If you could add one amendment to your country's constitution, what would it be?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "How would you solve the balance between individual freedom and collective responsibility?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "What would you do if you had unlimited resources but only 24 hours?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title:
      "How would you explain the concept of time to someone from a timeless dimension?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
  {
    title: "If you could redesign human nature, what would you change and why?",
    topic: "Impromptu Speaking",
    difficulty: "Advanced",
  },
]);