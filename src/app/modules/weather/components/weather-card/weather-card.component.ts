import { Component, Input } from '@angular/core';
import { faDroplet, faTemperatureLow, faTemperatureHigh, faWind } from '@fortawesome/free-solid-svg-icons'; // Importação de ícones
import { WeatherDatas } from 'src/app/models/interfaces/WeatherDatas';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent {
  @Input() weatherDatasInput!: WeatherDatas; // Propriedade de entrada para receber os dados.

  minTemperatureIcon = faTemperatureLow; // Ícone de temperatura mínima
  maxTemperatureIcon = faTemperatureHigh; // Ícone de temperatura máxima
  humidityIcon = faDroplet; // Ícone de umidade
  windIcon = faWind; // Ícone de vento
}
