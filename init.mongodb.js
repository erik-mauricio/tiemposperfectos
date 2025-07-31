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