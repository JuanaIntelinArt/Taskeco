import { Chart, registerables } from 'chart.js';

class EcoImpact {
  constructor() {
    Chart.register(...registerables);
    this.chart = null;
  }

  calculateImpact(tasks) {
    const impact = {
      waterSaved: 0,
      co2Reduced: 0,
      energySaved: 0,
      wasteRecycled: 0,
      totalPoints: 0
    };

    tasks.forEach(task => {
      if (task.completed) {
        impact.waterSaved += task.ecoImpact.water || 0;
        impact.co2Reduced += task.ecoImpact.co2 || 0;
        impact.energySaved += task.ecoImpact.energy || 0;
        impact.wasteRecycled += task.ecoImpact.waste || 0;
        impact.totalPoints += task.ecoImpact.points || 0;
      }
    });

    return impact;
  }

  renderImpactChart(ctx, impactData) {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Agua ahorrada (L)', 'CO₂ reducido (kg)', 'Energía ahorrada (kWh)', 'Residuos reciclados (kg)'],
        datasets: [{
          data: [
            impactData.waterSaved,
            impactData.co2Reduced,
            impactData.energySaved,
            impactData.wasteRecycled
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(153, 102, 255, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.label}: ${context.raw}`;
              }
            }
          }
        }
      }
    });
  }

  renderPointsCounter(elementId, points) {
    const element = document.getElementById(elementId);
    if (element) {
      element.textContent = points;
    }
  }
}

export const ecoImpact = new EcoImpact();