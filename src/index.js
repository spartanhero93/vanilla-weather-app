import axios from 'axios'

class WeatherApp {
  constructor() {
    this.input = document.getElementById('input')
    this.test = document.getElementById('test')
    this.fetchBtn = document.getElementById('fetch')
    this.locationCity = document.getElementById('location__city')
    this.locationTime = document.getElementById('location__time')
    this.locationWeather = document.getElementById('location__weather')
    this.usersLat = ''
    this.usersLong = ''
  }

  init() {
    this.input.addEventListener('input', event => console.log(event.target.value))
    this.test.addEventListener('click', () =>
      console.log(this.usersLat, '\n', this.usersLong)
    )
    this.fetchBtn.addEventListener('click', this.fetchWeather)
    this.usersLat && this.usersLong ? this.fetchWeather() : this.getUsersLocation()
  }

  getUsersLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.usersLat = position.coords.latitude
        this.usersLong = position.coords.longitude
        this.fetchWeather()
      })
    } else {
      alert('error')
    }
  }

  fetchWeather = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${this.usersLat}&lon=${
          this.usersLong
        }&mode=json&APPID=${process.env.API_KEY}`
      )
      this.renderData(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  renderData = async ({ name, sys, weather, wind }) => {
    try {
      this.locationCity.textContent = await `${name} ${sys.country}`
      this.locationTime.textContent = new Date().toDateString()
      this.locationWeather.textContent = await weather.map(item => item.main)
    } catch (error) {
      console.error(error)
    }
  }
}

const Wa = new WeatherApp()
Wa.init()
