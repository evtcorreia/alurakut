

import MainGrid from '../src/MainGrid';
import Box from '../src/Box';
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/ProfileRelations';

/* const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
` */

function ProfileSideBar(props)
{
  return(

    <Box >
      <img src = {`https://github.com/${props.gitHubUser}.png`} style={{borderRadius:'8px'}}/>
    </Box>


  )
}




export default function Home() {


    const gitHubUser = 'evtcorreia'
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


        </div>

        <div className = "profileRelationsArea"
        style = {{ gridArea: 'profileRelationsArea' }}>

        <ProfileRelationsBoxWrapper >


         

            <h2 className="smallTitle">Pessoas da Comunidade ({pessoasFavoritas.length})</h2>


          <ul>

          {pessoasFavoritas.map((item)=>{
            return(
              <li>
                <a href={`/users/${item}`} key={item}> 
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