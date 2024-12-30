import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HelloService } from '../service/hello.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [HttpClientModule, FormsModule,CommonModule],
  selector: 'app-participant-management',
  templateUrl: './participant-management.component.html',
  styleUrls: ['./participant-management.component.css'],
})
export class ParticipantManagementComponent {
  user: any = {};
  isUpdateMode: boolean = false;
  sexoOptions: string[] = ['Masculino', 'Feminino'];
  estadoCivilOptions: string[] = ['Solteiro', 'Casado', 'Viúvo'];
  codigosTelefoneOptions: string[] = ['+55', '+44'];

  constructor(
    private helloService: HelloService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (userId) {
      this.isUpdateMode = true;
      this.loadUserById(userId);
    }
  }

  loadUserById(id: string) {
    this.helloService.getUserById(id).subscribe(
      (response) => {
        this.user = response;
        this.user.cpfNaoSeAplica = !!this.user.cpfNaoSeAplica;
        this.user.validadeNaoSeAplica = !!this.user.validadeNaoSeAplica;
      },
      (error) => {
        alert('Erro ao carregar o participante.');
        console.error('Erro:', error);
      }
    );
  }

  onSubmit() {
    if (!this.user.nomeCompleto || this.user.nomeCompleto.trim() === '') {
      alert('O campo Nome Completo é obrigatório.');
      return;
    }

    if (this.user.codigo) {
      this.onUpdate();
    } else {
      this.helloService.createUser(this.user).subscribe(
        (response) => {
          alert('Usuário criado com sucesso!');
          this.navigateToList();
        },
        (error) => {
          alert('Erro ao criar usuário.');
          console.error('Erro:', error);
        }
      );
    }
  }

  onUpdate() {
    this.helloService.updateUser(this.user.id, this.user).subscribe(
      () => {
        alert('Usuário atualizado com sucesso!');
        this.navigateToList();
      },
      (error) => {
        alert('Erro ao atualizar usuário.');
        console.error('Erro:', error);
      }
    );
  }

  navigateToList() {
    this.router.navigate(['/participants-list']);
  }

}
