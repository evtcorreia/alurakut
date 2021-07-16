
import React from 'react';
import MainGrid from '../src/MainGrid';
import Box from '../src/Box';
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/ProfileRelations';



function ProfileSideBar(props)
{
  return(

    <Box as="aside" >
      <img src = {`https://github.com/${props.gitHubUser}.png`} style={{borderRadius:'8px'}}/>
      <hr />
    <p>

      <a className="boxLink" href={`https://github.com/${props.gitHubUser}`}>
        @{props.gitHubUser}
      </a>


    </p>

      <hr/>
    
    <AlurakutProfileSidebarMenuDefault></AlurakutProfileSidebarMenuDefault>
    </Box>

    

  )
}




export default function Home() {


    const gitHubUser = 'evtcorreia';
    const [comunidades, setComunidades] =  React.useState([{
      id: '132165616516565165156165156',
      title: 'Eu odeio Acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'

    }
    ]);
    /* const comunidades = ['AluraKut']; */
    const pessoasFavoritas = [
      'juunegreiros', 
      'omariosouto',
      'rafaballerini',
      'marcobrunodev',
      'peas',
      'felipefialho', 
    ]
    return ( 
      <>
        <AlurakutMenu/>

        
        <MainGrid >

        <div className = "profileArea"style = {{ gridArea: 'profileArea' }}>

      
        <ProfileSideBar gitHubUser={gitHubUser}/>

        </div>

        <div >

        <Box className = "welcomeArea"style = {{ gridArea: 'welcomeArea' }} >
        <h1 className="title">
          Bem vindo
        </h1> 

        <OrkutNostalgicIconSet/>
        </Box>

        <Box>
          <h2 className="subTitle">
            O que você deseja fazer?
          </h2>

          <form onSubmit={function handleCriaComunidade(e){
            e.preventDefault();

            const dadosDoForm = new FormData(e.target)

            const comunidade = {
              id: new Date().toISOString(),
              title:dadosDoForm.get('title'),
              image: dadosDoForm.get('image'),
            }
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas)
          }}>

            <div>
              <input 
                type="text" 
                name="title" 
                
                placeholder="Qual vai ser o  nome da sua comunidade" 
                aria-label="Qual vai ser o  nome da sua comunidade"
              />
            </div>
            <div>
              <input 
                type="text" 
                name="image" 
               
                placeholder="Coloque uma URL para a capa da comunidade" 
                aria-label="Coloque uma URL para a capa da comunidade"
              />
            </div>
            <button className="">Criar comunidade</button>
          </form>
        </Box>

        </div>

        <div className = "profileRelationsArea"
        style = {{ gridArea: 'profileRelationsArea' }}>

          <ProfileRelationsBoxWrapper>

              <ul>

                {comunidades.map((item)=>{
                  return(
                    <li key={item.id}>
                      <a href={`/users/${item.title}`} key={item.title}> 
                        <img src = {item.image} />
                        <span>{item.title}</span>
                      </a>

                      
                    </li>
                    )
                  } 
                )}


                  
              </ul>


          </ProfileRelationsBoxWrapper>

        <ProfileRelationsBoxWrapper >


         

            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>


          <ul>

          {pessoasFavoritas.map((item)=>{
            return(
              <li key={item}>
                <a href={`/users/${item}`} > 
                  <img src = {`https://github.com/${item}.png`} />
                  <span>{item}</span>
                </a>

                
              </li>
              )
            } 
          )}


            
          </ul>
          
        </ProfileRelationsBoxWrapper>

        </div>  


        </MainGrid>
        </>
    )
}