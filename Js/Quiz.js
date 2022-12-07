export class Quiz {
    constructor(questions, name) {

        document.getElementById("name").innerHTML = name

        this.allQuestions = questions

        this.numofQuestion = questions.length

        this.currantQuestion = 0

        this.userAnswers = []
        this.correctAnswers = []

        document.getElementById("btn_next").addEventListener("click", this.nextQuestion.bind(this))

        document.getElementById("btn_prev").addEventListener("click", this.prevQuestion.bind(this))

        document.getElementById("answerBtn").addEventListener("click", this.numofscore.bind(this))

        $("#try_Agin").click(() => {
            $("#finish").css("display", "none").fadeOut(500, () => {
                $("#setting").fadeIn(500)
            })

        })

        this.showQuestions()

    }

    shuffle(array) {
        let currentIndex = array.length,  //4  [1, 2 ,3, 4]   => [4, 2, 3, 1]
            randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) { //1

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex); //0
            currentIndex--; //0

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    showQuestions() {

        document.getElementById("question").innerHTML = this.allQuestions[this.currantQuestion].question

        document.getElementById("currentQuestion").innerHTML = this.currantQuestion + 1
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numofQuestion


        let answers = [this.allQuestions[this.currantQuestion].correct_answer, ...this.allQuestions[this.currantQuestion].incorrect_answers]

        this.correctAnswers.push(this.allQuestions[this.currantQuestion].correct_answer)

         this.shuffle(answers)

        let answerRow = ""
        for (let i = 0; i < answers.length; i++) {

            answerRow += ` <div class="form-check mb-2">
            <label class="form-check-label big_text">
                <input type="radio" class="form-check-input" id="answer1" name ="answer" value="${answers[i]}">
                ${answers[i]}
            </label>
                </div> `
        }


        document.getElementById("rowAnswer").innerHTML = answerRow

    }

    nextQuestion() {

        if (Array.from(document.getElementsByName("answer")).filter((el) => el.checked)[0] == null) {

            $("#alert3").fadeIn(500)

        }
        else {
            $("#alert3").fadeOut(500)

            this.currantQuestion++

            let userAnswer = Array.from(document.getElementsByName("answer")).filter((el) => el.checked)[0].value

            this.userAnswers.push(userAnswer)

        }


        if (this.numofQuestion > this.currantQuestion && this.currantQuestion >= 0) {
            this.showQuestions()

        }

        if (this.currantQuestion == this.numofQuestion) {

            $("#btn_next").css("opacity", "0").fadeOut(300, () => {

                $("#answerBtn").css("opacity", "1").fadeIn(150)
            })
        }

        if (this.currantQuestion >= 1) {

            $("#btn_prev").css("opacity", "1").fadeIn(300)
        }

    }

    prevQuestion() {
        this.currantQuestion--

        this.userAnswers.pop()
        this.correctAnswers.pop()

        if (this.currantQuestion >= 0 && this.currantQuestion < this.numofQuestion) {

            this.showQuestions()

        }

        if (this.currantQuestion == 0) {

            $("#btn_prev").css("opacity", "0").fadeOut(300)
        }


        $("#btn_next").css("opacity", "1").fadeIn(300, () => {
            $("#answerBtn").css("opacity", "0").fadeIn(150)
        })
    }

    numofscore() {

        if (Array.from(document.getElementsByName("answer")).filter((el) => el.checked)[0] == null) {


            $("#alert3").fadeIn(500)
        }
        else {

            $("#alert3").fadeOut(500, () => {

                $("#quiz").css("display", "none").fadeOut(500, () => {
                    $("#finish").css("display", "block").fadeIn(500, () => {
                        $("#sideBar").fadeIn(500, () => {
                            $("#try_Agin").click(() => {

                                location.reload()

                            })
                        })
                    })
                })

            })

        }

        let score = 0

        for (let i = 0; i < this.correctAnswers.length; i++) {

            if (this.correctAnswers[i] == this.userAnswers[i]) {
                score++
            }

        }

        $("#score").html(score)


    }







}

