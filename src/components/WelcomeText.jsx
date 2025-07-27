export default function WelcomeText({heading, text}){
    return (
      <>
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6  max-w-4lg space-y-4">
          <h1 className="font-bold text-2xl text-[#2c3e50]">
            Welcome to Reading Comphresion Practice
          </h1>
          <p>
            On this page, you get to take control of your learning. Use the
            panel on the left to choose how tough you want your passage to be —
            Beginner, Intermediate, or Advanced — and then pick how many
            questions you're ready to tackle (3, 5, or 8). Once you're set,
            we'll generate a unique reading passage just for you, along with
            comprehension questions to test your skills. It’s a fun, interactive
            way to boost your reading and critical thinking — so pick your
            settings and let’s get reading!
          </p>
        </div>
      </>
    );
}