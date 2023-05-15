import { useState } from "react";

function App() {
  
    const [index, setIndex] = useState(0);
    const [side, setSide] = useState(true);
    const [questions, setQuestions] = useState([{ Question: "Jméno ptáka, který se jmenuje stejně jak ovoce, je?", Answer: "Kiwi xD" }]);


    const handleFileInputChange = (event) => {
            setIndex(0);

            if(event.target.files.length === 0) {
                setQuestions([{ Question: "Jméno ptáka, který se jmenuje stejně jak ovoce, je?", Answer: "Kiwi xD" }]);
                document.title = 'Quiz App';
                return;
            }

            const file = event.target.files[0];

            const file_name = file.name.split('.').slice(0, -1).join('.');
            document.title = file_name + ' | Quiz App';
            
            const reader = new FileReader();
        
            reader.onload = (event) => {
                const array = parseTextFileContents(event.target.result);

                setQuestions(array);
            };
        
            reader.readAsText(file);
    };


    function parseTextFileContents(textFileContents) {
        const lines = textFileContents.split('\n');
        const questionAnswerPairs = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            const question = line.split(';')[0].trim();
            const answer = line.split(';')[1].trim();

            questionAnswerPairs.push({ Question: question, Answer: answer });
        }
        
        return questionAnswerPairs;
    }


    const turnCard = () => {
        setSide(!side)
    };


    const nextQuestion = () => {
        setSide(true)

        if(index === questions.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    };


    return (
        <main className="start">

        <header>
            <input type="file" accept="text/plain" onChange={handleFileInputChange} />

            <button type="button" onClick={() => nextQuestion()}>NEXT</button>
        </header>

        <section>
            <div>
                <h3>{side ? "Question:" : "Answer:" }</h3>

                <h1>{side ? questions[index].Question : questions[index].Answer }</h1>
                
                <button type="button" onClick={() => turnCard()}>TURN</button>
            </div>
        </section>

        <footer>
            <button type="button" onClick={() => nextQuestion()}>NEXT</button>
        </footer>

        </main>
    );
}

export default App;
