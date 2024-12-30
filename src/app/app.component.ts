import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloService } from './service/hello.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'projetoGerenciamento';

  user: any = {};

  constructor(private helloService: HelloService) {}

  ngOnInit() {}

  onSubmit() {
    const payload = {
      ...this.user,
      validadeFicha: this.user.validadeFicha
        ? `${this.user.validadeFicha}T00:00:00`
        : null,
      dataNascimento: this.user.dataNascimento
        ? `${this.user.dataNascimento}T00:00:00`
        : null
    };

    this.helloService.createUser(payload).subscribe(
      response => {
        alert('Usuário criado com sucesso!');
        console.log(response);
      },
      error => {
        if (error.status === 0) {
          alert('Erro de conexão: Não foi possível acessar a API. Verifique se o servidor está ativo.');
        } else if (error.status === 400 && error.error) {
          const validationErrors = error.error;
          let errorMessage = 'Erro de validação:\n';
          Object.keys(validationErrors).forEach(field => {
            errorMessage += `${field}: ${validationErrors[field]}\n`;
          });
          alert(errorMessage);
        } else {
          alert('Erro ao criar usuário. Tente novamente mais tarde.');
        }
        console.error(error);
      }
    );
  }


}
