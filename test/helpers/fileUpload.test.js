import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name:'dr9ay5pcf',
    api_key:'429317141531631',
    api_secret:'p86HOzOw0XxJoRUfTVcHZ9CULcY',
    secure: true
})

describe('Pruebas en fileUpload', () => {

    test('debe de subir el archivo correctamente a cloudinary', async() => {

        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';
        const resp = await fetch( imageUrl );
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        const segments = url.split('/');
        const imageId = segments[ segments.length - 1 ].replace('.jpg','');
        const cloudResp = await cloudinary.api.delete_resources([ 'journal/' + imageId ], {
           resource_type: 'image'
        });
        //console.log({ cloudResp })

    });

    test('debe de retornar null', async() => {

        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );
        expect( url ).toBe( null );
        
    });
})