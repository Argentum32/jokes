const jokesArea = document.querySelector('.jokes-area')
      programmingJokeBtn = document.querySelector('.programmingJokeBtn')
      miscJokeBtn = document.querySelector('.miscJokeBtn')
      darkJokeBtn = document.querySelector('.darkJokeBtn')
      jokesShown = document.querySelector('.jokesShown')
      programmingJokesShown = document.querySelector('.programmingJokesShown')
      miscJokesShown = document.querySelector('.miscJokesShown')
      darkJokesShown = document.querySelector('.darkJokesShown')
      themeChanger =  document.querySelector('.themeChanger')

const chooseNextJoke = (category='Programming', method=null) => {
  const transformAndRenderJoke = async (respons) => {
    const data = await respons.json()
    jokesArea.innerHTML = data.joke
  }
  const getJoke = async (category) => {
    const respons = await fetch(`https://v2.jokeapi.dev/joke/${category}?type=single`)
    transformAndRenderJoke(respons)
    counter.incrementJokesShownCount()
    if(method) method.incrementJokesShownCount()
  }
  return getJoke(category)
}
chooseNextJoke()

programmingJokeBtn.addEventListener('click', () => chooseNextJoke('Programming', programmingJokesCounter))
miscJokeBtn.addEventListener('click', () => chooseNextJoke('Miscellaneous', miscJokesCounter))
darkJokeBtn.addEventListener('click', () => chooseNextJoke('Dark', darkJokeCounter))

class Counter {
  constructor(element = jokesShown){
    this.jokesShown = 0
    this.element = element
  }

  incrementJokesShownCount(){
    this.jokesShown ++
    this.element.innerHTML = this.jokesShown
  }
}

let counter = new Counter

class SeparateCounter extends Counter {
  show(element){
    element.classList.remove('hidden')
  }
  incrementJokesShownCount(){
    this.show(this.element.parentNode)
    this.jokesShown ++
    this.element.innerHTML = this.jokesShown
  }
}

const programmingJokesCounter = new SeparateCounter(programmingJokesShown)
const miscJokesCounter = new SeparateCounter(miscJokesShown)
const darkJokeCounter = new SeparateCounter(darkJokesShown)

class Theme {
  constructor(element){
    this.element = element
  }

  changeTheme(){
    this.element.classList.toggle('light')
  }
}

const changeTheme = new Theme(document.body)
themeChanger.addEventListener('click', () => changeTheme.changeTheme())