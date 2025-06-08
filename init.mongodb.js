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

db.readings.insertMany([{
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
    },
    {
        "text": "La Revolución Mexicana (1910-1920) fue uno de los movimientos sociales más importantes de América Latina en el siglo XX. Iniciada por Francisco I. Madero contra la dictadura de Porfirio Díaz, la revolución se convirtió en una compleja guerra civil que involucró a múltiples facciones. Figuras como Emiliano Zapata y Pancho Villa lideraron movimientos campesinos que demandaban reforma agraria y justicia social. El conflicto expuso las profundas desigualdades del México porfiriano, donde una pequeña élite controlaba la mayoría de las tierras mientras millones de campesinos vivían en condiciones de pobreza extrema. La Constitución de 1917 estableció principios revolucionarios como la reforma agraria, los derechos laborales y la educación pública, aunque su implementación enfrentó resistencias y limitaciones. El legado de la revolución transformó la estructura social mexicana, pero muchas de sus promesas de justicia social permanecieron incumplidas durante décadas.",
        "difficulty": "hard",
        "questions": [
            {
                "question": "¿Cuándo ocurrió la Revolución Mexicana?",
                "responses": {
                    "A": "1900-1910",
                    "B": "1910-1920",
                    "C": "1920-1930",
                    "D": "1905-1915"
                },
                "answer": "B"
            },
            {
                "question": "¿Quién inició la revolución?",
                "responses": {
                    "A": "Emiliano Zapata",
                    "B": "Pancho Villa",
                    "C": "Francisco I. Madero",
                    "D": "Porfirio Díaz"
                },
                "answer": "C"
            },
            {
                "question": "¿Contra quién se dirigió inicialmente la revolución?",
                "responses": {
                    "A": "La dictadura de Porfirio Díaz",
                    "B": "La invasión estadounidense",
                    "C": "El gobierno colonial",
                    "D": "Las fuerzas francesas"
                },
                "answer": "A"
            },
            {
                "question": "¿Qué demandaban los movimientos campesinos?",
                "responses": {
                    "A": "Independencia política",
                    "B": "Reforma agraria y justicia social",
                    "C": "Industrialización acelerada",
                    "D": "Alianzas con Europa"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué caracterizaba al México porfiriano?",
                "responses": {
                    "A": "Distribución equitativa de tierras",
                    "B": "Democracia participativa",
                    "C": "Concentración de tierras en pocas manos",
                    "D": "Ausencia de desigualdades"
                },
                "answer": "C"
            },
            {
                "question": "¿Cuándo se promulgó la nueva Constitución?",
                "responses": {
                    "A": "1915",
                    "B": "1917",
                    "C": "1920",
                    "D": "1910"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué principios estableció la Constitución de 1917?",
                "responses": {
                    "A": "Monarquía constitucional",
                    "B": "Reforma agraria y derechos laborales",
                    "C": "Separación de la iglesia",
                    "D": "Anexión a Estados Unidos"
                },
                "answer": "B"
            },
            {
                "question": "¿Cómo se caracterizó el conflicto revolucionario?",
                "responses": {
                    "A": "Guerra internacional",
                    "B": "Revolución pacífica",
                    "C": "Compleja guerra civil",
                    "D": "Movimiento intelectual"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué sucedió con las promesas revolucionarias?",
                "responses": {
                    "A": "Se cumplieron inmediatamente",
                    "B": "Fueron abandonadas completamente",
                    "C": "Permanecieron incumplidas por décadas",
                    "D": "Solo beneficiaron a las élites"
                },
                "answer": "C"
            },
            {
                "question": "¿Quiénes lideraron los movimientos campesinos?",
                "responses": {
                    "A": "Industriales urbanos",
                    "B": "Emiliano Zapata y Pancho Villa",
                    "C": "Oficiales del ejército federal",
                    "D": "Comerciantes extranjeros"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué expuso el conflicto revolucionario?",
                "responses": {
                    "A": "La fortaleza institucional",
                    "B": "Las profundas desigualdades sociales",
                    "C": "La prosperidad económica",
                    "D": "La unidad nacional"
                },
                "answer": "B"
            },
            {
                "question": "¿Cómo vivían los campesinos antes de la revolución?",
                "responses": {
                    "A": "En prosperidad económica",
                    "B": "Con derechos políticos plenos",
                    "C": "En condiciones de pobreza extrema",
                    "D": "Como propietarios de grandes extensiones"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué enfrentó la implementación constitucional?",
                "responses": {
                    "A": "Apoyo unánime",
                    "B": "Resistencias y limitaciones",
                    "C": "Facilidades administrativas",
                    "D": "Recursos abundantes"
                },
                "answer": "B"
            },
            {
                "question": "¿Cuál fue el impacto de la revolución?",
                "responses": {
                    "A": "Mantuvo las estructuras coloniales",
                    "B": "Transformó la estructura social",
                    "C": "No tuvo efectos duraderos",
                    "D": "Solo afectó las ciudades"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué incluyó la Constitución además de reforma agraria?",
                "responses": {
                    "A": "Prohibición del comercio",
                    "B": "Restauración monárquica",
                    "C": "Derechos laborales y educación pública",
                    "D": "Alianza militar con Europa"
                },
                "answer": "C"
            }
        ]
    },
        {
            "text": "El boom del café en América Central y partes de Sudamérica durante los siglos XIX y XX transformó radicalmente las economías regionales. Países como Costa Rica, Guatemala, Colombia y Brasil se convirtieron en grandes productores, estableciendo el café como su principal producto de exportación. Esta transformación económica vino acompañada de cambios sociales profundos: se consolidaron oligarquías cafetaleras que concentraron tierras y poder político, mientras se desarrolló un proletariado rural dependiente de los ciclos de cosecha. La infraestructura se modernizó para facilitar la exportación, construyéndose ferrocarriles que conectaban las zonas productoras con los puertos. Sin embargo, esta especialización también creó vulnerabilidades: las fluctuaciones en los precios internacionales del café generaban crisis económicas recurrentes. Además, el modelo agroexportador reforzó la dependencia hacia los mercados externos, principalmente europeos y estadounidenses, limitando la diversificación económica y perpetuando estructuras de desigualdad social que perduraron durante generaciones.",
            "difficulty": "hard",
            "questions": [
                {
                    "question": "¿Cuándo ocurrió el boom del café?",
                    "responses": {
                        "A": "Siglo XVIII únicamente",
                        "B": "Siglos XIX y XX",
                        "C": "Solo en el siglo XXI",
                        "D": "Durante la época colonial"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué países se mencionan como grandes productores?",
                    "responses": {
                        "A": "México, Argentina, Chile",
                        "B": "Costa Rica, Guatemala, Colombia y Brasil",
                        "C": "Venezuela, Ecuador, Perú",
                        "D": "Bolivia, Paraguay, Uruguay"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué se consolidó socialmente durante este período?",
                    "responses": {
                        "A": "Democracias participativas",
                        "B": "Cooperativas campesinas",
                        "C": "Oligarquías cafetaleras",
                        "D": "Sindicatos industriales"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué tipo de trabajadores se desarrolló?",
                    "responses": {
                        "A": "Empresarios independientes",
                        "B": "Proletariado rural dependiente",
                        "C": "Artesanos urbanos",
                        "D": "Comerciantes internacionales"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Cómo se modernizó la infraestructura?",
                    "responses": {
                        "A": "Construyendo universidades",
                        "B": "Edificando teatros",
                        "C": "Construyendo ferrocarriles",
                        "D": "Creando bancos"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Cuál fue el propósito de los ferrocarriles?",
                    "responses": {
                        "A": "Turismo interno",
                        "B": "Conectar zonas productoras con puertos",
                        "C": "Transporte de pasajeros urbanos",
                        "D": "Defensa militar"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué vulnerabilidades creó la especialización?",
                    "responses": {
                        "A": "Ataques militares",
                        "B": "Crisis por fluctuaciones de precios",
                        "C": "Desastres naturales",
                        "D": "Conflictos religiosos"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Hacia qué mercados se orientó principalmente la dependencia?",
                    "responses": {
                        "A": "Asiáticos y africanos",
                        "B": "Europeos y estadounidenses",
                        "C": "Regionales latinoamericanos",
                        "D": "Mercados internos únicamente"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué limitó el modelo agroexportador?",
                    "responses": {
                        "A": "La diversificación económica",
                        "B": "El desarrollo tecnológico",
                        "C": "La integración regional",
                        "D": "La innovación industrial"
                    },
                    "answer": "A"
                },
                {
                    "question": "¿Cómo afectaron las crisis del café?",
                    "responses": {
                        "A": "Solo a los grandes productores",
                        "B": "Generaron crisis económicas recurrentes",
                        "C": "Mejoraron la distribución de ingresos",
                        "D": "Fortalecieron la economía interna"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué perpetuó el modelo cafetalero?",
                    "responses": {
                        "A": "La igualdad social",
                        "B": "La democracia política",
                        "C": "Estructuras de desigualdad social",
                        "D": "La autosuficiencia económica"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Cómo se caracterizó la dependencia de los trabajadores?",
                    "responses": {
                        "A": "Estacional por los ciclos de cosecha",
                        "B": "Independiente de la producción",
                        "C": "Basada en salarios fijos anuales",
                        "D": "Orientada al mercado interno"
                    },
                    "answer": "A"
                },
                {
                    "question": "¿Qué concentraron las oligarquías cafetaleras?",
                    "responses": {
                        "A": "Solo conocimiento técnico",
                        "B": "Tierras y poder político",
                        "C": "Únicamente capital financiero",
                        "D": "Exclusivamente exportaciones"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Durante cuánto tiempo perduraron las desigualdades?",
                    "responses": {
                        "A": "Solo durante el boom",
                        "B": "Unos pocos años",
                        "C": "Durante generaciones",
                        "D": "Se eliminaron rápidamente"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué rol tuvo el café en estas economías?",
                    "responses": {
                        "A": "Producto secundario",
                        "B": "Principal producto de exportación",
                        "C": "Solo para consumo interno",
                        "D": "Cultivo experimental"
                    },
                    "answer": "B"
                }
            ]
        },
        {
            "text": "La Guerra del Pacífico (1879-1884) enfrentó a Chile contra la alianza de Perú y Bolivia, convirtiéndose en el conflicto más devastador de la región durante el siglo XIX. El origen del conflicto radicaba en las disputas territoriales y el control de los ricos yacimientos de salitre y guano en el desierto de Atacama, recursos fundamentales para la economía mundial de la época. Chile, con una marina superior y mejor organización militar, logró victorias decisivas en batallas navales como la de Angamos, donde murió el almirante peruano Miguel Grau. La guerra se extendió al territorio terrestre, culminando con la ocupación chilena de Lima en 1881. Las consecuencias fueron dramáticas: Perú perdió las provincias de Tarapacá y Arica, Bolivia perdió su acceso al mar al ceder Antofagasta, y Chile se consolidó como potencia regional. El conflicto dejó profundas heridas en las relaciones between estos países, generando resentimientos que perduran hasta la actualidad. Además, la guerra demostró la importancia estratégica de los recursos naturales en la geopolítica sudamericana.",
            "difficulty": "hard",
            "questions": [
                {
                    "question": "¿Cuándo se desarrolló la Guerra del Pacífico?",
                    "responses": {
                        "A": "1870-1875",
                        "B": "1879-1884",
                        "C": "1885-1890",
                        "D": "1875-1880"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué países formaron la alianza contra Chile?",
                    "responses": {
                        "A": "Argentina y Uruguay",
                        "B": "Colombia y Venezuela",
                        "C": "Perú y Bolivia",
                        "D": "Ecuador y Paraguay"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Cuál fue el origen del conflicto?",
                    "responses": {
                        "A": "Diferencias religiosas",
                        "B": "Disputas territoriales y control de recursos",
                        "C": "Conflictos comerciales",
                        "D": "Alianzas con potencias europeas"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué recursos estaban en disputa?",
                    "responses": {
                        "A": "Petróleo y gas",
                        "B": "Oro y plata",
                        "C": "Salitre y guano",
                        "D": "Carbón y hierro"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Dónde se ubicaban estos yacimientos?",
                    "responses": {
                        "A": "Cordillera de los Andes",
                        "B": "Selva amazónica",
                        "C": "Desierto de Atacama",
                        "D": "Costa del Atlántico"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué ventajas tenía Chile?",
                    "responses": {
                        "A": "Mayor población",
                        "B": "Marina superior y mejor organización militar",
                        "C": "Apoyo de Estados Unidos",
                        "D": "Recursos económicos ilimitados"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿En qué batalla murió Miguel Grau?",
                    "responses": {
                        "A": "Batalla de Iquique",
                        "B": "Batalla de Angamos",
                        "C": "Batalla de Arica",
                        "D": "Batalla de Tacna"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Cuándo ocupó Chile la capital peruana?",
                    "responses": {
                        "A": "1879",
                        "B": "1880",
                        "C": "1881",
                        "D": "1882"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué provincias perdió Perú?",
                    "responses": {
                        "A": "Cuzco y Arequipa",
                        "B": "Tarapacá y Arica",
                        "C": "Piura y Lambayeque",
                        "D": "Ica y Huancavelica"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué perdió Bolivia en el conflicto?",
                    "responses": {
                        "A": "Su capital",
                        "B": "Su acceso al mar",
                        "C": "Su independencia",
                        "D": "Su moneda nacional"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué territorio cedió Bolivia?",
                    "responses": {
                        "A": "La Paz",
                        "B": "Antofagasta",
                        "C": "Santa Cruz",
                        "D": "Cochabamba"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Cómo se consolidó Chile tras la guerra?",
                    "responses": {
                        "A": "Como potencia mundial",
                        "B": "Como potencia regional",
                        "C": "Como colonia europea",
                        "D": "Como estado federado"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué generó el conflicto entre los países?",
                    "responses": {
                        "A": "Alianzas duraderas",
                        "B": "Intercambio comercial",
                        "C": "Resentimientos perdurables",
                        "D": "Cooperación regional"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué demostró la guerra sobre los recursos naturales?",
                    "responses": {
                        "A": "Su irrelevancia política",
                        "B": "Su importancia estratégica en geopolítica",
                        "C": "Su abundancia regional",
                        "D": "Su fácil explotación"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Quién era Miguel Grau?",
                    "responses": {
                        "A": "General boliviano",
                        "B": "Diplomático chileno",
                        "C": "Almirante peruano",
                        "D": "Político ecuatoriano"
                    },
                    "answer": "C"
                }
            ]
        },
        {
            "text": "La llegada de inmigrantes europeos a Argentina entre 1870 y 1930 transformó radicalmente la composición demográfica y cultural del país. Más de seis millones de personas, principalmente italianos y españoles, abandonaron Europa buscando mejores oportunidades económicas en el Río de la Plata. Esta inmigración masiva fue promovida activamente por el gobierno argentino, que necesitaba mano de obra para desarrollar la agricultura y modernizar las ciudades. Los inmigrantes se establecieron principalmente en Buenos Aires y las provincias pampeanas, donde trabajaron en estancias, frigoríficos y el sector de servicios urbanos. Sin embargo, la integración no fue sencilla: muchos inmigrantes enfrentaron discriminación, condiciones laborales precarias y dificultades para acceder a la propiedad de la tierra. A pesar de estos obstáculos, la inmigración europea contribuyó significativamente al crecimiento económico argentino, al desarrollo de la industria incipiente y a la formación de una clase media urbana. La influencia cultural fue igualmente profunda, transformando la gastronomía, el idioma y las tradiciones populares, creando una sociedad más cosmopolita pero también generando tensiones entre los diferentes grupos étnicos.",
            "difficulty": "hard",
            "questions": [
                {
                    "question": "¿En qué período ocurrió la inmigración masiva?",
                    "responses": {
                        "A": "1850-1900",
                        "B": "1870-1930",
                        "C": "1900-1950",
                        "D": "1830-1880"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Cuántos inmigrantes llegaron aproximadamente?",
                    "responses": {
                        "A": "Más de tres millones",
                        "B": "Más de seis millones",
                        "C": "Más de diez millones",
                        "D": "Más de un millón"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿De qué países procedían principalmente?",
                    "responses": {
                        "A": "Francia y Alemania",
                        "B": "Polonia y Rusia",
                        "C": "Italia y España",
                        "D": "Portugal y Reino Unido"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Por qué promovió el gobierno esta inmigración?",
                    "responses": {
                        "A": "Para aumentar la diversidad cultural",
                        "B": "Para competir con Brasil",
                        "C": "Para desarrollar agricultura y modernizar ciudades",
                        "D": "Para fortalecer las fuerzas armadas"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Dónde se establecieron principalmente los inmigrantes?",
                    "responses": {
                        "A": "En las montañas andinas",
                        "B": "En Buenos Aires y provincias pampeanas",
                        "C": "En la Patagonia exclusivamente",
                        "D": "En el norte del país"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿En qué sectores trabajaron?",
                    "responses": {
                        "A": "Solo en la minería",
                        "B": "Únicamente en comercio",
                        "C": "En estancias, frigoríficos y servicios urbanos",
                        "D": "Exclusivamente en educación"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué dificultades enfrentaron los inmigrantes?",
                    "responses": {
                        "A": "Solo problemas climáticos",
                        "B": "Discriminación y condiciones laborales precarias",
                        "C": "Únicamente barreras lingüísticas",
                        "D": "Solo dificultades de transporte"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿A qué tuvieron dificultades para acceder?",
                    "responses": {
                        "A": "A la educación pública",
                        "B": "A los servicios médicos",
                        "C": "A la propiedad de la tierra",
                        "D": "A los derechos políticos"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Cómo contribuyó la inmigración a la economía?",
                    "responses": {
                        "A": "Solo aumentó los gastos públicos",
                        "B": "Contribuyó al crecimiento y desarrollo industrial",
                        "C": "No tuvo impacto económico",
                        "D": "Solo afectó el sector agrícola"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué clase social se formó?",
                    "responses": {
                        "A": "Una aristocracia rural",
                        "B": "Una clase media urbana",
                        "C": "Una élite intelectual",
                        "D": "Una burguesía comercial"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué aspectos culturales se transformaron?",
                    "responses": {
                        "A": "Solo la arquitectura",
                        "B": "Únicamente la música",
                        "C": "Gastronomía, idioma y tradiciones",
                        "D": "Solo las festividades religiosas"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué tipo de sociedad se creó?",
                    "responses": {
                        "A": "Una sociedad homogénea",
                        "B": "Una sociedad más cosmopolita",
                        "C": "Una sociedad rural tradicional",
                        "D": "Una sociedad cerrada"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Qué generó la diversidad étnica?",
                    "responses": {
                        "A": "Solo beneficios culturales",
                        "B": "Únicamente progreso económico",
                        "C": "Tensiones entre grupos étnicos",
                        "D": "Solo intercambio comercial"
                    },
                    "answer": "C"
                },
                {
                    "question": "¿Qué buscaban los europeos en Argentina?",
                    "responses": {
                        "A": "Aventuras geográficas",
                        "B": "Mejores oportunidades económicas",
                        "C": "Refugio político exclusivamente",
                        "D": "Estudios universitarios"
                    },
                    "answer": "B"
                },
                {
                    "question": "¿Cómo fue el proceso de integración?",
                    "responses": {
                        "A": "Completamente exitoso",
                        "B": "No presentó dificultades",
                        "C": "No fue sencillo",
                        "D": "Fue imposible de lograr"
                    },
                    "answer": "C"
                }
            ]
        }]
)

db.readings.insertMany([
    {
        "text": "Carlos se despertó temprano para ir a la escuela. Se vistió, desayunó y salió de casa. En el camino saludó a sus vecinos y llegó puntual a su clase de matemáticas.",
        "difficulty": "easy",
        "questions": [
            {
                "question": "¿Por qué se despertó Carlos temprano?",
                "responses": {
                    "A": "Para ver televisión.",
                    "B": "Para ir a la escuela.",
                    "C": "Para jugar videojuegos.",
                    "D": "Para cocinar."
                },
                "answer": "B"
            },
            {
                "question": "¿Qué hizo Carlos después de vestirse?",
                "responses": {
                    "A": "Se fue a dormir.",
                    "B": "Llamó a su amigo.",
                    "C": "Desayunó.",
                    "D": "Se duchó."
                },
                "answer": "C"
            },
            {
                "question": "¿A quién saludó en el camino?",
                "responses": {
                    "A": "A sus primos.",
                    "B": "A sus maestros.",
                    "C": "A sus vecinos.",
                    "D": "A sus compañeros."
                },
                "answer": "C"
            },
            {
                "question": "¿A qué clase llegó puntual?",
                "responses": {
                    "A": "Historia.",
                    "B": "Español.",
                    "C": "Matemáticas.",
                    "D": "Arte."
                },
                "answer": "C"
            },
            {
                "question": "¿Cómo fue el comienzo del día de Carlos?",
                "responses": {
                    "A": "Lento.",
                    "B": "Ocupado.",
                    "C": "Tranquilo y puntual.",
                    "D": "Estresante."
                },
                "answer": "C"
            }
        ]
    },
    {
        "text": "Lucía va al parque con su perro cada tarde. Juega a lanzar la pelota y luego camina un rato. Siempre lleva agua para no tener sed.",
        "difficulty": "easy",
        "questions": [
            {
                "question": "¿Con quién va Lucía al parque?",
                "responses": {
                    "A": "Con su hermano.",
                    "B": "Con su perro.",
                    "C": "Con su gato.",
                    "D": "Con su amiga."
                },
                "answer": "B"
            },
            {
                "question": "¿Qué hace en el parque?",
                "responses": {
                    "A": "Lee un libro.",
                    "B": "Toma fotos.",
                    "C": "Juega a lanzar la pelota.",
                    "D": "Nada en el lago."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué hace después de jugar?",
                "responses": {
                    "A": "Corre.",
                    "B": "Camina.",
                    "C": "Come.",
                    "D": "Duerme."
                },
                "answer": "B"
            },
            {
                "question": "¿Qué lleva siempre con ella?",
                "responses": {
                    "A": "Comida.",
                    "B": "Un libro.",
                    "C": "Una pelota.",
                    "D": "Agua."
                },
                "answer": "D"
            },
            {
                "question": "¿Por qué lleva agua?",
                "responses": {
                    "A": "Porque tiene sed.",
                    "B": "Para su perro.",
                    "C": "Para no tener sed.",
                    "D": "Porque hace frío."
                },
                "answer": "C"
            }
        ]
    },
    {
        "text": "Miguel prepara una ensalada con tomate, lechuga y zanahoria. La sirve en un plato grande y le pone un poco de limón. Luego, se la come en la cocina.",
        "difficulty": "easy",
        "questions": [
            {
                "question": "¿Qué prepara Miguel?",
                "responses": {
                    "A": "Una sopa.",
                    "B": "Una ensalada.",
                    "C": "Un sándwich.",
                    "D": "Un pastel."
                },
                "answer": "B"
            },
            {
                "question": "¿Qué ingredientes usa?",
                "responses": {
                    "A": "Tomate, lechuga y zanahoria.",
                    "B": "Papa, zanahoria y pollo.",
                    "C": "Pan y queso.",
                    "D": "Manzana y plátano."
                },
                "answer": "A"
            },
            {
                "question": "¿Dónde pone la ensalada?",
                "responses": {
                    "A": "En una caja.",
                    "B": "En un tazón pequeño.",
                    "C": "En un plato grande.",
                    "D": "En un vaso."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué le agrega a la ensalada?",
                "responses": {
                    "A": "Vinagre.",
                    "B": "Aceite.",
                    "C": "Azúcar.",
                    "D": "Limón."
                },
                "answer": "D"
            },
            {
                "question": "¿Dónde se la come?",
                "responses": {
                    "A": "En el jardín.",
                    "B": "En el cuarto.",
                    "C": "En la cocina.",
                    "D": "En la escuela."
                },
                "answer": "C"
            }
        ]
    },
    {
        "text": "Ana escucha música mientras hace su tarea. Le gusta el pop y también el rock. Siempre usa audífonos para no molestar a su familia.",
        "difficulty": "easy",
        "questions": [
            {
                "question": "¿Qué hace Ana mientras escucha música?",
                "responses": {
                    "A": "Limpia su cuarto.",
                    "B": "Ve televisión.",
                    "C": "Hace su tarea.",
                    "D": "Habla por teléfono."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué tipo de música le gusta?",
                "responses": {
                    "A": "Clásica.",
                    "B": "Pop y rock.",
                    "C": "Jazz.",
                    "D": "Reggaetón."
                },
                "answer": "B"
            },
            {
                "question": "¿Por qué usa audífonos?",
                "responses": {
                    "A": "Porque es de noche.",
                    "B": "Para escuchar mejor.",
                    "C": "Para no molestar a su familia.",
                    "D": "Porque están de moda."
                },
                "answer": "C"
            },
            {
                "question": "¿Cuándo escucha música?",
                "responses": {
                    "A": "Mientras duerme.",
                    "B": "Mientras estudia.",
                    "C": "Mientras hace su tarea.",
                    "D": "Mientras cocina."
                },
                "answer": "C"
            },
            {
                "question": "¿Con qué escucha la música?",
                "responses": {
                    "A": "Con bocinas.",
                    "B": "Con audífonos.",
                    "C": "Con un radio.",
                    "D": "Con el celular."
                },
                "answer": "B"
            }
        ]
    },
    {
        "text": "Pedro va al supermercado los sábados. Compra pan, leche, huevos y frutas. Luego regresa a casa caminando con su mochila llena.",
        "difficulty": "easy",
        "questions": [
            {
                "question": "¿Cuándo va Pedro al supermercado?",
                "responses": {
                    "A": "Los domingos.",
                    "B": "Los viernes.",
                    "C": "Los sábados.",
                    "D": "Los lunes."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué productos compra Pedro?",
                "responses": {
                    "A": "Pescado y carne.",
                    "B": "Pan, leche, huevos y frutas.",
                    "C": "Juguetes y ropa.",
                    "D": "Libros y cuadernos."
                },
                "answer": "B"
            },
            {
                "question": "¿Cómo regresa a casa?",
                "responses": {
                    "A": "En bicicleta.",
                    "B": "En coche.",
                    "C": "En autobús.",
                    "D": "Caminando."
                },
                "answer": "D"
            },
            {
                "question": "¿Qué usa para llevar sus compras?",
                "responses": {
                    "A": "Una caja.",
                    "B": "Una bolsa de papel.",
                    "C": "Una mochila.",
                    "D": "Un carrito."
                },
                "answer": "C"
            },
            {
                "question": "¿Qué hace Pedro antes de regresar a casa?",
                "responses": {
                    "A": "Juega en el parque.",
                    "B": "Compra alimentos.",
                    "C": "Va al cine.",
                    "D": "Limpia su casa."
                },
                "answer": "B"
            }
        ]
    }
])

db.readings.insertMany([
    {
        "text": "El sistema de haciendas fue la base de la estructura agraria en América Latina colonial y post-colonial. Estas grandes propiedades rurales combinaban agricultura de subsistencia con producción comercial para mercados locales y de exportación. Los hacendados, generalmente criollos y españoles, controlaban vastas extensiones de tierra y empleaban diferentes formas de trabajo: peones asalariados, trabajadores por deudas y, en algunos casos, mano de obra indígena bajo sistemas de encomienda. Las haciendas producían diversos cultivos según la región: trigo y maíz en México, azúcar en el Caribe, cacao en Venezuela y ganado en Argentina. Este sistema concentraba la propiedad de la tierra en pocas manos, creando una sociedad rural estratificada donde los trabajadores vivían en condiciones de dependencia económica y social hacia los propietarios.",
        "difficulty": "medium",
        "questions": [
            {
                "question": "¿Qué era el sistema de haciendas?",
                "responses": {
                    "A": "Un sistema bancario",
                    "B": "La base de la estructura agraria",
                    "C": "Un método educativo",
                    "D": "Un sistema de transporte"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué combinaban las haciendas?",
                "responses": {
                    "A": "Industria y comercio",
                    "B": "Educación y religión",
                    "C": "Agricultura de subsistencia y producción comercial",
                    "D": "Minería y ganadería"
                },
                "answer": "C"
            },
            {
                "question": "¿Quiénes eran generalmente los hacendados?",
                "responses": {
                    "A": "Indígenas y mestizos",
                    "B": "Criollos y españoles",
                    "C": "Africanos libertos",
                    "D": "Comerciantes extranjeros"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué tipo de trabajadores empleaban las haciendas?",
                "responses": {
                    "A": "Solo esclavos",
                    "B": "Solo trabajadores libres",
                    "C": "Peones asalariados y trabajadores por deudas",
                    "D": "Solo mano de obra indígena"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué se producía en las haciendas mexicanas?",
                "responses": {
                    "A": "Azúcar y café",
                    "B": "Trigo y maíz",
                    "C": "Cacao y tabaco",
                    "D": "Algodón y añil"
                },
                "answer": "B"
            },
            {
                "question": "¿Cuál era el principal cultivo del Caribe?",
                "responses": {
                    "A": "Maíz",
                    "B": "Trigo",
                    "C": "Azúcar",
                    "D": "Cacao"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué se producía principalmente en Venezuela?",
                "responses": {
                    "A": "Ganado",
                    "B": "Cacao",
                    "C": "Azúcar",
                    "D": "Trigo"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué caracterizaba la distribución de tierras?",
                "responses": {
                    "A": "Distribución equitativa",
                    "B": "Propiedad comunal",
                    "C": "Concentración en pocas manos",
                    "D": "Pequeñas propiedades familiares"
                },
                "answer": "C"
            },
            {
                "question": "¿Cómo vivían los trabajadores de hacienda?",
                "responses": {
                    "A": "Con independencia económica",
                    "B": "En condiciones de dependencia",
                    "C": "Como propietarios asociados",
                    "D": "Con movilidad social ascendente"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué tipo de sociedad creaba el sistema de haciendas?",
                "responses": {
                    "A": "Igualitaria y democrática",
                    "B": "Rural estratificada",
                    "C": "Urbana industrializada",
                    "D": "Comercial marítima"
                },
                "answer": "B"
            }
        ]
    },
    {
        "text": "La minería de plata en Potosí, ubicada en el actual Bolivia, fue una de las actividades económicas más importantes del Imperio Español en América. El Cerro Rico de Potosí, descubierto en 1545, contenía enormes depósitos de plata que convirtieron a la ciudad en una de las más pobladas del mundo durante los siglos XVI y XVII. La extracción se realizaba mediante el sistema de mita, que obligaba a las comunidades indígenas a proporcionar trabajadores rotativos para las minas. Las condiciones laborales eran extremadamente peligrosas: los mineros trabajaban en túneles profundos, expuestos a gases tóxicos y derrumbes. La plata extraída se transportaba a través de complejas rutas comerciales hasta los puertos del Atlántico y Pacífico, financiando gran parte del imperio español y alimentando el comercio mundial durante más de dos siglos.",
        "difficulty": "medium",
        "questions": [
            {
                "question": "¿Dónde se ubicaba Potosí?",
                "responses": {
                    "A": "Actual Perú",
                    "B": "Actual Bolivia",
                    "C": "Actual Chile",
                    "D": "Actual Argentina"
                },
                "answer": "B"
            },
            {
                "question": "¿Cuándo fue descubierto el Cerro Rico?",
                "responses": {
                    "A": "1535",
                    "B": "1545",
                    "C": "1555",
                    "D": "1565"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué metal se extraía principalmente?",
                "responses": {
                    "A": "Oro",
                    "B": "Cobre",
                    "C": "Plata",
                    "D": "Estaño"
                },
                "answer": "C"
            },
            {
                "question": "¿Cuándo fue Potosí una de las ciudades más pobladas?",
                "responses": {
                    "A": "Siglos XV y XVI",
                    "B": "Siglos XVI y XVII",
                    "C": "Siglos XVII y XVIII",
                    "D": "Siglos XVIII y XIX"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué sistema se usaba para obtener trabajadores?",
                "responses": {
                    "A": "Esclavitud",
                    "B": "Trabajo asalariado",
                    "C": "Sistema de mita",
                    "D": "Trabajo voluntario"
                },
                "answer": "C"
            },
            {
                "question": "¿A quién obligaba el sistema de mita?",
                "responses": {
                    "A": "A los esclavos africanos",
                    "B": "A las comunidades indígenas",
                    "C": "A los colonos españoles",
                    "D": "A los mestizos"
                },
                "answer": "B"
            },
            {
                "question": "¿Cómo eran las condiciones laborales?",
                "responses": {
                    "A": "Seguras y bien pagadas",
                    "B": "Reguladas por horarios",
                    "C": "Extremadamente peligrosas",
                    "D": "Limitadas a pocas horas"
                },
                "answer": "C"
            },
            {
                "question": "¿A qué peligros se exponían los mineros?",
                "responses": {
                    "A": "Solo al calor excesivo",
                    "B": "Gases tóxicos y derrumbes",
                    "C": "Solo a la altitud",
                    "D": "Solo a la falta de agua"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué financió la plata de Potosí?",
                "responses": {
                    "A": "Solo las iglesias locales",
                    "B": "Gran parte del imperio español",
                    "C": "Solo las ciudades mineras",
                    "D": "Solo los gastos militares"
                },
                "answer": "B"
            },
            {
                "question": "¿Por cuánto tiempo alimentó el comercio mundial?",
                "responses": {
                    "A": "Un siglo",
                    "B": "Más de dos siglos",
                    "C": "Medio siglo",
                    "D": "Tres siglos"
                },
                "answer": "B"
            }
        ]
    },
    {
        "text": "El surgimiento de los caudillos fue un fenómeno político característico de América Latina durante el siglo XIX. Estos líderes militares y políticos emergieron en el contexto de inestabilidad que siguió a las guerras de independencia, cuando los nuevos Estados carecían de instituciones sólidas. Los caudillos basaban su poder en el carisma personal, el control de fuerzas armadas privadas y las redes de lealtades regionales. Figuras como Juan Manuel de Rosas en Argentina, José Antonio Páez en Venezuela y Santa Anna en México dominaron la política de sus respectivos países durante décadas. Su liderazgo se caracterizaba por el autoritarismo, el populismo y la capacidad de movilizar a amplios sectores de la población rural. Aunque algunos caudillos promovieron el desarrollo regional y la modernización, el sistema caudillista en general obstaculizó la consolidación democrática y el desarrollo institucional en la región.",
        "difficulty": "medium",
        "questions": [
            {
                "question": "¿Cuándo surgió el fenómeno caudillista?",
                "responses": {
                    "A": "Siglo XVIII",
                    "B": "Siglo XIX",
                    "C": "Siglo XVII",
                    "D": "Siglo XX"
                },
                "answer": "B"
            },
            {
                "question": "¿En qué contexto emergieron los caudillos?",
                "responses": {
                    "A": "Durante la colonia",
                    "B": "En tiempos de prosperidad",
                    "C": "Tras las guerras de independencia",
                    "D": "Durante invasiones extranjeras"
                },
                "answer": "C"
            },
            {
                "question": "¿En qué basaban su poder los caudillos?",
                "responses": {
                    "A": "Solo en instituciones legales",
                    "B": "Carisma personal y fuerzas armadas privadas",
                    "C": "Solo en el apoyo extranjero",
                    "D": "Solo en la riqueza económica"
                },
                "answer": "B"
            },
            {
                "question": "¿Quién fue un caudillo argentino famoso?",
                "responses": {
                    "A": "José Antonio Páez",
                    "B": "Santa Anna",
                    "C": "Juan Manuel de Rosas",
                    "D": "Simón Bolívar"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué caudillo dominó en Venezuela?",
                "responses": {
                    "A": "Juan Manuel de Rosas",
                    "B": "José Antonio Páez",
                    "C": "Santa Anna",
                    "D": "Diego Portales"
                },
                "answer": "B"
            },
            {
                "question": "¿En qué país actuó Santa Anna?",
                "responses": {
                    "A": "Argentina",
                    "B": "Venezuela",
                    "C": "México",
                    "D": "Colombia"
                },
                "answer": "C"
            },
            {
                "question": "¿Cómo se caracterizaba su liderazgo?",
                "responses": {
                    "A": "Democrático y participativo",
                    "B": "Autoritario y populista",
                    "C": "Liberal y federalista",
                    "D": "Conservador y religioso"
                },
                "answer": "B"
            },
            {
                "question": "¿A qué sectores movilizaban principalmente?",
                "responses": {
                    "A": "Élites urbanas",
                    "B": "Comerciantes extranjeros",
                    "C": "Población rural",
                    "D": "Intelectuales"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué promovieron algunos caudillos?",
                "responses": {
                    "A": "Solo la guerra",
                    "B": "El desarrollo regional y modernización",
                    "C": "Solo la represión",
                    "D": "Solo el aislamiento"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué obstaculizó el sistema caudillista?",
                "responses": {
                    "A": "El crecimiento económico",
                    "B": "La consolidación democrática",
                    "C": "El comercio internacional",
                    "D": "La educación pública"
                },
                "answer": "B"
            }
        ]
    },
    {
        "text": "La fundación de las misiones jesuíticas en América del Sur representó un experimento único de organización social y religiosa. Entre 1609 y 1767, los jesuitas establecieron reducciones en territorios que hoy corresponden a Paraguay, Argentina, Brasil y Bolivia, reuniendo a poblaciones guaraníes bajo un sistema comunitario. Las misiones combinaban la evangelización cristiana con la preservación de elementos culturales indígenas, creando una síntesis cultural particular. Los guaraníes aprendían oficios europeos como carpintería, herrería y agricultura intensiva, mientras mantenían su idioma y algunas tradiciones. La organización económica se basaba en la propiedad colectiva y el trabajo comunitario, generando excedentes que se comercializaban en mercados regionales. Este sistema prosperó durante más de un siglo hasta que la expulsión de los jesuitas en 1767 por orden del rey Carlos III provocó el colapso de las misiones y la dispersión de sus habitantes.",
        "difficulty": "medium",
        "questions": [
            {
                "question": "¿Entre qué años existieron las misiones jesuíticas?",
                "responses": {
                    "A": "1589-1747",
                    "B": "1609-1767",
                    "C": "1629-1787",
                    "D": "1649-1807"
                },
                "answer": "B"
            },
            {
                "question": "¿En qué territorios se establecieron principalmente?",
                "responses": {
                    "A": "México, Guatemala, Honduras",
                    "B": "Perú, Ecuador, Colombia",
                    "C": "Paraguay, Argentina, Brasil y Bolivia",
                    "D": "Chile, Uruguay, Venezuela"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué poblaciones indígenas participaron?",
                "responses": {
                    "A": "Aztecas",
                    "B": "Incas",
                    "C": "Guaraníes",
                    "D": "Mapuches"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué combinaban las misiones?",
                "responses": {
                    "A": "Comercio y guerra",
                    "B": "Evangelización y preservación cultural",
                    "C": "Minería y agricultura",
                    "D": "Industria y ganadería"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué oficios aprendían los guaraníes?",
                "responses": {
                    "A": "Solo agricultura",
                    "B": "Solo ganadería",
                    "C": "Carpintería, herrería y agricultura intensiva",
                    "D": "Solo artesanías tradicionales"
                },
                "answer": "C"
            },
            {
                "question": "¿Qué mantuvieron los indígenas?",
                "responses": {
                    "A": "Solo sus rituales religiosos",
                    "B": "Su idioma y algunas tradiciones",
                    "C": "Solo su organización política",
                    "D": "Solo sus técnicas agrícolas"
                },
                "answer": "B"
            },
            {
                "question": "¿Cómo se organizaba la economía?",
                "responses": {
                    "A": "Propiedad privada individual",
                    "B": "Propiedad colectiva y trabajo comunitario",
                    "C": "Solo intercambio de trueque",
                    "D": "Economía de mercado libre"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué se hacía con los excedentes?",
                "responses": {
                    "A": "Se almacenaban únicamente",
                    "B": "Se destruían",
                    "C": "Se comercializaban en mercados regionales",
                    "D": "Se enviaban a España"
                },
                "answer": "C"
            },
            {
                "question": "¿Quién ordenó la expulsión de los jesuitas?",
                "responses": {
                    "A": "El Papa",
                    "B": "El rey Carlos III",
                    "C": "El virrey del Perú",
                    "D": "Los colonos españoles"
                },
                "answer": "B"
            },
            {
                "question": "¿Qué provocó la expulsión?",
                "responses": {
                    "A": "El fortalecimiento de las misiones",
                    "B": "El colapso de las misiones",
                    "C": "La expansión del sistema",
                    "D": "La independencia de las misiones"
                },
                "answer": "B"
            }
        ]
    }
])