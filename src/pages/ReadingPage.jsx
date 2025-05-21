import NavigationMenu from "../components/NavigationMenu.jsx";
import GameSettings from "../components/GameSettings.jsx";

export default function ReadingPage() {

        return (
                    <>
                        <div className="bg-grey-100 min-h-screen ">
                            <NavigationMenu/>

                            <div className={"mx-auto max-w-[1300px]"}>
                                <h1 className={"text-4xl font-semibold text-slate-800 mt-5"}>Reading Comp</h1>
                                <div className={"flex"}>
                                    <p className={"mt-2 text-lg"}>Welcome to the conjugation practice section!
                                        Here, you’ll tackle verb conjugation challenges designed to sharpen your
                                        understanding
                                        of Spanish tenses and moods. Start by selecting your difficulty
                                        level—whether you’re learning the basics, polishing intermediate skills, or
                                        mastering advanced conjugations. Then, choose the tense or mood you want to
                                        focus on,
                                        and dive into engaging exercises tailored to help you practice and reinforce
                                        your skills.
                                        It’s a great way to build a solid foundation, improve accuracy, and boost
                                        your confidence
                                        in using verbs correctly.
                                        Get ready to conquer conjugations and elevate your Spanish—one verb at a
                                        time!</p>

                                    <GameSettings isConjugation={false}/>
                                </div>

                                
                            </div>
                        </div>

                    </>
        )


}