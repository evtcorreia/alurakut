
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

function ProfileRelationsBox(props)
{
  return(
    <ProfileRelationsBoxWrapper>

    <h2 className='smallTitle'>
      {props.title} ({props.items.length})</h2>

      <ul>

        {/* {seguidores.map((item)=>{
          return(
            <li key={item}>
              <a href={`https://github.com/${item}.png`} key={item}> 
                <img src = {item} />
                <span>{item}</span>
              </a>

              
            </li>
            )
          } 
        )} */}


          
      </ul>


  </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {


    const gitHubUser = 'evtcorreia';
    const [comunidades, setComunidades] =  React.useState([]);
    /* const comunidades = ['AluraKut']; */
    const pessoasFavoritas = [
      'juunegreiros', 
      'omariosouto',
      'rafaballerini',
      'marcobrunodev',
      'peas',
      'felipefialho', 
    ]

    // 0 - PEgar os Arrays de dados
      const [seguidores, setSeguidores] = React.useState([]);

      React.useEffect(function(){

        fetch('https://api.github.com/users/evtcorreia/following')
        .then(function(respostaDoServidor){
          return respostaDoServidor.json();
        })
        .then(function(respostaCompleta){
          setSeguidores(respostaCompleta);
        })

        //API GraphQL
        fetch('https://graphql.datocms.com/', {
          method: 'POST',
          headers :{
            'Authorization': 'c685ab8e4c21c73589ed877194aa34',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({"query": `
          query {
            allCommunities {
              title
              id
              imageUrl
            }
          }
          
          `})
        })
        .then((response)=>response.json())
        .then((respostaCompleta)=>{
          const comunidades = respostaCompleta.data.allCommunities;
          setComunidades(comunidades)
          console.log(comunidades)
        })
        
      }, [])
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
            <i className="fa fa-trash" aria-hidden="true"></i>
          </h2>
          

          <form onSubmit={function handleCriaComunidade(e){
            e.preventDefault();

            const dadosDoForm = new FormData(e.target)

            const comunidade = {
              //id: new Date().toISOString(),
              title:dadosDoForm.get('title'),
              image_url: dadosDoForm.get('image'),
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async(response)=>{
              const dados = await response.json();

              const comunidade = dados.registroCriado;
             
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
            })
            
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


        {/*   {seguidores} */}

        <ProfileRelationsBox title="Seguindo" items={seguidores}/>

          <ProfileRelationsBoxWrapper>

            <h2 className='smallTitle'>Comunidades ({comunidades.length})</h2>

              <ul>

                {comunidades.map((item)=>{
                  return(
                    <li key={item.id}>
                      <a href={`/users/${item.title}`} key={item.id}> 
                        <img src = {item.imageUrl} />
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