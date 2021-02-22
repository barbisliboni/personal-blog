import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //TRAZENDO O OBJETO USERLOGIN
  user: User = new User
  confirmarSenha: string
  tipoDeUser: string

  constructor(
    private authService: AuthService, //INJEÇÃO DE DEPENDENCIAS SEMPRE FICAM DENTRO DO CONSTRUTOR
    private router: Router
  ) { }

  ngOnInit(){ //apagar o void
    window.scroll(0,0) //definindo que, a partir do momento que eu entrar na pagina,
                      //começarei vendo os pixels das coordenadas x e y na posição 0
  }

  //MÉTODO PARA CONFIRMAR SENHA
  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  //MÉTODO PARA OS TIPOS DE USUÁRIO
  tipoUser(event: any){
  this.tipoDeUser = event.target.value
  }

  //MÉTODO PARA CADASTRAR
  cadastrar(){
    this.user.tipoUsuario = this.tipoDeUser

    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas!')
    }else{
      this.authService.cadastrar(this.user).subscribe((resp: User) =>{ //TRANSFORMANDO UM OBJETO TS EM FORMATO JSON
       this.user = resp

        //MANDANDO O USUÁRIO PARA UMA ROTA NO TYPESCRIPT
        //PRIMEIRAMENTE, DEVO INJETAR UMA DEPENDENCIA NO CONSTRUCTOR CHAMADA ROUTER
        this.router.navigate(['/login'])

        alert('Usuário cadastrado com sucesso!')
      }) 
    }
  }
}
