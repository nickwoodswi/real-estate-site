let QUESTIONS = [{
    question: `Who is the titular 'baby' in "The KKK Took My Baby Away"?`,
    answer1: `Johnny's ex-girlfriend`,
    answer2: `Joey's ex-girlfriend`,
    answer3: `Dee Dee's drug addiction`,
    answer4: `Marky's contempt for the band`,
},{
    question: `What is the brand name for Johnny's guitar of choice?`,
    answer1: `Mosrite`,
    answer2: `Kramer`,
    answer3: `Fender`,
    answer4: `Squier`,
},{
    question: `Which Ramone refused to visit Joey on his death bed?`,
    answer1: `Elvis`,
    answer2: `CJ`,
    answer3: `Johnny`,
    answer4: `Dee Dee`,
},{
    question: `What brand of ditch liquor did the Ramones endorse in 1995?`,
    answer1: `Thunderbird`,
    answer2: `Mad Dog 20/20`,
    answer3: `Colt 45`,
    answer4: `Steel Reserve`,
},{
    question: `Which Ramones cover famously ended with "Up yours, Springfield"?`,
    answer1: `"Surfin' Bird"`,
    answer2: `"Happy Birthday"`,
    answer3: `"I Don't Wanna Grow Up"`,
    answer4: `"Do You Wanna Dance?"`,
}];

let ANSWERS = [
    QUESTIONS[0].answer2,
    QUESTIONS[1].answer1,
    QUESTIONS[2].answer3,
    QUESTIONS[3].answer4,
    QUESTIONS[4].answer2,
];

let pageCount = 0;
let score = 0;


function handlePages() {

    $('.questionForm').on('click', '.nextButton', function() {
        event.preventDefault;
        ++pageCount;
        if (pageCount <= 5) {
            $('.scoreCounter').empty();
            $('.scoreCounter').append(
                `YOU'VE GOTTEN ${score} OUT OF ${pageCount - 1} RIGHT, PINHEAD!`
            )
            $('.questionForm').empty();
            let currentQuestion = QUESTIONS[pageCount - 1];
            $('.questionForm').append(
            `<h1>${currentQuestion.question}</h1>
            <form>
                <input type="radio" name="radio" value="${currentQuestion.answer1}">${currentQuestion.answer1}<br>
                <input type="radio" name="radio" value="${currentQuestion.answer2}">${currentQuestion.answer2}<br>
                <input type="radio" name="radio" value="${currentQuestion.answer3}">${currentQuestion.answer3}<br>
                <input type="radio" name="radio" value="${currentQuestion.answer4}">${currentQuestion.answer4}<br>
            </form>
            <button class="answerButton">ANSWER</button>`
            );
        } else {
            $('.scoreCounter').empty();
            $('.questionForm').empty();
            $('.questionForm').append(
            `<h1 class="final">YOU GOT ${score} OUT OF 5 CORRECT!</h1>
             <button class="startOver">TRY AGAIN?</button>`
            );
        } 
    });

    $('.questionForm').on('click', '.answerButton', function() {
        event.preventDefault;
        let userAnswer = $("input[name='radio']:checked").val();
        let correctAnswer = ANSWERS[pageCount - 1];
        $('.questionForm').empty;
        if (userAnswer === correctAnswer) {
            ++score;
            $('.questionForm').append(`<h2>CORRECT!</h2>`);
            }
        else {
            $('.questionForm').append(`<h2>WRONG!</h2>`);
            };
        $('.questionForm').append(
            `<button class="nextButton">NEXT QUESTION</button>`);
        $('.scoreCounter').empty();
        $('.scoreCounter').append(`YOU'VE GOTTEN ${score} OUT OF ${pageCount} RIGHT, PINHEAD!`);
        this.remove();
        console.log(userAnswer);
        console.log(correctAnswer);
    });

    $('.questionForm').on('click', '.startOver', function() {
        event.preventDefault;
        location.reload();
    });
};

$(handlePages);