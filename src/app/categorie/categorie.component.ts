import { Component } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Chart, ChartOptions, registerables } from 'chart.js';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  tabCategories: any;
  tabdepenses: any;
  DepensesTotalParcategorie: any;
  chart: any;
  categoryColors: string[] = [];
  
  constructor(
    private categorieService: CategorieService,
    
  ) {
    Chart.register(...registerables);
   }
   ngOnInit() {
    this.categorieService.GetAllCategories().subscribe(
      (data) => {
        this.tabCategories = data;
        console.log("les categorie de services", this.tabCategories);
      }
    );
    // this.categorieService.getCategoriesById(1).subscribe(
    //   (data) => {
    //     this.tabdepenses = data;
    //     console.log("les categorie de services de 1", this.tabdepenses);
    //   }
    // );
    this.categorieService.calculateTotalExpensesByCategory().subscribe(totals => {
      this.DepensesTotalParcategorie = Object.values(totals).sort((a: any, b: any) => b.total - a.total);
      this.DisplayChart();
      // this.chartbar();
    
      console.log("somme", this.DepensesTotalParcategorie);
    });
  }
  
  DisplayChart() {
    if (this.DepensesTotalParcategorie) {
      const data = Object.values(this.DepensesTotalParcategorie).map((category: any) => category.total);
      const backgroundColors = data.map(() => this.getRandomColor());
      const borderColors = backgroundColors.map(color => color);
  
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          datasets: [
            { 
              data: data,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
            },
          ]
        },
        options: {
          plugins: {
            legend: {
              display: true,
            },
          }
        },
      });
  
      // Store the colors for use in DisplayCategories
      this.categoryColors = backgroundColors;
    }
  }
  

  
  chartbar() {
    if (this.tabdepenses) {
      const labels = this.tabdepenses.map((expense: any) => expense.merchant);
      const data = this.tabdepenses.map((expense: any) => expense.amount);
      const backgroundColors = data.map(() => this.getRandomColor());

      this.chart = new Chart('canva1', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            { 
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors,
              borderWidth: 1
            },
          ]
        },
        options: {
          indexAxis: 'y', // This makes the chart horizontal
          scales: {
            x: {
              display: false // Hide the x-axis
            },
            y: {
              display: false // Hide the y-axis
            }
          },
          plugins: {
            legend: {
              display: false // Hide the legend
            }
          }
        }
      });
    }
  }

  
getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
}


