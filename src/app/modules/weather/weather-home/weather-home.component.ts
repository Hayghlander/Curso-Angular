import { Component, OnInit } from '@angular/core';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { WeatherService } from 'src/app/modules/weather/services/weather.service';


@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit {
  initialCityName = 'São Paulo';
  weatherDatas!: WeatherDatas;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
  this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName).subscribe({
      next: (response) => {
        if (response) {
          this.weatherDatas = response; // Atribuição correta
        }
        console.log(this.weatherDatas);
      },
      error: (err) => {
      console.error('Erro ao buscar dados do tempo:', err);
    }
  });
 }
}
