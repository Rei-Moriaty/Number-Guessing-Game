var container = document.getElementById('container')
var title = document.getElementById('title')
var btn = document.getElementById('btn')
var rand_no_span = document.getElementById('random-no')
var generate_html = document.getElementById('generate')
var game_html = document.getElementById('game')
game_html.style.display = 'none'

game = () => {
    generate_html.style.display = 'none'
    
    //setting all the game html
    var title = document.createElement('h1')
    title.innerHTML = "Guess the Number"
    title.classList = "title"

    var guess_inp = document.createElement('input')
    guess_inp.id = 'guess_inp'
    guess_btn

    var game_buttons =document.createElement('div')
    game_buttons.className = 'game_buttons'
    
    var guess_btn =document.createElement('button')
    guess_btn.innerHTML = 'Guess'
    guess_btn.classList = 'button'
    guess_btn.onclick = guess

    var replay_btn = document.createElement('button')
    replay_btn.innerHTML = 'Replay'
    replay_btn.classList = 'button'
    replay_btn.onclick = replay

    game_html.appendChild(title)
    game_html.appendChild(guess_inp)
    game_buttons.appendChild(replay_btn)
    game_buttons.appendChild(guess_btn)
    game_html.appendChild(game_buttons)

    game_html.style.display = 'block'
    return
}

//Guessing the number generated by system
guess = () => {
   var guesssed_value =  guess_inp.value
   
   //checking for numerical values
    if (!( /^\d+$/.test(guesssed_value))){
       alert('Enter number')
       return
    }

    //matching number of digits between generated number and guessed number
    var correct_value = localStorage.getItem('number')
    var matches = 0
    for(var i = 0; i < guesssed_value.length; i++){
        if(guesssed_value.charAt(i) == correct_value.charAt(i)){
            matches += 1
        }
    }

    //evaluating th results
    remark = document.createElement('div')
    remark.className = 'remark'
    if(matches === 6){
        remark.innerHTML = 'You Win'
        remark.id = 'success'
    }
    else{
        remark.innerHTML = matches + ' correct guesses'
        remark.id = 'lost'
    }

    game_html.appendChild(remark)
    return

}

//Starting the agme again
replay = () => {
    //removes html requires for game
    game_html.innerHTML = ''
    game_html.style.display = 'none'
    

    //sets html required to generate random number
    rand_no_span.innerHTML = ''
    title.innerHTML = 'Generate a New Number'
    generate_html.removeChild(refresh_span)
    generate_html.style.display = 'block'
    btn.addEventListener('click', generate)
    return

}


generate = (e) => {
    var rand_no = Math.floor(100000 + Math.random() * 900000)
    rand_no_span.className = 'rand_no'
    rand_no_span.innerHTML = rand_no

    title.innerHTML = 'Number is'
    localStorage.setItem('number', rand_no) //random number is stored in localstorage

    refresh_span = document.createElement('div') // genrates the refreshing page element
    
    loader = document.createElement('div')
    loader.className = 'loader';

    
    refresh_span.className = 'refresh'
    refresh_span.innerHTML = 'Refreshing in 5 seconds...'
  
    refresh_span.appendChild(loader)

    generate_html.appendChild(refresh_span) // appends everything to main parent
    e.target.removeEventListener(e.type, generate);
    setTimeout(game, 5000) //executes after 5s
    return
}

btn.addEventListener('click', generate) // to xecute when we want system to generate random numbers