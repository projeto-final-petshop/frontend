import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';


@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.scss']
})
export class PainelComponent implements OnInit {
  activeItem: number = 0;
  appointments: any[] = [];
  selectedAppointmentId: number | null = null;
  permissaoAdmin: any;
  filteredAppointments: any;
  isAdmin: boolean = false;


  constructor(private appointmentService: AppointmentService, private router: Router) { }

  ngOnInit(): void {
    const permissao = localStorage.getItem('permission');
    this.permissaoAdmin = permissao === 'ADMIN';
    if(this.permissaoAdmin){
      this.isAdmin = true
      this.loadAdminAppointments();
    }else{
      this.isAdmin = false
      this.loadAppointments();
    }
    
  }


  loadAdminAppointments() {
    this.appointmentService.getAdminAppointments().subscribe(
      (data: any) => {
        console.log(data)
        this.appointments = data.content;
        this.filterAppointments()
      },
      (error: any) => {
        console.error('Erro ao carregar agendamentos', error);
      }
    );
  }



  loadAppointments() {
    // this.appointments = [
    //   {
    //     petId: 10,
    //     userId: 10,
    //     serviceType: "BATH_AND_GROOMING",
    //     petType: "DOG",
    //     appointmentDate:  new Date(2024, 4, 29, 8, 0),
    //     appointmentTime: "10:00",
    //     status: "SCHEDULED",
    //     appointmentId: 10
    //   },
    //   {
    //     petId: 10,
    //     userId: 10,
    //     serviceType: "BATH_AND_GROOMING",
    //     petType: "DOG",
    //     appointmentDate:  new Date(2024, 4, 28, 8, 0),
    //     appointmentTime: "10:00",
    //     status: "SCHEDULED",
    //     appointmentId: 10
    //   }
    // ];
    // this.filterAppointments()

    this.appointmentService.getAppointments().subscribe(
      (data: any[]) => {
        console.log(data)
        this.appointments = data;
        this.filterAppointments()
      },
      (error: any) => {
        console.error('Erro ao carregar agendamentos', error);
      }
    );
  }
  
  filterAppointments(): void {
    const allowedServices = ['BATH', 'BATH_AND_GROOMING', 'GROOMING'];
    this.filteredAppointments = this.appointments.filter(appointment => 
      allowedServices.includes(appointment.serviceType)
    );
    console.log(this.filteredAppointments)
  }

  filterVeterinarianAppointments(): void {
    this.filteredAppointments = this.appointments.filter(appointment => 
      appointment.serviceType === 'VETERINARIAN'
    );
  }
  


  logOut(){
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('permission');
    this.router.navigate(['/login']);
  }

  setActive(index: number) {
    const permissao = localStorage.getItem('permission');
    this.permissaoAdmin = permissao === 'ADMIN';
    if(this.permissaoAdmin){
      this.isAdmin = true
      this.loadAdminAppointments();
    }else{
      this.isAdmin = false
      this.loadAppointments();
    }

    this.activeItem = index;
    
  }

  onEditAppointment(appointmentId: number) {
    console.log(appointmentId)
    this.selectedAppointmentId = appointmentId;
    this.setActive(2);

  }
  
  redirect(route : string){
    this.router.navigate([route]);
  }
}
