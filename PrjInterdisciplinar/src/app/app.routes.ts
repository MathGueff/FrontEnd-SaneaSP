import { MenuUsuarioComponent } from './Usuario/menu-usuario/menu-usuario.component';
import { Routes } from '@angular/router';
import { ReclamacaoDescricaoComponent } from './Reclamacao/reclamacao-descricao/reclamacao-descricao.component';
import { DoencaDetalhesComponent } from './Doenca/doenca-detalhes/doenca-detalhes.component';
import { DoencasInicialComponent } from './Doenca/doencas-inicial/doencas-inicial.component';
import { ReclamacaoInicialComponent } from './Reclamacao/reclamacao-inicial/reclamacao-inicial.component';
import { SobrenosComponent } from './Layout/sobrenos/sobrenos.component';
import { MenuAdminComponent } from './Admin/admin-dashboard/menu-admin.component';
import { NoticiasInicialComponent } from './Noticias/noticias-inicial/noticias-inicial.component';
import { FormLoginComponent } from './Login/form-login/form-login.component';
import { FormCadastroComponent } from './Login/form-cadastro/form-cadastro.component';
import { ComentarioCentralComponent } from './Comentario/comentario-central/comentario-central.component';
import { ReclamacaoFormComponent } from './Reclamacao/reclamacao-form/reclamacao-form.component';
import { FormDoencaComponent } from './Doenca/form-doenca/form-doenca.component';
import { NoticiasDetalhesComponent } from './Noticias/noticias-detalhes/noticias-detalhes.component';
import { EdicaoPerfilComponent } from './Usuario/edicao-perfil/edicao-perfil.component';
import { ResponsaveisComponent } from './responsaveis/responsaveis/responsaveis.component';
import { FormNoticiaComponent } from './Noticias/form-noticia/form-noticia.component';
import { MenuDashboardComponent } from './Admin/menu-dashboard/menu-dashboard/menu-dashboard.component';
import { ReclamacaoUsuariosComponent } from './Reclamacao/reclamacao-usuarios/reclamacao-usuarios.component';
import { ReclamacaoEdicaoComponent } from './Reclamacao/reclamacao-edicao/reclamacao-edicao.component';
import { TagTabelaComponent } from './Tag/tag-tabela/tag-tabela.component';
import { UpNoticiaComponent } from './Noticias/up-noticia/up-noticia.component';
import { DellNoticiaComponent } from './Noticias/dell-noticia/dell-noticia.component';


export const routes: Routes = [
  //Home
  {path: '', component:MenuUsuarioComponent},
  {path: 'pagina-admin', component:MenuAdminComponent},

  //Reclamações
  {path: 'reclamacao', component: ReclamacaoInicialComponent},
  {path: 'reclamacao/reclamacao-form', component: ReclamacaoFormComponent},
  {path:'suas-reclamacoes/:id',component:ReclamacaoEdicaoComponent},
  {path: 'reclamacao/reclamacao-descricao/:id',component:ReclamacaoDescricaoComponent},
  {path: 'suas-reclamacoes', component: ReclamacaoUsuariosComponent},
  {path: 'suas-reclamacoes/reclamacao-descricao/:id',component:ReclamacaoDescricaoComponent},

  //Doenças
  {path: 'doenca-inicial',component:DoencasInicialComponent},
  {path: 'doenca-detalhada', component:DoencaDetalhesComponent},
  {path: 'doenca-detalhada/:id', component:DoencaDetalhesComponent},
  {path: 'doenca-form', component: FormDoencaComponent},

  //Noticia
  {path: 'noticia-inicial', component:NoticiasInicialComponent},
  {path: 'noticia-detalhe', component:NoticiasDetalhesComponent},
  {path: 'noticia-detalhe/:id', component:NoticiasDetalhesComponent},
  {path: 'noticia-form', component: FormNoticiaComponent},
  {path: 'dell-noticia', component: DellNoticiaComponent},

  //Tags
  {path: 'tag-tabela', component: TagTabelaComponent},

  //{path: 'dell-noticia', component: DellNoticiaComponent},
  {path: 'up-noticia/', component: UpNoticiaComponent},

  //Outros
  {path: 'sobre-nos', component:SobrenosComponent},
  {path: 'login', component:FormLoginComponent},
  {path: 'cadastro', component:FormCadastroComponent},
  {path: 'comentario/:idReclamamacao',component:ComentarioCentralComponent},
  {path: 'editar-perfil', component: EdicaoPerfilComponent},
  {path: 'responsaveis', component: ResponsaveisComponent},

];
