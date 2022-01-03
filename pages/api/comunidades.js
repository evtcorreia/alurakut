import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

    if (request.method === 'POST') {

        const TOKEN = '2fa1ba751ba67d28a94ac8aac16135';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: "976193",
            ...request.body, 
           /*  title: "comunidae de teste",
            image_url: "https://github.com/evtcorreia.png"
 */
        })
        response.json({
            dados: 'algum dado',
            registroCriado: registroCriado
        })


        return
    }

    response.status(404).json({
        message: 'anda nao tem nada no get, mas no post tem'
    })
}