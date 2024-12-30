import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HelloService } from '../service/hello.service';
import { CeilPipe } from '../ceil.pipe';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-participant-management-list',
  templateUrl: './participant-management-list.component.html',
  styleUrls: ['./participant-management-list.component.css'],
  imports: [CommonModule, FormsModule, CeilPipe],
})
export class ParticipantManagementListComponent implements OnInit {
  participants: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 10;
  totalItems: number = 0;
  selectedParticipants: any[] = [];

  constructor(private helloService: HelloService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.helloService.getUsers(this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        this.participants = response.content;
        this.totalItems = response.totalElements;
      },
      (error) => {
        console.error('Erro ao carregar usuários', error);
      }
    );
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadUsers();
  }

  onSelectParticipant(participant: any, event: any) {
    if (event.target.checked) {
      this.selectedParticipants.push(participant);
    } else {
      this.selectedParticipants = this.selectedParticipants.filter(
        (p) => p.id !== participant.id
      );
    }
  }

  deleteSelected() {
    if (this.selectedParticipants.length === 0) {
      alert('Nenhum participante selecionado.');
      return;
    }

    const idsToDelete = this.selectedParticipants.map((p) => p.id);
    this.helloService.deleteUsers(idsToDelete).subscribe(
      () => {
        alert('Participantes excluídos com sucesso!');
        this.loadUsers();
      },
      (error) => {
        alert('Erro ao excluir participantes.');
        console.error(error);
      }
    );
  }

  navigateToAdd() {
    this.router.navigate(['/participants']);
  }

  navigateToUpdate() {
    if (this.selectedParticipants.length === 1) {
      const participant = this.selectedParticipants[0];
      this.router.navigate(['/participants', participant.id]);
    } else {
      alert('Selecione apenas um participante para atualizar.');
    }
  }
}
