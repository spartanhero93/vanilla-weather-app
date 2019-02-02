import axios from 'axios'

class WeatherApp {
  // constructor(city, countryCode = 'us') {
  //   this.city = city
  //   this.countryCode = countryCode
  //   this.key = 'e00dcf67e1a09b99b9ddbd2aa28441df'
  // }

  constructor() {
    this.input = document.getElementById('input')
  }

  init() {
    input.addEventListener('input', event => console.log(event.target.value))
  }

  fetchWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${
          this.countryCode
        }&mode=json&APPID=${this.key}`
      )
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
}

const Wa = new WeatherApp()
Wa.init()
