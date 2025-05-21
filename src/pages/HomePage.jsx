import NavigationMenu from "../components/NavigationMenu.jsx";

export default function HomePage() {
    return (
        <>
            <NavigationMenu/>


            <div className="bg-grey-100 min-h-screen text-slate-800">

                <div className="mx-auto max-w-[1100px] p-4 space-y-8">
                    <h1 className="text-[52px] font-bold text-red-500">Bienvenidos a TiemposPerfectos!</h1>

                    <div>
                        <h1 className="text-4xl font-semibold text-slate-800">¿Qué es
                            TiemposPerfectos?</h1>
                        <p className="mt-2 text-lg">TiemposPerfectos is
                            a web application to strengthen students' Spanish
                            skills. Learning a new language is hard, but the only way to improve
                            is <em className="text-red-500 font-bold">hacer más práctica</em>.
                        </p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-semibold text-slate-800">Reading Comp</h1>
                        <p className="mt-2 text-lg">
                            Dive into fun and interactive quizzes that help you interpret short
                            texts,
                            expand your vocabulary, and sharpen your understanding of written
                            Spanish.
                            Whether you’re a beginner or advanced reader, these exercises will boost
                            your confidence
                            and reading skills one quiz at a time.
                        </p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-semibold text-slate-800]">Conversations</h1>
                        <p className="mt-2 text-lg">
                            Step into real-life scenarios with dynamic conversation practice!
                            Engage in interactive dialogues that help you improve fluency, learn
                            essential phrases,
                            and master the art of speaking Spanish naturally.
                            Perfect for building confidence in real-world communication.
                        </p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-semibold text-slate-800">Grammar</h1>
                        <p className="mt-2 text-lg">
                            Take control of Spanish verbs with targeted exercises designed to help
                            you master conjugations across all tenses and moods.
                            From basics to advanced challenges, these activities are key to
                            improving your accuracy and building a strong grammar foundation.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}