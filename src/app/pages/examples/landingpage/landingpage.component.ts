import { Component, OnInit, OnDestroy } from '@angular/core';
import Chart from 'chart.js';
import {HttpService} from '../../../shared/http.service';
import {DoctorModel} from '../../../models/doctor.model';
import {AppointmentReportModel} from '../../../models/appointment.report.model';
import {QuotesService} from '../../../shared/quotes.service';
import {QuoteModel} from '../../../models/quote.model';
import {AuthService} from '../../../shared/auth.service';

@Component({
  selector: 'app-landingpage',
  templateUrl: 'landingpage.component.html'
})
export class LandingpageComponent implements OnInit, OnDestroy {
  isCollapsed = true;
  doctorId = localStorage.getItem('doctorId');
  doctor: DoctorModel = new DoctorModel();
  appointmentReport: AppointmentReportModel = new AppointmentReportModel();
  quotes: QuoteModel[] = this.quotesService.quotes;
  currentQuote: QuoteModel = new QuoteModel();
  constructor(
    private httpService: HttpService,
    private quotesService: QuotesService,
    private authService: AuthService) {}

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('landing-page');
    this.getDoctorDetail();
    this.getAppointmentReport();
    this.currentQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
  }

  getDoctorDetail() {
    this.httpService.getDoctorDetail(`health/doctors/${this.doctorId}`).subscribe(
      res => {
        this.doctor = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  getAppointmentReport() {
    this.httpService.getAppointmentReport('health/appointmentReport').subscribe(
      res => {
        this.appointmentReport = res;
        this.setupChart(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  logOut() {
    this.authService.logOut();
  }

  setupChart(report: AppointmentReportModel) {
    const canvas: any = document.getElementById('chartBig');
    const ctx = canvas.getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, 'rgba(228, 76, 196, 0.0)');
    gradientFill.addColorStop(1, 'rgba(228, 76, 196, 0.14)');
    const chartBig = new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        labels: [
          'Diagnosis',
          'Medication',
          'Drug Prescription',
          'Pre-Natal',
          'Monthly Checkup',
          'Inquiry',
          'Scanning'
        ],
        datasets: [
          {
            label: 'Data',
            fill: true,
            backgroundColor: gradientFill,
            borderColor: '#e44cc4',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: '#e44cc4',
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: '#be55ed',
            // pointHoverBorderColor:'rgba(35,46,55,1)',
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            responsive: true,
            pointRadius: 4,
            data: [
              report.diagnosis,
              report.medication,
              report.drugPrescription,
              report.preNatal,
              report.monthlyCheckup,
              report.inquiry,
              report.scanning
            ]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#ccc',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: 'nearest',
          intersect: 0,
          position: 'nearest'
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(0,0,0,0.0)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                display: false,
                suggestedMin: 0,
                suggestedMax: 350,
                padding: 20,
                fontColor: '#9a9a9a'
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(0,0,0,0)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                padding: 20,
                fontColor: '#9a9a9a'
              }
            }
          ]
        }
      }
    });
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('landing-page');
  }
}
