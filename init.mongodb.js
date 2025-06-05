use("app")

db.conjugations.drop()
db.createCollection("conjugations")

db.conjugations.insertMany([
    {
        "word":"bailar",
        "sentence":"Ella (bailar)__ ...",
        "answer":"baila",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"leer",
        "sentence":"Nosotros (leer)__ ...",
        "answer":"leemos",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"hablar",
        "sentence":"Yo (hablar)__ ...",
        "answer":"hablo",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"bailar",
        "sentence":"Ella (bailar)__ ...",
        "answer":"baila",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"vivir",
        "sentence":"Ellos (vivir)__ ...",
        "answer":"viven",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"leer",
        "sentence":"Nosotros (leer)__ ...",
        "answer":"leemos",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"leer",
        "sentence":"Nosotros (leer)__ ...",
        "answer":"leemos",
        "difficulty":"easy",
        "tense":"present"
    },{
        "word":"vivir",
        "sentence":"Ellos (vivir)__ ...",
        "answer":"viven",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"leer",
        "sentence":"Nosotros (leer)__ ...",
        "answer":"leemos",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"hablar",
        "sentence":"Yo (hablar)__ ...",
        "answer":"hablo",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"leer",
        "sentence":"Nosotros (leer)__ ...",
        "answer":"leemos",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"vivir",
        "sentence":"Ellos (vivir)__ ...",
        "answer":"viven",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"comer",
        "sentence":"T\u00fa (comer)__ ...",
        "answer":"comes",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"hablar",
        "sentence":"Yo (hablar)__ ...",
        "answer":"hablo",
        "difficulty":"easy",
        "tense":"present"
    },
    {
        "word":"tener",
        "sentence":"Nosotros (tener)__ ...",
        "answer":"tenemos",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"tener",
        "sentence":"Nosotros (tener)__ ...",
        "answer":"tenemos",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"ir",
        "sentence":"Ellas (ir)__ ...",
        "answer":"fueron",
        "difficulty":"medium",
        "tense":"preterite"
    },
    {
        "word":"ir",
        "sentence":"Ellas (ir)__ ...",
        "answer":"fueron",
        "difficulty":"medium",
        "tense":"preterite"
    },
    {
        "word":"ir",
        "sentence":"Ellas (ir)__ ...",
        "answer":"fueron",
        "difficulty":"medium",
        "tense":"preterite"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"poder",
        "sentence":"T\u00fa (poder)__ ...",
        "answer":"puedes",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"ir",
        "sentence":"Ellas (ir)__ ...",
        "answer":"fueron",
        "difficulty":"medium",
        "tense":"preterite"
    },
    {
        "word":"poder",
        "sentence":"T\u00fa (poder)__ ...",
        "answer":"puedes",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"estar",
        "sentence":"Ustedes (estar)__ ...",
        "answer":"est\u00e1n",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"tener",
        "sentence":"Nosotros (tener)__ ...",
        "answer":"tenemos",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"tener",
        "sentence":"Nosotros (tener)__ ...",
        "answer":"tenemos",
        "difficulty":"medium",
        "tense":"present"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"ser",
        "sentence":"Yo (ser)__ ...",
        "answer":"era",
        "difficulty":"medium",
        "tense":"imperfect"
    },
    {
        "word":"ir",
        "sentence":"Ellas (ir)__ ...",
        "answer":"fueron",
        "difficulty":"medium",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"conducir",
        "sentence":"Ellos (conducir)__ ...",
        "answer":"condujeron",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"haber",
        "sentence":"Ella (haber)__ ...",
        "answer":"hab\u00eda",
        "difficulty":"hard",
        "tense":"imperfect"
    },
    {
        "word":"decir",
        "sentence":"T\u00fa (decir)__ ...",
        "answer":"dijiste",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"haber",
        "sentence":"Ella (haber)__ ...",
        "answer":"hab\u00eda",
        "difficulty":"hard",
        "tense":"imperfect"
    },
    {
        "word":"conducir",
        "sentence":"Ellos (conducir)__ ...",
        "answer":"condujeron",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"haber",
        "sentence":"Ella (haber)__ ...",
        "answer":"hab\u00eda",
        "difficulty":"hard",
        "tense":"imperfect"
    },
    {
        "word":"haber",
        "sentence":"Ella (haber)__ ...",
        "answer":"hab\u00eda",
        "difficulty":"hard",
        "tense":"imperfect"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"decir",
        "sentence":"T\u00fa (decir)__ ...",
        "answer":"dijiste",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"decir",
        "sentence":"T\u00fa (decir)__ ...",
        "answer":"dijiste",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"conducir",
        "sentence":"Ellos (conducir)__ ...",
        "answer":"condujeron",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"decir",
        "sentence":"T\u00fa (decir)__ ...",
        "answer":"dijiste",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"saber",
        "sentence":"Yo (saber)__ ...",
        "answer":"supe",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"traer",
        "sentence":"Nosotros (traer)__ ...",
        "answer":"trajimos",
        "difficulty":"hard",
        "tense":"preterite"
    },
    {
        "word":"conducir",
        "sentence":"Ellos (conducir)__ ...",
        "answer":"condujeron",
        "difficulty":"hard",
        "tense":"preterite"
    }
])

db.conjugations.createIndex({ tense: "text"})


db.readings.drop()
db.createCollection("readings")

db.readings.insertOne({
        "text": "Durante el siglo XIX, América Latina atravesó profundos cambios políticos, sociales y económicos. Tras las guerras de independencia, los nuevos Estados enfrentaron el desafío de construir naciones estables en medio de conflictos internos, luchas por el poder y la intervención de potencias extranjeras. En muchos países, las élites criollas dominaron el escenario político, imponiendo modelos económicos orientados a la exportación de materias primas. Este modelo favoreció a las clases altas, pero profundizó las desigualdades sociales y marginó a las poblaciones indígenas y afrodescendientes. Además, la falta de infraestructuras, la inestabilidad institucional y las deudas externas limitaron el desarrollo regional, consolidando una dependencia estructural frente a Europa y, posteriormente, a Estados Unidos.",
        "difficulty": "hard",
        "questions": [
            {
                "question": "¿Qué tipo de cambios ocurrieron en América Latina durante el siglo XIX?",
                "responses": {
                    "A": "Culturales y artísticos.",
                    "B": "Políticos, sociales y económicos.",
                    "C": "Militares exclusivamente.",
                    "D": "Religiosos y científicos."
                },
                "answer": "B"
            },
            {
                "question": "¿Cuál fue uno de los principales retos tras la independencia?",
                "responses": {
                    "A": "Restaurar el control español.",
                    "B": "Organizar ferias comerciales.",
                    "C": "Construir naciones estables.",
                    "D": "Eliminar la educación pública."
                },
                "answer": "C"
            },
            {
                "question": "¿Quiénes dominaron el poder político en muchos países?",
                "responses": {
                    "A": "Las clases trabajadoras.",
                    "B": "Las poblaciones indígenas.",
                    "C": "Las élites criollas.",
                    "D": "Los comerciantes europeos."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué modelo económico se implementó?",
                "responses": {
                    "A": "Industrializado y autosuficiente.",
                    "B": "Orientado a la exportación de materias primas.",
                    "C": "Basado en tecnología avanzada.",
                    "D": "Totalmente agrícola."
                },
                "answer": "B"
            },
            {
                "question": "¿A quién benefició principalmente este modelo económico?",
                "responses": {
                    "A": "A las clases medias urbanas.",
                    "B": "A las poblaciones rurales.",
                    "C": "A las clases altas.",
                    "D": "A los trabajadores extranjeros."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué grupos fueron marginados por este sistema?",
                "responses": {
                    "A": "Los comerciantes europeos.",
                    "B": "Los líderes criollos.",
                    "C": "Las poblaciones indígenas y afrodescendientes.",
                    "D": "Los diplomáticos estadounidenses."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué elementos limitaron el desarrollo regional?",
                "responses": {
                    "A": "Las guerras mundiales.",
                    "B": "La falta de universidades.",
                    "C": "La inestabilidad institucional y la deuda externa.",
                    "D": "El exceso de inversión extranjera."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué tipo de dependencia se consolidó?",
                "responses": {
                    "A": "Independencia económica.",
                    "B": "Dependencia estructural hacia Europa y EE. UU.",
                    "C": "Autosuficiencia tecnológica.",
                    "D": "Relaciones diplomáticas igualitarias."
                },
                "answer": "B"
            },
            {
                "question": "¿Qué papel jugó la intervención extranjera?",
                "responses": {
                    "A": "Ayudó a estabilizar los gobiernos.",
                    "B": "No tuvo ningún efecto.",
                    "C": "Influyó en los conflictos internos.",
                    "D": "Redujo las tensiones sociales."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué característica tuvo el poder criollo?",
                "responses": {
                    "A": "Era inclusivo con los indígenas.",
                    "B": "Buscaba una redistribución equitativa.",
                    "C": "Mantuvo privilegios para las élites.",
                    "D": "Fue cedido a potencias extranjeras."
                },
                "answer": "C"
            },
            {
                "question": "¿Cómo afectó la estructura económica a las clases populares?",
                "responses": {
                    "A": "Las benefició mediante subsidios.",
                    "B": "No tuvo impacto significativo.",
                    "C": "Aumentó su poder adquisitivo.",
                    "D": "Profundizó las desigualdades sociales."
                },
                "answer": "D"
            },
            {
                "question": "¿Qué limitaciones enfrentaron las nuevas naciones?",
                "responses": {
                    "A": "Falta de acceso a la religión.",
                    "B": "Carencia de recursos naturales.",
                    "C": "Deudas externas e inestabilidad.",
                    "D": "Falta de creatividad política."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué ocurrió tras las guerras de independencia?",
                "responses": {
                    "A": "Se formaron gobiernos coloniales.",
                    "B": "Se cerraron fronteras al comercio.",
                    "C": "Surgieron Estados con desafíos internos.",
                    "D": "América Latina fue anexada a EE. UU."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué reflejan las políticas de las élites criollas?",
                "responses": {
                    "A": "Un enfoque en equidad social.",
                    "B": "Una visión nacionalista integradora.",
                    "C": "Un interés por mantener el control económico.",
                    "D": "El impulso de reformas indígenas."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué relación tuvo América Latina con las potencias extranjeras?",
                "responses": {
                    "A": "Autonomía total.",
                    "B": "Intervención y dependencia.",
                    "C": "Alianzas igualitarias.",
                    "D": "Conflictos bélicos constantes."
                },
                "answer": "B"
            }
        ]
    }

)