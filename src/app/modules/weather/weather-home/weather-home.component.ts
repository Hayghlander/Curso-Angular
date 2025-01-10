import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';
import { WeatherService } from 'src/app/modules/weather/services/weather.service';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss']
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  initialCityName: string = 'São Paulo';
  weatherData!: WeatherDatas; // Define os dados recebidos do serviço.
  searchIcon = faMagnifyingGlass; // Ícone de lupa do FontAwesome.

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCityName); // Busca dados iniciais.
  }

  // Método para buscar dados da API de clima.
  getWeatherData(cityName: string): void {
    this.weatherService
      .getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$)) // Garante o unsubscribe ao destruir o componente.
      .subscribe({
        next: (response) => {
          if (response) {
            this.weatherData = response;
          }
          console.log('Dados recebidos:', this.weatherData);
        },
        error: (err) => {
          console.error('Erro ao buscar dados do tempo:', err);
        },
      });
  }

  // Método chamado ao destruir o componente.
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('WeatherHomeComponent destruído.');
  }

  // Método acionado ao enviar o formulário.
  onSubmit(): void {
    if (this.initialCityName) {
      this.getWeatherData(this.initialCityName);
    }
  }
}
